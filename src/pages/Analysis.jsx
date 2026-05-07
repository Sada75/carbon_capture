import { Award, Gauge, Globe2, TrendingUp } from 'lucide-react';
import { useMemo, useState } from 'react';
import ChartCard from '../components/ChartCard';
import MetricCard from '../components/MetricCard';
import Reveal from '../components/Reveal';
import SectionHeader from '../components/SectionHeader';
import {
  AdoptionPie,
  CaptureGrowthLine,
  CostBarChart,
  EfficiencyCostScatter,
  Heatmap,
  MultiMetricRadar,
} from '../charts/DashboardCharts';
import { summary, technologyMetrics } from '../data/chartData';

const regions = ['Global', 'North America', 'Europe', 'Middle East', 'China', 'Other Asia Pacific'];
const years = ['2024', '2026', '2030', '2035'];

export default function Analysis() {
  const [technology, setTechnology] = useState('all');
  const [year, setYear] = useState('2030');
  const [region, setRegion] = useState('Global');

  const filtered = useMemo(() => {
    if (technology === 'all') return technologyMetrics;
    return technologyMetrics.filter((item) => item.id === technology);
  }, [technology]);

  const ranked = useMemo(() => [...technologyMetrics].sort((a, b) => b.score - a.score), []);
  const largestPortfolio = [...technologyMetrics].sort((a, b) => b.projectCount - a.projectCount)[0];
  const mostOperational = [...technologyMetrics].sort((a, b) => b.operationalShare - a.operationalShare)[0];
  const highestCapacity = [...technologyMetrics].sort((a, b) => b.capacity - a.capacity)[0];
  const totalProjects = summary.iea2026Projects;

  return (
    <div className="pb-24 pt-32">
      <section className="section-shell">
        <Reveal>
          <SectionHeader
            eyebrow="Analysis dashboard"
            title="Compare real CCUS project data."
            copy="The dashboard now uses the supplied IEA CCUS project databases, CCS map data, and CO2 sequestration facility data. Metrics are based on project counts, estimated Mt CO2/year capacity, project status, sector, region, and measured sequestered mass."
          />
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard icon={Award} label="Largest Project Portfolio" value={largestPortfolio.name} detail={`${largestPortfolio.projectCount} projects in IEA 2026`} />
          <MetricCard icon={Gauge} label="Highest Operational Share" value={mostOperational.name} detail={`${mostOperational.operationalShare}% of projects operational`} accent="#34d5ff" />
          <MetricCard icon={TrendingUp} label="Highest Estimated Capacity" value={highestCapacity.name} detail={`${highestCapacity.capacity} Mt CO2/year`} accent="#d5ff6a" />
          <MetricCard icon={Globe2} label="Total Projects Loaded" value={totalProjects.toLocaleString()} detail={`${summary.estimatedCapacityMtPerYear} Mt CO2/year estimated capacity`} accent="#47d16c" />
        </div>
      </section>

      <section className="section-shell mt-8">
        <div className="glass grid gap-4 rounded-[8px] p-4 md:grid-cols-3">
          <label className="grid gap-2 text-sm text-slate-300">
            Technology
            <select className="rounded-[8px] border border-white/10 bg-carbon-950/80 px-3 py-3 text-white" value={technology} onChange={(event) => setTechnology(event.target.value)}>
              <option value="all">All technologies</option>
              {technologyMetrics.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
            </select>
          </label>
          <label className="grid gap-2 text-sm text-slate-300">
            Year
            <select className="rounded-[8px] border border-white/10 bg-carbon-950/80 px-3 py-3 text-white" value={year} onChange={(event) => setYear(event.target.value)}>
              {years.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
          <label className="grid gap-2 text-sm text-slate-300">
            Region
            <select className="rounded-[8px] border border-white/10 bg-carbon-950/80 px-3 py-3 text-white" value={region} onChange={(event) => setRegion(event.target.value)}>
              {regions.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
        </div>
      </section>

      <section className="section-shell mt-8 grid gap-5 xl:grid-cols-2">
        <ChartCard title="Estimated Capacity" subtitle="IEA 2026 estimated capacity by project type, Mt CO2/year">
          <CostBarChart data={filtered} />
        </ChartCard>
        <ChartCard title="Projects vs Capacity" subtitle="Project count compared with estimated capacity">
          <EfficiencyCostScatter data={filtered} />
        </ChartCard>
        <ChartCard title="Project Type Comparison" subtitle="Capacity share, operational share, and project share">
          <MultiMetricRadar />
        </ChartCard>
        <ChartCard title="IEA Capacity Timeline" subtitle="Cumulative and newly added capacity by operation year">
          <CaptureGrowthLine />
        </ChartCard>
        <ChartCard title="Capacity Share" subtitle="Share of estimated capacity by project type">
          <AdoptionPie />
        </ChartCard>
        <ChartCard title="Regional Capacity Heatmap" subtitle="Mt CO2/year by region and project type">
          <Heatmap />
        </ChartCard>
      </section>

      <section className="section-shell mt-8">
        <div className="glass overflow-hidden rounded-[8px]">
          <div className="border-b border-white/10 p-5">
            <h3 className="font-display text-2xl text-white">Project Type Ranking Table</h3>
            <p className="mt-2 text-sm text-slate-400">Score combines estimated capacity, project count, and operational share from the imported datasets.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="bg-white/[0.04] text-slate-400">
                <tr>
                  <th className="px-5 py-4">Rank</th>
                  <th className="px-5 py-4">Technology</th>
                  <th className="px-5 py-4">Projects</th>
                  <th className="px-5 py-4">Capacity</th>
                  <th className="px-5 py-4">Capacity Share</th>
                  <th className="px-5 py-4">Operational</th>
                  <th className="px-5 py-4">Score</th>
                </tr>
              </thead>
              <tbody>
                {ranked.map((item, index) => (
                  <tr key={item.id} className="border-t border-white/10 text-slate-200">
                    <td className="px-5 py-4 font-semibold text-climate-mint">#{index + 1}</td>
                    <td className="px-5 py-4 text-white">{item.name}</td>
                    <td className="px-5 py-4">{item.projectCount}</td>
                    <td className="px-5 py-4">{item.capacity} Mt/yr</td>
                    <td className="px-5 py-4">{item.adoption}%</td>
                    <td className="px-5 py-4">{item.operationalShare}%</td>
                    <td className="px-5 py-4 font-display text-lg text-white">{item.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
