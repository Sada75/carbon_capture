export default function SectionHeader({ eyebrow, title, copy, center = false }) {
  return (
    <div className={`max-w-3xl ${center ? 'mx-auto text-center' : ''}`}>
      {eyebrow ? (
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-climate-mint">{eyebrow}</p>
      ) : null}
      <h2 className="font-display text-3xl font-bold leading-tight text-white sm:text-5xl">{title}</h2>
      {copy ? <p className="mt-5 text-base leading-8 text-slate-300 sm:text-lg">{copy}</p> : null}
    </div>
  );
}
