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
import { technologyMetrics } from '../data/chartData';

const regions = ['Global', 'North America', 'Europe', 'Asia Pacific', 'Middle East', 'Latin America', 'Africa'];
const years = ['2025', '2030', '2040', '2050'];

export default function Analysis() {
  const [technology, setTechnology] = useState('all');
  const [year, setYear] = useState('2030');
  const [region, setRegion] = useState('Global');

  const filtered = useMemo(() => {
    if (technology === 'all') return technologyMetrics;
    return technologyMetrics.filter((item) => item.id === technology);
  }, [technology]);

  const ranked = useMemo(() => [...technologyMetrics].sort((a, b) => b.score - a.score), []);
  const mostEfficient = [...technologyMetrics].sort((a, b) => b.efficiency - a.efficiency)[0];
  const lowestCost = [...technologyMetrics].sort((a, b) => a.cost - b.cost)[0];
  const highestCapacity = [...technologyMetrics].sort((a, b) => b.capacity - a.capacity)[0];
  const avgAdoption = Math.round(technologyMetrics.reduce((sum, item) => sum + item.adoption, 0) / technologyMetrics.length);

  return (
    <div className="pb-24 pt-32">
      <section className="section-shell">
        <Reveal>
          <SectionHeader
            eyebrow="Analysis dashboard"
            title="Compare carbon capture pathways with transparent metrics."
            copy="The dashboard uses a local sample dataset to compare efficiency, estimated cost, capacity, adoption, and regional intensity. The scoring formula is visible by design: Score = 0.4 * Efficiency - 0.3 * Cost + 0.3 * Capacity."
          />
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard icon={Award} label="Most Efficient Technology" value={mostEfficient.name} detail={`${mostEfficient.efficiency}% capture efficiency`} />
          <MetricCard icon={Gauge} label="Lowest Cost Technology" value={lowestCost.name} detail={`$${lowestCost.cost}/t estimated cost`} accent="#34d5ff" />
          <MetricCard icon={TrendingUp} label="Highest CO2 Removal Capacity" value={highestCapacity.name} detail={`${highestCapacity.capacity}/100 capacity index`} accent="#d5ff6a" />
          <MetricCard icon={Globe2} label="Average Global Adoption" value={`${avgAdoption}%`} detail={`${region}, ${year} planning view`} accent="#47d16c" />
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
        <ChartCard title="Cost Comparison" subtitle="Estimated cost per tonne of CO2">
          <CostBarChart data={filtered} />
        </ChartCard>
        <ChartCard title="Efficiency vs Cost" subtitle="Bubble size indicates removal capacity">
          <EfficiencyCostScatter data={filtered} />
        </ChartCard>
        <ChartCard title="Multi-metric Comparison" subtitle="Efficiency and capacity across the portfolio">
          <MultiMetricRadar />
        </ChartCard>
        <ChartCard title="CO2 Capture Growth" subtitle="Illustrative deployment trajectory in MtCO2/year">
          <CaptureGrowthLine />
        </ChartCard>
        <ChartCard title="Global Market Share / Adoption" subtitle="Relative adoption index">
          <AdoptionPie />
        </ChartCard>
        <ChartCard title="Regional Adoption Heatmap" subtitle="Intensity index by region and technology">
          <Heatmap />
        </ChartCard>
      </section>

      <section className="section-shell mt-8">
        <div className="glass overflow-hidden rounded-[8px]">
          <div className="border-b border-white/10 p-5">
            <h3 className="font-display text-2xl text-white">Weighted Ranking Table</h3>
            <p className="mt-2 text-sm text-slate-400">Score = 0.4 * Efficiency - 0.3 * Cost + 0.3 * Capacity</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="bg-white/[0.04] text-slate-400">
                <tr>
                  <th className="px-5 py-4">Rank</th>
                  <th className="px-5 py-4">Technology</th>
                  <th className="px-5 py-4">Efficiency</th>
                  <th className="px-5 py-4">Cost</th>
                  <th className="px-5 py-4">Capacity</th>
                  <th className="px-5 py-4">Adoption</th>
                  <th className="px-5 py-4">Score</th>
                </tr>
              </thead>
              <tbody>
                {ranked.map((item, index) => (
                  <tr key={item.id} className="border-t border-white/10 text-slate-200">
                    <td className="px-5 py-4 font-semibold text-climate-mint">#{index + 1}</td>
                    <td className="px-5 py-4 text-white">{item.name}</td>
                    <td className="px-5 py-4">{item.efficiency}%</td>
                    <td className="px-5 py-4">${item.cost}/t</td>
                    <td className="px-5 py-4">{item.capacity}</td>
                    <td className="px-5 py-4">{item.adoption}%</td>
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
