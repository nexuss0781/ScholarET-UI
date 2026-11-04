import React from 'react';
import { motion } from 'motion/react';
import { X, BookMarked, Sparkles, CheckCircle2 } from 'lucide-react';
import { playTap } from '../utils/audio';

interface GuidebookModalProps {
  isOpen: boolean;
  onClose: () => void;
  soundEnabled: boolean;
  skeletonMode: boolean;
}

export const GuidebookModal: React.FC<GuidebookModalProps> = ({
  isOpen,
  onClose,
  soundEnabled,
  skeletonMode,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs select-none">
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 30 }}
          className="relative w-full max-w-sm max-h-[85vh] bg-[#F4E1D2] rounded-3xl border-4 border-[#e2cbba] shadow-2xl flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="p-4 bg-[#008080] text-white flex items-center justify-between border-b-2 border-[#005a5a]">
            <div className="flex items-center gap-2">
              <BookMarked className="w-5 h-5 text-white" />
              <h3 className="font-black text-sm tracking-wide">
                Unit 2 Guidebook · AP Calc
              </h3>
            </div>
            <button
              onClick={() => {
                playTap(soundEnabled);
                onClose();
              }}
              className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Guidebook Body */}
          <div className="p-4 overflow-y-auto space-y-4 no-scrollbar">
            {/* Concept Card 1 */}
            <div className="p-3.5 bg-white rounded-2xl border-2 border-[#e2cbba] shadow-[0_2px_0_#d1b8a5]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black uppercase text-[#008080] tracking-wider">
                  Key Definition 2.1
                </span>
                <span className="text-[10px] font-bold text-[#FE7F2D]">Grade 12 Core</span>
              </div>
              {skeletonMode ? (
                <div className="space-y-2 py-1">
                  <div className="w-full h-4 rounded-md skeleton-shimmer" />
                  <div className="w-3/4 h-3.5 rounded-md skeleton-shimmer" />
                  <div className="w-1/2 h-3.5 rounded-md skeleton-shimmer" />
                </div>
              ) : (
                <>
                  <h4 className="font-bold text-xs text-[#233D4D] mb-1">
                    Formal Definition of a Limit
                  </h4>
                  <div className="p-2 bg-[#F4E1D2]/40 rounded-xl font-mono text-[11px] text-[#008080] font-semibold border border-[#e2cbba]">
                    0 &lt; |x - c| &lt; δ ⟹ |f(x) - L| &lt; ε
                  </div>
                </>
              )}
            </div>

            {/* Concept Card 2 */}
            <div className="p-3.5 bg-white rounded-2xl border-2 border-[#e2cbba] shadow-[0_2px_0_#d1b8a5]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black uppercase text-[#008080] tracking-wider">
                  Theorem 2.4
                </span>
                <span className="text-[10px] font-bold text-[#FE7F2D]">High Frequency</span>
              </div>
              {skeletonMode ? (
                <div className="space-y-2 py-1">
                  <div className="w-full h-4 rounded-md skeleton-shimmer" />
                  <div className="w-5/6 h-3.5 rounded-md skeleton-shimmer" />
                </div>
              ) : (
                <>
                  <h4 className="font-bold text-xs text-[#233D4D] mb-1">
                    The Squeeze Theorem
                  </h4>
                  <div className="p-2 bg-[#F4E1D2]/40 rounded-xl font-mono text-[11px] text-[#008080] font-semibold border border-[#e2cbba]">
                    g(x) ≤ f(x) ≤ h(x) ⟹ lim f(x) = L
                  </div>
                </>
              )}
            </div>

            {/* Mastery Tips */}
            <div className="p-3 bg-[#e6f4f4] rounded-2xl border border-[#008080]/30 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#008080] shrink-0 mt-0.5" />
              {skeletonMode ? (
                <div className="w-full space-y-1.5 py-1">
                  <div className="w-full h-3 rounded skeleton-shimmer-teal" />
                  <div className="w-2/3 h-3 rounded skeleton-shimmer-teal" />
                </div>
              ) : (
                <p className="text-[11px] text-[#233D4D] font-medium leading-relaxed">
                  Complete each path node with 3 stars to unlock the Chapter Practice Exam and earn +100 Gems!
                </p>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="p-3 bg-white border-t border-[#e2cbba]">
            <button
              onClick={() => {
                playTap(soundEnabled);
                onClose();
              }}
              className="w-full py-2.5 rounded-xl btn-3d-teal font-black text-xs uppercase tracking-wider cursor-pointer"
            >
              GOT IT
            </button>
          </div>
        </motion.div>
      </div>
  );
};
