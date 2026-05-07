import csv
import json
import re
from collections import Counter, defaultdict
from pathlib import Path
from zipfile import ZipFile
from xml.etree import ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT.parent / "DAV_data"
OUT = ROOT / "src" / "data" / "realCarbonCaptureDataset.json"

NS = {"m": "http://schemas.openxmlformats.org/spreadsheetml/2006/main"}


def clean_number(value):
    if value in (None, ""):
        return 0.0
    text = str(value).replace(",", "").strip()
    if not text:
        return 0.0
    try:
        return float(text)
    except ValueError:
        return 0.0


def slug(value):
    return re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-")


def canonical_project_type(value):
    text = (value or "Unknown").strip() or "Unknown"
    return {
        "Full Chain": "Full chain",
        "Full chain": "Full chain",
        "Full Chain ": "Full chain",
    }.get(text, text)


def read_csv(path):
    with path.open(newline="", encoding="utf-8-sig") as handle:
        return list(csv.DictReader(handle))


def read_xlsx_sheet(path, sheet_index):
    with ZipFile(path) as archive:
        shared = []
        if "xl/sharedStrings.xml" in archive.namelist():
            root = ET.fromstring(archive.read("xl/sharedStrings.xml"))
            for item in root.findall("m:si", NS):
                shared.append("".join(node.text or "" for node in item.findall(".//m:t", NS)))

        root = ET.fromstring(archive.read(f"xl/worksheets/sheet{sheet_index}.xml"))
        rows = []
        for row in root.findall(".//m:sheetData/m:row", NS):
            values = []
            last_col = 0
            for cell in row.findall("m:c", NS):
                ref = cell.attrib.get("r", "")
                col = 0
                for char in re.match(r"[A-Z]+", ref).group(0):
                    col = col * 26 + ord(char) - 64
                while last_col + 1 < col:
                    values.append("")
                    last_col += 1
                value_node = cell.find("m:v", NS)
                inline_node = cell.find("m:is/m:t", NS)
                value = ""
                if inline_node is not None:
                    value = inline_node.text or ""
                elif value_node is not None:
                    value = value_node.text or ""
                    if cell.attrib.get("t") == "s":
                        value = shared[int(value)]
                values.append(value)
                last_col = col
            rows.append(values)

    headers = rows[0]
    return [dict(zip(headers, row + [""] * (len(headers) - len(row)))) for row in rows[1:] if any(row)]


def top_counter(rows, key, limit=8):
    counts = Counter((row.get(key) or "Unknown").strip() or "Unknown" for row in rows)
    return [{"name": name, "value": value} for name, value in counts.most_common(limit)]


iea_2026 = read_xlsx_sheet(SOURCE / "IEA CCUS Projects Database 2026.xlsx", 3)
iea_2024 = read_csv(SOURCE / "IEA_CCUS_Projects_Database_2024.csv")
map_rows = read_csv(SOURCE / "CCS Map Data Jan2023 (1) - Map Data.csv")
sequestered_rows = read_csv(SOURCE / "CO2 Sequestered 2016-2022.csv")

project_type_capacity = defaultdict(float)
project_type_count = Counter()
project_type_operational = Counter()
region_capacity = defaultdict(lambda: defaultdict(float))
sector_capacity = defaultdict(float)
status_counts = Counter()
operation_capacity = defaultdict(float)

for row in iea_2026:
    project_type = canonical_project_type(row.get("Project type"))
    region = (row.get("Region") or "Unknown").strip() or "Unknown"
    sector = (row.get("Sector") or "Unknown").strip() or "Unknown"
    status = (row.get("Project status") or row.get("Project Status") or "Unknown").strip() or "Unknown"
    capacity = clean_number(row.get("Estimated capacity by IEA (Mt CO2/yr)"))
    announced = clean_number(row.get("Announced capacity (Mt CO2/yr)"))
    capacity = capacity or announced

    project_type_capacity[project_type] += capacity
    project_type_count[project_type] += 1
    status_counts[status] += 1
    region_capacity[region][project_type] += capacity
    sector_capacity[sector] += capacity
    if status.lower() == "operational":
        project_type_operational[project_type] += 1

    year = int(clean_number(row.get("Operation")))
    if year:
        operation_capacity[year] += capacity

total_capacity = sum(project_type_capacity.values()) or 1
technology_metrics = []
for name, count in project_type_count.most_common():
    capacity = project_type_capacity[name]
    operational_share = round(project_type_operational[name] / count * 100) if count else 0
    technology_metrics.append(
        {
            "id": slug(name),
            "name": name,
            "projectCount": count,
            "capacity": round(capacity, 2),
            "adoption": round(capacity / total_capacity * 100, 1),
            "operationalShare": operational_share,
            "score": round(capacity + count * 0.1 + operational_share * 0.2, 1),
        }
    )

years = range(2016, 2023)
sequestered_trend = []
for year in years:
    total_tonnes = sum(clean_number(row.get(f"{year} Total Mass CO2 Sequestered")) for row in sequestered_rows)
    sequestered_trend.append({"year": year, "mt": round(total_tonnes / 1_000_000, 2)})

cumulative = 0
capacity_growth = []
for year in sorted(year for year in operation_capacity if 2010 <= year <= 2035):
    cumulative += operation_capacity[year]
    capacity_growth.append({"year": year, "capacity": round(cumulative, 2), "added": round(operation_capacity[year], 2)})

project_type_keys = [item["name"] for item in technology_metrics[:6]]
regional_adoption = []
for region, values in sorted(region_capacity.items(), key=lambda item: sum(item[1].values()), reverse=True)[:7]:
    row = {"region": region}
    for key in project_type_keys:
        row[slug(key)] = round(values.get(key, 0), 2)
    regional_adoption.append(row)

map_status = top_counter(map_rows, "Project Phase", 8)
map_continents = top_counter(map_rows, "Continent Name", 8)

dataset = {
    "sources": [
        "IEA CCUS Projects Database 2026.xlsx",
        "IEA_CCUS_Projects_Database_2024.csv",
        "CCS Map Data Jan2023 (1) - Map Data.csv",
        "CO2 Sequestered 2016-2022.csv",
    ],
    "summary": {
        "iea2026Projects": len(iea_2026),
        "iea2024Projects": len(iea_2024),
        "mapProjects": len(map_rows),
        "sequestrationFacilities": len(sequestered_rows),
        "estimatedCapacityMtPerYear": round(total_capacity, 2),
    },
    "technologyMetrics": technology_metrics,
    "sequesteredTrend": sequestered_trend,
    "capacityGrowth": capacity_growth,
    "regionalAdoption": regional_adoption,
    "regionalKeys": [{"key": slug(name), "label": name} for name in project_type_keys],
    "marketShare": [
        {"name": item["name"], "value": item["adoption"]} for item in technology_metrics[:7]
    ],
    "statusCounts": [{"name": name, "value": value} for name, value in status_counts.most_common()],
    "sectorCapacity": [
        {"name": name, "capacity": round(value, 2)}
        for name, value in sorted(sector_capacity.items(), key=lambda item: item[1], reverse=True)[:10]
    ],
    "mapStatus": map_status,
    "mapContinents": map_continents,
}

OUT.write_text(json.dumps(dataset, indent=2), encoding="utf-8")
print(f"Wrote {OUT.relative_to(ROOT)}")
