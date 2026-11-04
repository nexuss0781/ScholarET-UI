import React from 'react';
import { motion } from 'motion/react';
import { X, CheckCircle, Palette, Sparkles, BookOpen, Layers } from 'lucide-react';

interface DesignTokensPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DesignTokensPanel: React.FC<DesignTokensPanelProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm select-none">
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative w-full max-w-lg max-h-[90vh] bg-white rounded-3xl border-2 border-[#e2cbba] shadow-2xl p-6 overflow-y-auto no-scrollbar"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Palette className="w-5 h-5 text-[#008080]" />
              <h3 className="text-lg font-black text-[#233D4D]">
                ScholarET · Palette Architecture
              </h3>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-4 space-y-5 text-xs text-[#233D4D]">
            {/* Color System Breakdown */}
            <div>
              <h4 className="font-black text-sm uppercase tracking-wider text-[#008080] mb-2 flex items-center gap-1.5">
                <Layers className="w-4 h-4" />
                Strict 60 · 30 · 10 Palette Architecture
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {/* 60% */}
                <div className="p-3 rounded-2xl bg-[#F4E1D2] border border-[#e2cbba] flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-black uppercase text-[#233D4D]/70">60% Canvas</span>
                    <div className="font-black text-sm text-[#233D4D] mt-0.5">#F4E1D2</div>
                    <div className="text-[11px] text-[#233D4D]/80 font-medium">Warm Almond</div>
                  </div>
                  <p className="text-[10px] text-[#233D4D]/70 mt-2">
                    Softer than harsh white; reduces eye strain over long Grade 12 study sessions.
                  </p>
                </div>

                {/* 30% */}
                <div className="p-3 rounded-2xl bg-[#008080] text-white shadow-sm flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-black uppercase text-white/80">30% Brand</span>
                    <div className="font-black text-sm mt-0.5">#008080</div>
                    <div className="text-[11px] text-white/90 font-medium">Ocean Teal</div>
                  </div>
                  <p className="text-[10px] text-white/80 mt-2">
                    Calm and focused; buttons, progress bars, active nodes, and top bar headers.
                  </p>
                </div>

                {/* 10% */}
                <div className="p-3 rounded-2xl bg-[#FE7F2D] text-white shadow-sm flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-black uppercase text-white/80">10% Reward</span>
                    <div className="font-black text-sm mt-0.5">#FE7F2D</div>
                    <div className="text-[11px] text-white/90 font-medium">Pumpkin</div>
                  </div>
                  <p className="text-[10px] text-white/80 mt-2">
                    Rare dopamine pop: reserved exclusively for streak flames, XP, chests, and "Good job!".
                  </p>
                </div>
              </div>

              {/* Charcoal 233D4D */}
              <div className="mt-2 p-2.5 bg-[#233D4D] text-white rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-md bg-[#233D4D] border border-white/30" />
                  <span className="font-black text-xs">#233D4D Charcoal</span>
                </div>
                <span className="text-[11px] text-[#F4E1D2]/80">Softer than pure black text & dark chassis</span>
              </div>
            </div>

            {/* Feature Checklist */}
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
              <h4 className="font-black text-xs uppercase tracking-wider text-[#233D4D] mb-2">
                Implementation Highlights
              </h4>
              <ul className="space-y-1.5 text-[11px] font-semibold text-slate-700">
                <li className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-[#008080]" />
                  <span><strong>Duolingo Clone:</strong> Winding S-path, tactile 3D nodes, START bubble, and exercise view.</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-[#008080]" />
                  <span><strong>Grade 12 Textbook Adaptation:</strong> Turns AP Calc, Physics, and Chem units into gamified stepping stones.</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-[#008080]" />
                  <span><strong>Archie Mascot:</strong> Custom SVG animated scholar with spectacles, mortarboard, and textbooks.</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-[#008080]" />
                  <span><strong>Skeleton Shimmer Mode:</strong> Replaces heavy text with visual shimmering wireframe bars.</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-[#008080]" />
                  <span><strong>iPhone 16 Pro Viewport:</strong> Dynamic Island, status bar, and 3D push-down button physics.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl btn-3d-teal font-black text-xs uppercase tracking-wider cursor-pointer"
            >
              CLOSE AUDIT
            </button>
          </div>
        </motion.div>
      </div>
  );
};
