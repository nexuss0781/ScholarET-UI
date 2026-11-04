import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Trophy, BookCheck, X, Check } from 'lucide-react';
import { Mascot } from './Mascot';
import { playPop, playSuccess } from '../utils/audio';

interface ChestModalProps {
  isOpen: boolean;
  onClose: () => void;
  soundEnabled: boolean;
  onClaim: () => void;
}

export const ChestModal: React.FC<ChestModalProps> = ({
  isOpen,
  onClose,
  soundEnabled,
  onClaim,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs select-none">
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="relative w-full max-w-sm bg-[#F4E1D2] rounded-3xl border-4 border-[#e2cbba] shadow-2xl p-6 text-center overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/70 text-[#233D4D] flex items-center justify-center hover:bg-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Sunburst background effect */}
          <div className="absolute -top-12 -left-12 -right-12 h-64 bg-radial from-[#FE7F2D]/20 to-transparent pointer-events-none" />

          {/* Cheering Archie Mascot */}
          <div className="flex justify-center -mt-2 mb-2">
            <Mascot mood="cheering" size="md" />
          </div>

          {/* Reward Badge in Pumpkin #FE7F2D */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FE7F2D]/15 text-[#FE7F2D] border border-[#FE7F2D]/30 rounded-full font-black text-xs uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4 fill-[#FE7F2D]" />
            Textbook Cache Unlocked!
          </div>

          <h3 className="text-2xl font-black text-[#233D4D] tracking-tight mb-1">
            +50 Mastery XP
          </h3>
          <p className="text-xs font-semibold text-[#233D4D]/75 max-w-[240px] mx-auto mb-5">
            You discovered the Chapter 2 Proof Cheatsheet & 3 Bonus Practice Dumbbells!
          </p>

          {/* Reward Item Cards */}
          <div className="grid grid-cols-2 gap-2.5 mb-6">
            <div className="p-3 bg-white rounded-2xl border-2 border-[#e2cbba] shadow-xs flex flex-col items-center">
              <span className="text-2xl mb-1">⚡</span>
              <span className="text-xs font-black text-[#FE7F2D]">+50 Gems</span>
              <span className="text-[10px] text-[#233D4D]/60 font-semibold">Streak Fuel</span>
            </div>
            <div className="p-3 bg-white rounded-2xl border-2 border-[#e2cbba] shadow-xs flex flex-col items-center">
              <span className="text-2xl mb-1">📜</span>
              <span className="text-xs font-black text-[#008080]">L'Hôpital Card</span>
              <span className="text-[10px] text-[#233D4D]/60 font-semibold">Formula Item</span>
            </div>
          </div>

          {/* Primary Action Button in Pumpkin #FE7F2D (Rare dopamine reward) */}
          <button
            onClick={() => {
              playSuccess(soundEnabled);
              onClaim();
            }}
            className="w-full py-3.5 px-6 rounded-2xl btn-3d-pumpkin font-black text-sm uppercase tracking-wider shadow-lg cursor-pointer"
          >
            CLAIM REWARD
          </button>
        </motion.div>
      </div>
  );
};
