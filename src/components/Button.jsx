import { Link } from 'react-router-dom';

const base =
  'inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition duration-300 focus:outline-none focus:ring-2 focus:ring-climate-mint/70';

const variants = {
  primary:
    'bg-gradient-to-r from-climate-cyan via-climate-blue to-climate-mint text-carbon-950 shadow-glow hover:scale-[1.02]',
  secondary: 'glass text-white hover:border-climate-cyan/50 hover:bg-white/15',
  ghost: 'text-slate-200 hover:text-white',
};

export default function Button({ to, href, children, variant = 'primary', className = '', ...props }) {
  const classes = `${base} ${variants[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
