import React from 'react';
import { Award, Flame, Calendar, BookOpen, Clock, Sparkles } from 'lucide-react';
import { Mascot } from './Mascot';

interface ProfileViewProps {
  streak: number;
  gems: number;
  skeletonMode: boolean;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  streak,
  gems,
  skeletonMode,
}) => {
  const badges = [
    { title: 'Calculus Pioneer', desc: 'Finished Chapter 2', icon: '📐', level: 'Gold' },
    { title: 'Flame Guardian', desc: '14-Day Study Streak', icon: '🔥', level: 'Ruby' },
    { title: 'Proof Master', desc: '100 Theorems Proven', icon: '📜', level: 'Silver' },
    { title: 'Night Scholar', desc: 'Studied past 9 PM', icon: '🦉', level: 'Bronze' },
  ];

  return (
    <div className="p-4 pb-24 md:pb-8 w-full max-w-xl mx-auto space-y-4 select-none">
      {/* Profile Header */}
      <div className="p-5 bg-white rounded-3xl border-2 border-[#e2cbba] shadow-[0_4px_0_#d1b8a5] flex flex-col items-center text-center">
        <Mascot mood="cheering" size="md" />
        <h2 className="text-xl font-black text-[#233D4D] mt-2">Archie Scholar</h2>
        <span className="text-xs font-bold text-[#008080]">Grade 12 STEM Candidate · Class of '26</span>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-2 w-full mt-4 pt-4 border-t border-[#e2cbba]/60">
          <div className="flex flex-col items-center">
            <span className="text-lg font-black text-[#FE7F2D]">{streak}</span>
            <span className="text-[10px] font-bold text-[#233D4D]/60 uppercase">Day Streak</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-lg font-black text-[#008080]">{gems}</span>
            <span className="text-[10px] font-bold text-[#233D4D]/60 uppercase">Total XP</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-lg font-black text-[#233D4D]">Sapphire</span>
            <span className="text-[10px] font-bold text-[#233D4D]/60 uppercase">League</span>
          </div>
        </div>
      </div>

      {/* Badges Cabinet */}
      <div className="p-4 bg-white rounded-3xl border-2 border-[#e2cbba] shadow-[0_3px_0_#d1b8a5]">
        <h3 className="font-black text-sm text-[#233D4D] mb-3 flex items-center gap-1.5">
          <Award className="w-4 h-4 text-[#FE7F2D]" />
          Textbook Mastery Badges
        </h3>

        <div className="grid grid-cols-2 gap-2.5">
          {badges.map((b, i) => (
            <div
              key={i}
              className="p-3 rounded-2xl bg-[#F4E1D2]/40 border border-[#e2cbba] flex items-center gap-2.5"
            >
              <span className="text-2xl">{b.icon}</span>
              <div>
                <div className="font-black text-xs text-[#233D4D] leading-tight">{b.title}</div>
                <div className="text-[10px] text-[#233D4D]/60 font-semibold">{b.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
