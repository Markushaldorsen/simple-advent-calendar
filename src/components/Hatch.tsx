import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Lock, Check } from 'lucide-react';
import { DayContent } from '../data/content';

interface HatchProps {
  content: DayContent;
  isOpen: boolean;
  isLocked: boolean;
  onOpen: () => void;
  onLockedClick: () => void;
}

export const Hatch: React.FC<HatchProps> = ({ content, isOpen, isLocked, onOpen, onLockedClick }) => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({ rotateY: isOpen ? -110 : 0 });
  }, [isOpen, controls]);

  const handleClick = () => {
    if (isLocked) {
      onLockedClick();
      controls.start({
        x: [0, -5, 5, -5, 5, 0],
        transition: { duration: 0.5 }
      });
    } else {
      onOpen();
    }
  };

  return (
    <div className="relative w-full aspect-square perspective-1000">
      {/* The Inside (Content Preview or Empty) */}
      <div className="absolute inset-0 bg-red-900/50 rounded-lg flex items-center justify-center border-2 border-red-800/50 overflow-hidden">
        {isOpen ? (
          content.image ? (
            <img 
              src={content.image} 
              alt={`Day ${content.day}`} 
              className="w-full h-full object-cover opacity-90"
            />
          ) : (
            <Check className="text-green-400 w-8 h-8" />
          )
        ) : (
          <span className="text-red-200/20 text-4xl font-serif">{content.day}</span>
        )}
      </div>

      {/* The Door */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-red-700 to-red-900 rounded-lg border-2 border-yellow-500/30 shadow-lg flex flex-col items-center justify-center cursor-pointer hover:brightness-110"
        onClick={handleClick}
        animate={controls}
        initial={{ rotateY: 0 }}
        transition={{ 
          rotateY: { type: 'spring', stiffness: 50, damping: 15 }
        }}
        style={{ transformOrigin: 'left' }}
      >
        <span className="text-3xl md:text-5xl font-serif text-yellow-100 drop-shadow-md font-bold">
          {content.day}
        </span>
      </motion.div>
    </div>
  );
};
