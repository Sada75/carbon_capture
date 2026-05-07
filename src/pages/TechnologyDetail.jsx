import { ArrowLeft, BarChart3, GitCompareArrows } from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router-dom';
import Button from '../components/Button';
import ChartCard from '../components/ChartCard';
import MetricCard from '../components/MetricCard';
import Reveal from '../components/Reveal';
import SectionHeader from '../components/SectionHeader';
import { MiniMetricChart } from '../charts/DashboardCharts';
import { technologies, technologyById } from '../data/technologies';

export default function TechnologyDetail() {
  const { id } = useParams();
  const tech = technologyById[id];

  if (!tech) return <Navigate to="/approaches" replace />;

  const Icon = tech.icon;
  const timeline = ['Research', 'Pilot', 'Demonstration', 'Commercial hubs', 'Scaled networks'];

  return (
    <div className="pb-24 pt-32">
      <section className="section-shell">
        <Link to="/approaches" className="mb-6 inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white">
          <ArrowLeft size={16} /> Back to approaches
        </Link>
        <div className="grid gap-8 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
          <Reveal>
            <div className="glass rounded-[8px] p-8 sm:p-12">
              <div className="mb-7 grid h-16 w-16 place-items-center rounded-[8px] bg-white/10" style={{ color: tech.color }}>
                <Icon size={32} />
              </div>
              <SectionHeader eyebrow="Technology detail" title={tech.name} copy={tech.short} />
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button to="/analysis"><BarChart3 size={18} /> View full analysis</Button>
                <Button to="/approaches" variant="secondary"><GitCompareArrows size={18} /> Compare with other technologies</Button>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <ChartCard title="Comparison Metrics" subtitle="Efficiency, capacity, adoption, and affordability">
              <MiniMetricChart tech={tech} />
            </ChartCard>
          </Reveal>
        </div>
      </section>

      <section className="section-shell mt-12 grid gap-5 md:grid-cols-4">
        <MetricCard label="Efficiency" value={`${tech.efficiency}%`} detail="Estimated capture performance" accent={tech.color} />
        <MetricCard label="Estimated Cost" value={`$${tech.cost}/t`} detail="Illustrative cost per tonne" accent={tech.color} />
        <MetricCard label="Scalability" value={tech.scalability} detail="Deployment maturity signal" accent={tech.color} />
        <MetricCard label="Energy Usage" value={tech.energyUsage} detail="Relative energy demand" accent={tech.color} />
      </section>

      <section className="section-shell mt-20 grid gap-12 lg:grid-cols-2">
        <Reveal>
          <SectionHeader eyebrow="How it works" title="Engineering pathway" copy={tech.howItWorks} />
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {['Capture', 'Condition', 'Store'].map((step, index) => (
              <div key={step} className="glass rounded-[8px] p-5">
                <span className="text-sm text-slate-400">Step {index + 1}</span>
                <strong className="mt-2 block font-display text-xl text-white">{step}</strong>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="grid gap-5">
            <div className="glass rounded-[8px] p-6">
              <h3 className="font-display text-2xl text-white">Advantages</h3>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
                {tech.advantages.map((item) => <li key={item}>- {item}</li>)}
              </ul>
            </div>
            <div className="glass rounded-[8px] p-6">
              <h3 className="font-display text-2xl text-white">Challenges</h3>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
                {tech.challenges.map((item) => <li key={item}>- {item}</li>)}
              </ul>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="section-shell mt-20">
        <Reveal>
          <SectionHeader eyebrow="Adoption" title="From lab signal to deployment networks" copy={tech.adoptionText} />
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-5">
          {timeline.map((step, index) => (
            <Reveal key={step} delay={index * 0.05}>
              <div className={`rounded-[8px] border p-5 ${index <= 2 ? 'border-climate-mint/35 bg-climate-mint/10' : 'border-white/10 bg-white/[0.04]'}`}>
                <span className="text-xs text-slate-400">Phase {index + 1}</span>
                <strong className="mt-3 block text-white">{step}</strong>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-shell mt-20 grid gap-5 lg:grid-cols-2">
        <div className="glass rounded-[8px] p-6">
          <h3 className="font-display text-2xl text-white">Real-world applications</h3>
          <div className="mt-5 flex flex-wrap gap-3">
            {tech.applications.map((item) => (
              <span key={item} className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-slate-200">{item}</span>
            ))}
          </div>
        </div>
        <div className="glass rounded-[8px] p-6">
          <h3 className="font-display text-2xl text-white">Future potential</h3>
          <p className="mt-4 leading-7 text-slate-300">{tech.future}</p>
        </div>
      </section>

      <section className="section-shell mt-20">
        <h3 className="mb-5 font-display text-2xl text-white">Explore adjacent technologies</h3>
        <div className="grid gap-3 md:grid-cols-3">
          {technologies.filter((item) => item.id !== tech.id).slice(0, 3).map((item) => (
            <Link key={item.id} to={`/approaches/${item.id}`} className="glass rounded-[8px] p-5 transition hover:border-climate-mint/40">
              <span className="text-sm text-slate-400">{item.scalability}</span>
              <strong className="mt-2 block text-white">{item.name}</strong>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
