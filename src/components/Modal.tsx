import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart } from 'lucide-react';
import { DayContent } from '../data/content';

interface ModalProps {
  content: DayContent | null;
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ content, onClose }) => {
  if (!content) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative bg-white text-slate-900 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Header Image or Pattern */}
          <div className="h-32 bg-gradient-to-r from-red-500 to-pink-600 flex items-center justify-center">
            <Heart className="text-white/20 w-24 h-24 absolute" />
            <h2 className="text-3xl font-serif text-white font-bold relative z-10 drop-shadow-md">
              {content.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white bg-black/20 hover:bg-black/40 rounded-full p-1 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="p-8 text-center">
            {content.type === 'coupon' && (
              <div className="mb-4 inline-block px-4 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-bold uppercase tracking-wider border border-yellow-200">
                Redeemable Coupon
              </div>
            )}
            
            <p className="text-lg md:text-xl leading-relaxed font-serif text-slate-700">
              {content.body}
            </p>

            {content.image && (
              <img src={content.image} alt="Day content" className="mt-6 rounded-lg shadow-md mx-auto" />
            )}

            <div className="mt-8">
              <button
                onClick={onClose}
                className="px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
