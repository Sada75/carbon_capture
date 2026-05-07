import { motion } from 'framer-motion';

const particles = Array.from({ length: 34 }, (_, index) => ({
  id: index,
  left: `${(index * 31) % 100}%`,
  top: `${(index * 47) % 100}%`,
  size: 3 + (index % 5),
  duration: 8 + (index % 9),
  delay: (index % 7) * 0.35,
}));

export default function BackgroundParticles() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
      <div className="aurora" />
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute rounded-full bg-climate-mint/40 shadow-mint"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
          }}
          animate={{ y: [-18, 18, -18], opacity: [0.18, 0.72, 0.18], scale: [1, 1.55, 1] }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0,rgba(3,7,18,.72)_72%)]" />
    </div>
  );
}
