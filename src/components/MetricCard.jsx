import { motion } from 'framer-motion';

export default function MetricCard({ icon: Icon, label, value, detail, accent = '#5dffc7' }) {
  return (
    <motion.div
      className="glass rounded-[8px] p-5"
      whileHover={{ y: -5, borderColor: 'rgba(93,255,199,.45)' }}
      transition={{ type: 'spring', stiffness: 240, damping: 22 }}
    >
      <div className="mb-5 flex items-center justify-between">
        <div className="grid h-11 w-11 place-items-center rounded-[8px] bg-white/10" style={{ color: accent }}>
          {Icon ? <Icon size={22} /> : null}
        </div>
        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: accent, boxShadow: `0 0 22px ${accent}` }} />
      </div>
      <p className="text-sm text-slate-400">{label}</p>
      <strong className="mt-2 block font-display text-2xl text-white">{value}</strong>
      {detail ? <p className="mt-2 text-sm leading-6 text-slate-300">{detail}</p> : null}
    </motion.div>
  );
}
