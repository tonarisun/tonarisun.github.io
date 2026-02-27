import React from 'react';
import { motion } from 'motion/react';

interface LegoPlateProps {
  count: number;
  color?: string;
}

export const LegoPlate: React.FC<LegoPlateProps> = ({ count, color = 'bg-lego-red' }) => {
  return (
    <div className="bg-slate-200 p-2 rounded-lg border-b-4 border-slate-300 inline-block">
      <div className="grid grid-cols-10 gap-1">
        {Array.from({ length: 100 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.002 }}
            className={`w-4 h-4 sm:w-6 sm:h-6 rounded-full relative ${
              i < count ? color : 'bg-white'
            } border border-black/10 shadow-inner`}
          >
            {/* The "stud" on top of the brick */}
            <div className={`absolute inset-1 rounded-full opacity-30 ${
              i < count ? 'bg-white' : 'bg-slate-100'
            }`} />
          </motion.div>
        ))}
      </div>
      <div className="mt-2 text-center font-mono text-xs text-slate-500">
        Пластина 10x10 (100 точек)
      </div>
    </div>
  );
};
