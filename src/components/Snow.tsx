import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const Snow = () => {
  const [snowflakes, setSnowflakes] = useState<{ id: number; x: number; delay: number; duration: number }[]>([]);

  useEffect(() => {
    const count = 50;
    const flakes = Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percent
      delay: Math.random() * 5,
      duration: 5 + Math.random() * 10,
    }));
    setSnowflakes(flakes);
  }, []);

  return (
    <div className="snow-container pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {snowflakes.map((flake) => (
        <motion.div
          key={flake.id}
          className="absolute top-[-10px] w-2 h-2 bg-white rounded-full opacity-80"
          style={{ left: `${flake.x}%` }}
          animate={{
            y: ['0vh', '100vh'],
            x: [0, (Math.random() - 0.5) * 50], // Drift
          }}
          transition={{
            duration: flake.duration,
            repeat: Infinity,
            delay: flake.delay,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
};
