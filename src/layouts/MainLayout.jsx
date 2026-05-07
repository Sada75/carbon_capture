import { ArrowUp, Bot, BarChart3, Home, Info, Layers3, Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import BackgroundParticles from '../components/BackgroundParticles';
import GlobalLoader from '../components/GlobalLoader';
import ScrollProgress from '../components/ScrollProgress';

const navItems = [
  { label: 'Home', to: '/', icon: Home },
  { label: 'Approaches', to: '/approaches', icon: Layers3 },
  { label: 'Analysis', to: '/analysis', icon: BarChart3 },
  { label: 'Ask AI', to: '/ask-ai', icon: Bot },
  { label: 'About', to: '/about', icon: Info },
];

function NavItems({ onClick }) {
  return navItems.map((item) => {
    const Icon = item.icon;
    return (
      <NavLink
        key={item.to}
        to={item.to}
        onClick={onClick}
        className={({ isActive }) =>
          `inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm transition ${
            isActive ? 'bg-white/12 text-white' : 'text-slate-300 hover:bg-white/10 hover:text-white'
          }`
        }
      >
        <Icon size={16} />
        {item.label}
      </NavLink>
    );
  });
}

export default function MainLayout() {
  const [open, setOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 560);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <GlobalLoader />
      <BackgroundParticles />
      <ScrollProgress />
      <header className="fixed left-0 right-0 top-4 z-50 px-4">
        <nav className="glass mx-auto flex h-[64px] max-w-6xl items-center justify-between rounded-full px-4">
          <NavLink to="/" className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-climate-cyan to-climate-mint text-carbon-950 shadow-glow">
              <Layers3 size={20} />
            </span>
            <span className="font-display text-base font-bold text-white sm:text-lg">Carbon Capture</span>
          </NavLink>
          <div className="hidden items-center gap-1 md:flex">
            <NavItems />
          </div>
          <button
            className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white md:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-label="Toggle navigation"
          >
            {open ? <X size={19} /> : <Menu size={19} />}
          </button>
        </nav>
        <AnimatePresence>
          {open ? (
            <motion.div
              className="glass mx-auto mt-3 grid max-w-6xl gap-2 rounded-[8px] p-3 md:hidden"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
            >
              <NavItems onClick={() => setOpen(false)} />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.45 }}
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <AnimatePresence>
        {showTop ? (
          <motion.button
            className="fixed bottom-6 right-5 z-40 grid h-12 w-12 place-items-center rounded-full bg-climate-mint text-carbon-950 shadow-mint"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            aria-label="Back to top"
          >
            <ArrowUp size={20} />
          </motion.button>
        ) : null}
      </AnimatePresence>
    </>
  );
}
