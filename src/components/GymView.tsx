import React from 'react';
import { Dumbbell, Zap, Flame, Trophy, Play } from 'lucide-react';
import { motion } from 'motion/react';
import { playPop, playTap } from '../utils/audio';

interface GymViewProps {
  onStartDrill: () => void;
  soundEnabled: boolean;
  skeletonMode: boolean;
}

export const GymView: React.FC<GymViewProps> = ({
  onStartDrill,
  soundEnabled,
  skeletonMode,
}) => {
  const drills = [
    { title: 'Derivatives Speedrun', xp: 20, time: '2 min', difficulty: 'Fast', color: '#008080' },
    { title: 'Trigonometric Identities', xp: 25, time: '3 min', difficulty: 'Medium', color: '#008080' },
    { title: 'Integration by Parts', xp: 35, time: '4 min', difficulty: 'Boss', color: '#FE7F2D' },
  ];

  return (
    <div className="p-4 pb-24 md:pb-8 w-full max-w-xl mx-auto space-y-4 select-none">
      {/* Header Banner */}
      <div className="p-4 rounded-2xl bg-[#008080] text-white shadow-[0_4px_0_#005a5a]">
        <div className="flex items-center gap-2 mb-1">
          <Dumbbell className="w-5 h-5 text-white" />
          <span className="text-xs font-black uppercase tracking-wider text-white/90">
            Practice Gym
          </span>
        </div>
        <h2 className="text-xl font-black tracking-tight">Grade 12 Workout Arena</h2>
        <p className="text-xs text-white/80 mt-0.5">
          Reinforce weak textbook topics and restore hearts without losing streak!
        </p>
      </div>

      {/* Drill Cards */}
      <div className="space-y-3">
        {drills.map((drill, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.02 }}
            className="p-3.5 bg-white rounded-2xl border-2 border-[#e2cbba] shadow-[0_3px_0_#d1b8a5] flex items-center justify-between gap-3"
          >
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-black shadow-sm"
                style={{ backgroundColor: drill.color }}
              >
                <Zap className="w-6 h-6 fill-white" />
              </div>
              <div>
                {skeletonMode ? (
                  <div className="space-y-1.5 py-1">
                    <div className="w-28 h-4 rounded skeleton-shimmer" />
                    <div className="w-16 h-3 rounded skeleton-shimmer" />
                  </div>
                ) : (
                  <>
                    <h4 className="font-black text-sm text-[#233D4D]">{drill.title}</h4>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-[#233D4D]/60 mt-0.5">
                      <span>⏱ {drill.time}</span>
                      <span>·</span>
                      <span className="text-[#FE7F2D] font-extrabold">+{drill.xp} XP</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            <button
              onClick={() => {
                playPop(soundEnabled);
                onStartDrill();
              }}
              className="px-3.5 py-2 rounded-xl btn-3d-teal font-black text-xs uppercase tracking-wider flex items-center gap-1 cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>GO</span>
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
