import React from 'react';
import { Shield, Flame, Trophy, Medal } from 'lucide-react';
import { motion } from 'motion/react';
import { playTap } from '../utils/audio';

interface LeaderboardViewProps {
  soundEnabled: boolean;
  skeletonMode: boolean;
}

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({
  soundEnabled,
  skeletonMode,
}) => {
  const ranks = [
    { rank: 1, name: 'Archie (You) · ScholarET', score: 2514, avatar: '🦉', isUser: true },
    { rank: 2, name: 'Elena R. · AP Calc', score: 2480, avatar: '👩‍🔬', isUser: false },
    { rank: 3, name: 'Liam S. · Physics C', score: 2310, avatar: '⚡', isUser: false },
    { rank: 4, name: 'Maya K. · Bio Chem', score: 1950, avatar: '🧬', isUser: false },
    { rank: 5, name: 'Devon W. · Calculus', score: 1820, avatar: '📐', isUser: false },
  ];

  return (
    <div className="p-4 pb-24 md:pb-8 w-full max-w-xl mx-auto space-y-4 select-none">
      {/* Top Shield Header */}
      <div className="p-4 rounded-2xl bg-[#008080] text-white shadow-[0_4px_0_#005a5a] text-center relative overflow-hidden">
        <div className="w-12 h-12 mx-auto mb-2 rounded-2xl bg-white/20 flex items-center justify-center">
          <Shield className="w-7 h-7 text-white fill-white/20" />
        </div>
        <h2 className="text-xl font-black tracking-tight">Sapphire Scholar League</h2>
        <p className="text-xs text-white/80 mt-0.5">Top 10 Grade 12 students advance this Sunday!</p>
      </div>

      {/* Roster list */}
      <div className="space-y-2">
        {ranks.map((item) => (
          <div
            key={item.rank}
            className={`p-3 rounded-2xl border-2 flex items-center justify-between transition-all ${
              item.isUser
                ? 'bg-[#e6f4f4] border-[#008080] shadow-[0_3px_0_#005a5a]'
                : 'bg-white border-[#e2cbba] shadow-[0_2px_0_#d1b8a5]'
            }`}
          >
            <div className="flex items-center gap-3">
              <span
                className={`w-6 text-center font-black text-sm ${
                  item.rank === 1
                    ? 'text-[#FE7F2D]'
                    : item.rank === 2
                    ? 'text-[#008080]'
                    : 'text-[#233D4D]/60'
                }`}
              >
                {item.rank}
              </span>
              <div className="w-9 h-9 rounded-xl bg-[#F4E1D2] flex items-center justify-center text-lg border border-[#e2cbba]">
                {item.avatar}
              </div>
              <div>
                {skeletonMode ? (
                  <div className="w-24 h-4 rounded skeleton-shimmer" />
                ) : (
                  <div className="font-bold text-xs text-[#233D4D]">
                    {item.name}
                  </div>
                )}
                <span className="text-[10px] text-[#233D4D]/60 font-semibold">
                  Textbook Streak Master
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <span className="font-black text-xs text-[#FE7F2D] tabular-nums">
                {item.score}
              </span>
              <span className="text-[10px] font-bold text-[#FE7F2D]">XP</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
