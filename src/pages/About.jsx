import { Code2, Database, Globe2, Leaf, Users } from 'lucide-react';
import MetricCard from '../components/MetricCard';
import Reveal from '../components/Reveal';
import SectionHeader from '../components/SectionHeader';

export default function About() {
  return (
    <div className="pb-24 pt-32">
      <section className="section-shell">
        <Reveal>
          <div className="glass rounded-[8px] p-8 sm:p-12">
            <SectionHeader
              eyebrow="About"
              title="Carbon Capture Technologies - Data Driven Insights"
              copy="This project turns complex carbon capture concepts into an immersive education and analytics experience. It is designed for climate-tech learners, researchers, founders, and decision makers who need to understand technology tradeoffs quickly."
            />
          </div>
        </Reveal>
      </section>

      <section className="section-shell mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard icon={Leaf} label="Purpose" value="Climate literacy" detail="Make CCS, DAC, BECCS, mineralization, and ocean removal easier to compare." />
        <MetricCard icon={Globe2} label="Impact" value="Systems view" detail="Connect emissions, infrastructure, cost, energy, and storage durability." accent="#34d5ff" />
        <MetricCard icon={Database} label="Data Sources" value="Imported datasets" detail="IEA CCUS project databases, CCS map data, and reported CO2 sequestration facility data." accent="#d5ff6a" />
        <MetricCard icon={Code2} label="Tech Stack" value="React + Vite" detail="Tailwind CSS, Framer Motion, Recharts, React Router, Lucide icons." accent="#47d16c" />
      </section>

      <section className="section-shell mt-20 grid gap-8 lg:grid-cols-2">
        <Reveal>
          <div className="glass rounded-[8px] p-6">
            <h2 className="font-display text-3xl text-white">Why climate-tech matters</h2>
            <p className="mt-5 leading-8 text-slate-300">
              Deep decarbonization needs electrification, renewables, efficiency, circular materials, and carbon capture for the sectors that remain difficult to abate. A credible portfolio must be transparent about tradeoffs, including cost, permanence, monitoring, energy use, land use, and governance.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="glass rounded-[8px] p-6">
            <h2 className="font-display text-3xl text-white">Credits and references</h2>
            <div className="mt-5 grid gap-3 text-sm text-slate-300">
              <p>- IEA CCUS Projects Database 2026 workbook</p>
              <p>- IEA CCUS Projects Database 2024 CSV</p>
              <p>- CCS Map Data Jan 2023 project map CSV</p>
              <p>- CO2 Sequestered 2016-2022 facility CSV</p>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="section-shell mt-20">
        <Reveal>
          <SectionHeader eyebrow="Team" title="Built as a production-style project foundation." copy="Replace these placeholders with real team members, advisors, data contributors, and research partners as the platform grows." />
        </Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {['Research Lead', 'Frontend Engineer', 'Data Analyst'].map((role) => (
            <div key={role} className="glass rounded-[8px] p-6">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-white/10 text-climate-mint"><Users size={20} /></span>
              <h3 className="mt-5 font-display text-xl text-white">{role}</h3>
              <p className="mt-2 text-sm text-slate-400">Team member placeholder</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
