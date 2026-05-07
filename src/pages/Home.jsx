import { ArrowRight, BarChart3, Bot, DatabaseZap, Factory, GitBranch, Layers3, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import ChartCard from '../components/ChartCard';
import MetricCard from '../components/MetricCard';
import Reveal from '../components/Reveal';
import SectionHeader from '../components/SectionHeader';
import TechCard from '../components/TechCard';
import CarbonTrendChart from '../charts/CarbonTrendChart';
import { emissionSources, technologies } from '../data/technologies';

const features = [
  { icon: BarChart3, label: 'Interactive Dashboards', detail: 'Compare project counts, status, regions, sectors, and estimated capacity.' },
  { icon: DatabaseZap, label: 'Comparative Analytics', detail: 'Dataset-backed scoring ranks CCUS project types using transparent assumptions.' },
  { icon: Bot, label: 'AI Assistant', detail: 'Ask focused questions about carbon capture tradeoffs and futures.' },
  { icon: ShieldCheck, label: 'Case Study Ready', detail: 'Structured for real-world sites, references, and deployment examples.' },
];

export default function Home() {
  return (
    <div>
      <section className="relative grid min-h-screen place-items-center overflow-hidden px-4 pb-20 pt-32">
        <motion.div
          className="absolute left-1/2 top-24 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-climate-cyan/10 blur-3xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.38, 0.66, 0.38] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="section-shell relative grid items-center gap-12 lg:grid-cols-[1.05fr_.95fr]">
          <Reveal>
            <p className="mb-5 inline-flex rounded-full border border-climate-mint/30 bg-climate-mint/10 px-4 py-2 text-sm text-climate-mint">
              Data driven climate-tech intelligence
            </p>
            <h1 className="font-display text-5xl font-bold leading-[1.02] text-white sm:text-7xl lg:text-8xl">
              Capturing Carbon. <span className="text-gradient">Securing the Future.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">
              Atmospheric CO2 is rising because modern economies still depend on carbon-intensive energy,
              materials, and land-use systems. Carbon capture technologies offer a practical bridge from
              hard-to-abate emissions toward durable removal and storage.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button to="/approaches">Explore Technologies <ArrowRight size={18} /></Button>
              <Button to="/analysis" variant="secondary">View Analysis <BarChart3 size={18} /></Button>
            </div>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="glass relative rounded-[8px] p-5">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">CO2 sequestered</p>
                  <strong className="font-display text-4xl text-white">7.95 Mt</strong>
                </div>
                <span className="rounded-full bg-climate-mint/15 px-3 py-1 text-sm text-climate-mint">2022 reported</span>
              </div>
              <div className="h-[280px]">
                <CarbonTrendChart />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-shell py-24">
        <Reveal>
          <SectionHeader
            eyebrow="The pressure curve"
            title="CO2 is a systems problem, not a single smokestack."
            copy="Power, mobility, heavy industry, and land use each add pressure to the atmosphere. Effective climate strategy needs emissions cuts, clean energy, and engineered capture where emissions are hardest to eliminate."
          />
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {emissionSources.map((source, index) => (
            <Reveal key={source.name} delay={index * 0.06}>
              <MetricCard icon={source.icon} label={source.name} value={`${source.value}%`} detail={source.copy} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-shell py-24">
        <div className="grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <Reveal>
            <SectionHeader
              eyebrow="Carbon capture 101"
              title="Capture, compress, transport, store."
              copy="Carbon Capture and Storage (CCS) separates CO2 from industrial streams or the air, compresses it into a dense phase, moves it through pipelines or shipping, and stores it in carefully monitored geologic formations or stable materials."
            />
          </Reveal>
          <Reveal delay={0.14}>
            <div className="glass grid gap-4 rounded-[8px] p-5 sm:grid-cols-4">
              {['Capture', 'Compress', 'Transport', 'Store'].map((step, index) => (
                <motion.div
                  key={step}
                  className="rounded-[8px] bg-carbon-950/55 p-5 text-center"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: index * 0.25 }}
                >
                  <span className="mx-auto grid h-11 w-11 place-items-center rounded-full bg-climate-cyan/15 text-climate-cyan">
                    {index + 1}
                  </span>
                  <strong className="mt-4 block font-display text-white">{step}</strong>
                </motion.div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-shell py-24">
        <Reveal>
          <SectionHeader
            eyebrow="Technology portfolio"
            title="Different sources need different capture pathways."
            copy="No single approach solves every carbon problem. These pathways differ in cost, maturity, energy demand, storage durability, and deployment constraints."
          />
        </Reveal>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {technologies.slice(0, 3).map((tech, index) => (
            <Reveal key={tech.id} delay={index * 0.08}>
              <TechCard tech={tech} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-shell py-24">
        <Reveal>
          <SectionHeader eyebrow="Platform capabilities" title="Built for exploration, comparison, and questions." center />
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Reveal key={feature.label} delay={index * 0.06}>
              <MetricCard {...feature} accent={index % 2 ? '#34d5ff' : '#5dffc7'} />
            </Reveal>
          ))}
        </div>
      </section>

      <footer className="border-t border-white/10 py-10">
        <div className="section-shell flex flex-col gap-4 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
          <p>References: IEA, IPCC, peer-reviewed research papers, public project datasets.</p>
          <div className="flex gap-4">
            <a className="hover:text-white" href="#">GitHub</a>
            <a className="hover:text-white" href="#">Research</a>
            <a className="hover:text-white" href="#">Climate Data</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
