import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function TechCard({ tech, expanded = false }) {
  const Icon = tech.icon;

  return (
    <motion.article
      className="group relative overflow-hidden rounded-[8px] border border-white/10 bg-white/[0.055] p-6 backdrop-blur-2xl"
      whileHover={{ y: -8, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 220, damping: 22 }}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${tech.gradient} opacity-80 transition group-hover:opacity-100`} />
      <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
      <div className="relative">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div className="grid h-14 w-14 place-items-center rounded-[8px] bg-carbon-950/70" style={{ color: tech.color }}>
            <Icon size={27} />
          </div>
          <span className="rounded-full border border-white/15 px-3 py-1 text-xs text-slate-200">{tech.scalability}</span>
        </div>
        <h3 className="font-display text-2xl font-semibold text-white">{tech.name}</h3>
        <p className="mt-3 min-h-[96px] text-sm leading-7 text-slate-300">{tech.short}</p>
        <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-[8px] bg-carbon-950/45 p-3">
            <span className="text-slate-400">Efficiency</span>
            <strong className="mt-1 block text-lg text-white">{tech.efficiency}%</strong>
          </div>
          <div className="rounded-[8px] bg-carbon-950/45 p-3">
            <span className="text-slate-400">Est. cost</span>
            <strong className="mt-1 block text-lg text-white">${tech.cost}/t</strong>
          </div>
          {expanded ? (
            <>
              <div className="rounded-[8px] bg-carbon-950/45 p-3">
                <span className="text-slate-400">Capacity</span>
                <strong className="mt-1 block text-lg text-white">{tech.capacity}/100</strong>
              </div>
              <div className="rounded-[8px] bg-carbon-950/45 p-3">
                <span className="text-slate-400">Energy</span>
                <strong className="mt-1 block text-lg text-white">{tech.energyUsage}</strong>
              </div>
            </>
          ) : null}
        </div>
        <Link
          to={`/approaches/${tech.id}`}
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-climate-mint transition hover:gap-3 hover:text-white"
        >
          Learn More <ChevronRight size={16} />
        </Link>
      </div>
    </motion.article>
  );
}
