export default function ChartCard({ title, subtitle, children, className = '' }) {
  return (
    <section className={`glass rounded-[8px] p-4 sm:p-6 ${className}`}>
      <div className="mb-5">
        <h3 className="font-display text-lg font-semibold text-white">{title}</h3>
        {subtitle ? <p className="mt-1 text-sm text-slate-400">{subtitle}</p> : null}
      </div>
      <div className="h-[320px] w-full">{children}</div>
    </section>
  );
}
