import Reveal from '../components/Reveal';
import SectionHeader from '../components/SectionHeader';
import TechCard from '../components/TechCard';
import { technologies } from '../data/technologies';

export default function Approaches() {
  return (
    <div className="pb-24 pt-32">
      <section className="section-shell">
        <Reveal>
          <div className="glass rounded-[8px] p-8 sm:p-12">
            <SectionHeader
              eyebrow="Approaches"
              title="Carbon Capture Approaches"
              copy="Multiple approaches exist because emissions vary by concentration, location, chemistry, infrastructure, and storage pathway. A steel mill, an ethanol plant, and ambient air each require a different technical and economic playbook."
            />
          </div>
        </Reveal>
      </section>
      <section className="section-shell mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {technologies.map((tech, index) => (
          <Reveal key={tech.id} delay={index * 0.05}>
            <TechCard tech={tech} expanded />
          </Reveal>
        ))}
      </section>
    </div>
  );
}
