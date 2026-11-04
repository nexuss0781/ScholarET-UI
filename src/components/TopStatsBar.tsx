import React, { useState } from 'react';
import { Flame, Sparkles, Heart, BookOpen, ChevronDown, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { playPop, playTap } from '../utils/audio';

interface TopStatsBarProps {
  streak: number;
  gems: number;
  hearts: number;
  soundEnabled: boolean;
  activeSubject: string;
  onSubjectChange: (subj: string) => void;
  onStreakClick?: () => void;
  onGemsClick?: () => void;
  skeletonMode?: boolean;
}

export const SUBJECTS = [
  { id: 'calc', name: 'AP Calculus BC', code: 'CH. 4', icon: '∫', color: 'from-[#008080] to-[#005f5f]' },
  { id: 'phys', name: 'Physics: Mechanics', code: 'SEC. 3', icon: '⚡', color: 'from-[#008080] to-[#233D4D]' },
  { id: 'chem', name: 'Organic Chemistry', code: 'VOL. 2', icon: '⌬', color: 'from-[#233D4D] to-[#008080]' },
  { id: 'econ', name: 'Macroeconomics 12', code: 'UNIT 5', icon: '📈', color: 'from-[#008080] to-[#00a8a8]' },
];

export const TopStatsBar: React.FC<TopStatsBarProps> = ({
  streak,
  gems,
  hearts,
  soundEnabled,
  activeSubject,
  onSubjectChange,
  onStreakClick,
  onGemsClick,
  skeletonMode = false,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const currentSubj = SUBJECTS.find(s => s.id === activeSubject) || SUBJECTS[0];

  return (
    <header className="sticky top-0 z-30 px-3.5 py-2.5 bg-[#F4E1D2]/95 backdrop-blur-md border-b border-[#e2cbba]/80 transition-all">
      <div className="flex items-center justify-between gap-2 max-w-xl mx-auto">
        {/* Course / Textbook Switcher & Mobile ScholarET Brand */}
        <div className="flex items-center gap-2">
          {/* Mobile ScholarET Brand Pill */}
          <div className="md:hidden flex items-center gap-1.5 px-2 py-1 bg-[#233D4D] text-white rounded-xl shadow-xs border border-[#192b36]">
            <span className="w-4 h-4 rounded-md bg-[#008080] text-[10px] font-black flex items-center justify-center text-white">
              ∫
            </span>
            <span className="text-xs font-black tracking-tight">
              Scholar<span className="text-[#FE7F2D]">ET</span>
            </span>
          </div>

          <div className="relative">
            <button
              onClick={() => {
                playTap(soundEnabled);
                setDropdownOpen(!dropdownOpen);
              }}
              className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white rounded-xl border border-[#e2cbba] shadow-[0_2px_0_#d1b8a5] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer"
              aria-label="Select textbook subject"
            >
              <div className="w-6 h-5 rounded-md bg-[#008080] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                {currentSubj.icon}
              </div>
              {skeletonMode ? (
                <div className="w-14 h-3 rounded-full skeleton-shimmer" />
              ) : (
                <span className="text-xs font-black tracking-tight text-[#233D4D] truncate max-w-[85px]">
                  {currentSubj.code}
                </span>
              )}
              <ChevronDown className="w-3.5 h-3.5 text-[#233D4D]/60" />
            </button>

          {/* Subject Dropdown Menu */}
          {dropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setDropdownOpen(false)}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -6 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.15 }}
                className="absolute left-0 mt-2 w-56 p-1.5 bg-white rounded-2xl border-2 border-[#e2cbba] shadow-xl z-50 overflow-hidden"
              >
                <div className="px-3 py-1.5 text-[11px] font-black uppercase tracking-wider text-[#008080]">
                  Grade 12 Textbooks
                </div>
                {SUBJECTS.map((subj) => (
                  <button
                    key={subj.id}
                    onClick={() => {
                      playPop(soundEnabled);
                      onSubjectChange(subj.id);
                      setDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs font-bold transition-all cursor-pointer ${
                      subj.id === activeSubject
                        ? 'bg-[#008080]/10 text-[#008080]'
                        : 'text-[#233D4D] hover:bg-[#F4E1D2]/50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-[#008080] text-white flex items-center justify-center text-xs font-bold">
                        {subj.icon}
                      </span>
                      <div>
                        <div className="font-bold">{subj.name}</div>
                        <div className="text-[10px] text-[#233D4D]/60 font-semibold">{subj.code} · Curriculum</div>
                      </div>
                    </div>
                    {subj.id === activeSubject && <Check className="w-4 h-4 text-[#008080]" />}
                  </button>
                ))}
              </motion.div>
            </>
          )}
        </div>
      </div>

        {/* Streak 🔥 with iconic Pumpkin #FE7F2D Accent */}
        <button
          onClick={() => {
            playPop(soundEnabled);
            onStreakClick?.();
          }}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-white/80 border border-[#FE7F2D]/30 shadow-[0_2px_0_#ffd1b3] active:translate-y-[2px] transition-all cursor-pointer group"
          title="Daily Study Streak"
        >
          <motion.div
            animate={{ scale: [1, 1.15, 1], rotate: [0, -3, 3, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Flame className="w-4.5 h-4.5 fill-[#FE7F2D] text-[#FE7F2D] drop-shadow-xs" />
          </motion.div>
          {skeletonMode ? (
            <div className="w-7 h-3 rounded-full skeleton-shimmer" />
          ) : (
            <span className="text-xs font-black text-[#FE7F2D] tabular-nums tracking-tight">
              {streak}
            </span>
          )}
        </button>

        {/* Gems / Brain XP ⚡ in Ocean Teal #008080 with soft reward sparkle */}
        <button
          onClick={() => {
            playPop(soundEnabled);
            onGemsClick?.();
          }}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-white/80 border border-[#008080]/30 shadow-[0_2px_0_#b3d9d9] active:translate-y-[2px] transition-all cursor-pointer group"
          title="Mastery Gems & XP"
        >
          <Sparkles className="w-4.5 h-4.5 fill-[#008080] text-[#008080]" />
          {skeletonMode ? (
            <div className="w-10 h-3 rounded-full skeleton-shimmer" />
          ) : (
            <span className="text-xs font-black text-[#008080] tabular-nums tracking-tight">
              {gems.toLocaleString()}
            </span>
          )}
        </button>

        {/* Brain Hearts / Lives 💖 */}
        <div className="flex items-center gap-1 px-2 py-1.5 rounded-xl bg-white/80 border border-[#e2cbba] shadow-[0_2px_0_#d1b8a5]">
          <Heart className="w-4.5 h-4.5 fill-[#e85353] text-[#e85353] animate-pulse" />
          <span className="text-xs font-black text-[#233D4D] tabular-nums">
            {hearts}
          </span>
        </div>
      </div>
    </header>
  );
};
