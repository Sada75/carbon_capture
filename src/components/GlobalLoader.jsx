import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function GlobalLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 950);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center bg-carbon-950"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55 }}
        >
          <div className="text-center">
            <motion.div
              className="mx-auto h-16 w-16 rounded-full border border-climate-mint/40 border-t-climate-cyan"
              animate={{ rotate: 360 }}
              transition={{ duration: 1.1, repeat: Infinity, ease: 'linear' }}
            />
            <p className="mt-5 font-display text-sm uppercase tracking-[0.28em] text-climate-mint">
              Carbon Capture
            </p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
