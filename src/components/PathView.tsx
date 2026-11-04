import React, { useState } from 'react';
import { BookOpen, Dumbbell, Star, Check, Lock, Sparkles, BookMarked, Award } from 'lucide-react';
import { motion } from 'motion/react';
import { Mascot, MascotMood } from './Mascot';
import { playPop, playTap, playChestOpen } from '../utils/audio';

interface PathNode {
  id: string;
  type: 'gold_check' | 'book' | 'dumbbell' | 'active_star' | 'chest' | 'locked';
  title: string;
  subtitle: string;
  progressPercent?: number;
  stars?: number;
  xOffset: number; // -60 to +60 horizontal offset for authentic winding path
}

interface PathViewProps {
  onStartLesson: () => void;
  onOpenChest: () => void;
  onOpenGuidebook: () => void;
  soundEnabled: boolean;
  skeletonMode?: boolean;
  activeSubject: string;
}

export const PathView: React.FC<PathViewProps> = ({
  onStartLesson,
  onOpenChest,
  onOpenGuidebook,
  soundEnabled,
  skeletonMode = false,
  activeSubject,
}) => {
  const [mascotMood, setMascotMood] = useState<MascotMood>('reading');

  // Curriculum nodes representing Grade 12 Textbook Chapter
  const nodes: PathNode[] = [
    {
      id: 'node-1',
      type: 'gold_check',
      title: 'Limits by Direct Substitution',
      subtitle: 'Section 2.1 · Mastered',
      stars: 3,
      xOffset: 0,
    },
    {
      id: 'node-2',
      type: 'book',
      title: 'Indeterminate Forms & Factoring',
      subtitle: 'Section 2.2 · Completed',
      stars: 3,
      xOffset: 35,
    },
    {
      id: 'node-3',
      type: 'dumbbell',
      title: 'Speed Drill: Squeeze Theorem',
      subtitle: 'Rapid Practice Workout',
      stars: 2,
      xOffset: 55,
    },
    {
      id: 'node-4',
      type: 'active_star',
      title: 'L\'Hôpital\'s Rule Mastery',
      subtitle: 'Section 2.4 · In Progress',
      progressPercent: 75,
      stars: 0,
      xOffset: 30,
    },
    {
      id: 'node-5',
      type: 'chest',
      title: 'Chapter 2 Textbook Cache',
      subtitle: 'Unlocks at 500 XP',
      xOffset: -10,
    },
    {
      id: 'node-6',
      type: 'locked',
      title: 'Intermediate Value Theorem',
      subtitle: 'Section 2.5 · Locked',
      xOffset: -40,
    },
    {
      id: 'node-7',
      type: 'locked',
      title: 'Unit 2 Exam Simulation',
      subtitle: 'Final Mastery Check',
      xOffset: 0,
    },
  ];

  return (
    <div className="relative pb-24 md:pb-8 w-full max-w-xl mx-auto select-none">
      {/* Unit Header Card (Matching Image 2 green banner, but in our Ocean Teal #008080) */}
      <div className="mx-3 mt-3 p-4 rounded-2xl bg-[#008080] text-white shadow-[0_5px_0_#005a5a] transition-all relative overflow-hidden">
        {/* Subtle geometric pattern overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg width="100%" height="100%">
            <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
              <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#ffffff" strokeWidth="1" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="flex items-start justify-between relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-black tracking-wider uppercase bg-white/20 px-2 py-0.5 rounded-md text-white/95">
                ScholarET · Grade 12
              </span>
              <span className="text-[11px] font-extrabold text-[#ffd9bf]">
                Unit 2 of 8
              </span>
            </div>

            {skeletonMode ? (
              <div className="space-y-1.5 my-1">
                <div className="w-40 h-5 rounded-md skeleton-shimmer-teal bg-white/30" />
                <div className="w-56 h-3.5 rounded-md skeleton-shimmer-teal bg-white/20" />
              </div>
            ) : (
              <>
                <h2 className="text-xl font-black tracking-tight leading-snug drop-shadow-xs">
                  Limits & Continuity
                </h2>
                <p className="text-xs text-white/85 font-medium mt-0.5 max-w-[230px] line-clamp-1">
                  Evaluate epsilon-delta proofs & asymptotes
                </p>
              </>
            )}
          </div>

          {/* Guidebook Notebook 3D Button (Matching Image 2 top right) */}
          <button
            onClick={() => {
              playTap(soundEnabled);
              onOpenGuidebook();
            }}
            className="w-12 h-12 rounded-xl bg-white text-[#008080] border-2 border-white/60 shadow-[0_3px_0_#005a5a] active:translate-y-[2px] active:shadow-none flex items-center justify-center transition-all cursor-pointer group"
            title="Open Textbook Guidebook"
          >
            <BookMarked className="w-6 h-6 text-[#008080] group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </div>

      {/* Stepping Stone Winding Path Container */}
      <div className="relative pt-8 px-4 flex flex-col items-center">
        {/* Soft winding path trail background dots/dashed line */}
        <svg
          className="absolute top-12 left-0 right-0 w-full h-[620px] pointer-events-none opacity-20"
          viewBox="0 0 380 620"
        >
          <path
            d="M 190 40 Q 235 90 225 140 T 245 230 T 220 320 T 180 410 T 150 500 T 190 590"
            fill="none"
            stroke="#008080"
            strokeWidth="8"
            strokeDasharray="4 12"
            strokeLinecap="round"
          />
        </svg>

        {/* Mascot Archie Standing beside the active node (Matching Image 2 Duo beside book) */}
        <div
          className="absolute z-20"
          style={{ top: '235px', left: '16px' }}
        >
          <div className="flex flex-col items-center">
            <Mascot
              mood={mascotMood}
              size="md"
              withPedestal={true}
            />
            {/* 3 stars badge below mascot like Image 2 - Clickable to cycle Archie's poses! */}
            <button
              onClick={() => {
                playPop(soundEnabled);
                const moods: MascotMood[] = ['reading', 'explaining', 'thinking', 'cheering', 'idle'];
                const nextMood = moods[(moods.indexOf(mascotMood) + 1) % moods.length];
                setMascotMood(nextMood);
              }}
              className="flex items-center gap-1 mt-2 bg-white/90 hover:bg-white active:scale-95 transition-all px-2.5 py-1 rounded-full border border-[#e2cbba] shadow-xs cursor-pointer group"
              title={`Archie: ${mascotMood} (tap to cycle pose)`}
            >
              <Star className="w-3.5 h-3.5 fill-[#ffc93c] text-[#ffc93c]" />
              <Star className="w-3.5 h-3.5 fill-[#ffc93c] text-[#ffc93c]" />
              <Star className="w-3.5 h-3.5 fill-[#ffc93c] text-[#ffc93c]" />
              <span className="text-[9px] font-black uppercase text-[#008080] ml-0.5 tracking-wider">
                {mascotMood}
              </span>
            </button>
          </div>
        </div>

        {/* Path Nodes List */}
        <div className="w-full flex flex-col items-center gap-10 relative z-10">
          {nodes.map((node) => {
            const isClickable = node.type !== 'locked';

            return (
              <div
                key={node.id}
                className="relative flex flex-col items-center"
                style={{ transform: `translateX(${node.xOffset}px)` }}
              >
                {/* 1. GOLD COMPLETED NODE */}
                {node.type === 'gold_check' && (
                  <button
                    onClick={() => {
                      playPop(soundEnabled);
                      onStartLesson();
                    }}
                    className="w-18 h-18 rounded-full btn-3d-node-gold flex items-center justify-center cursor-pointer relative group"
                    title={node.title}
                  >
                    <Check className="w-9 h-9 text-white stroke-[3.5] drop-shadow-xs" />
                    {/* Mastery Crown Sparkle */}
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#FE7F2D] rounded-full flex items-center justify-center text-white text-[10px] shadow-xs border-2 border-white">
                      ★
                    </span>
                  </button>
                )}

                {/* 2. COMPLETED BOOK / THEORY NODE */}
                {node.type === 'book' && (
                  <button
                    onClick={() => {
                      playPop(soundEnabled);
                      onStartLesson();
                    }}
                    className="w-17 h-17 rounded-full btn-3d-node-teal flex items-center justify-center cursor-pointer relative group"
                    title={node.title}
                  >
                    <BookOpen className="w-8 h-8 text-white stroke-[2.5]" />
                  </button>
                )}

                {/* 3. DUMBBELL PRACTICE DRILL NODE */}
                {node.type === 'dumbbell' && (
                  <button
                    onClick={() => {
                      playPop(soundEnabled);
                      onStartLesson();
                    }}
                    className="w-17 h-17 rounded-full btn-3d-node-teal flex items-center justify-center cursor-pointer relative group"
                    title={node.title}
                  >
                    <Dumbbell className="w-8 h-8 text-white stroke-[2.5]" />
                  </button>
                )}

                {/* 4. ACTIVE PROGRESS NODE (With animated 'START' speech bubble & circular progress ring!) */}
                {node.type === 'active_star' && (
                  <div className="relative flex flex-col items-center">
                    {/* Bouncing START Speech Balloon (Matching Image 2 'START' bubble) */}
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute -top-12 z-30 flex flex-col items-center pointer-events-none"
                    >
                      <div className="px-3.5 py-1.5 rounded-xl bg-white border-2 border-[#008080] shadow-[0_3px_0_#d1b8a5] flex items-center gap-1.5">
                        <span className="text-xs font-black text-[#008080] tracking-wider">
                          START
                        </span>
                        <Sparkles className="w-3.5 h-3.5 fill-[#FE7F2D] text-[#FE7F2D]" />
                      </div>
                      {/* Triangle Pointer Tail */}
                      <div className="w-3 h-2 -mt-0.5 overflow-hidden">
                        <div className="w-2.5 h-2.5 bg-white border-b-2 border-r-2 border-[#008080] transform rotate-45 mx-auto -translate-y-1.5" />
                      </div>
                    </motion.div>

                    {/* Concentric Progress Ring */}
                    <div className="relative p-2.5">
                      <svg className="absolute inset-0 w-full h-full transform -rotate-90 pointer-events-none">
                        <circle
                          cx="50%"
                          cy="50%"
                          r="44"
                          stroke="#e2cbba"
                          strokeWidth="8"
                          fill="transparent"
                        />
                        <circle
                          cx="50%"
                          cy="50%"
                          r="44"
                          stroke="#008080"
                          strokeWidth="8"
                          strokeDasharray="276"
                          strokeDashoffset={276 - (276 * 0.75)}
                          strokeLinecap="round"
                          fill="transparent"
                        />
                      </svg>

                      {/* Tactile Big 3D Star Node */}
                      <button
                        onClick={() => {
                          playPop(soundEnabled);
                          onStartLesson();
                        }}
                        className="w-20 h-20 rounded-full btn-3d-node-teal flex items-center justify-center cursor-pointer relative shadow-lg"
                        title={node.title}
                      >
                        <motion.div
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <Star className="w-10 h-10 fill-white text-white drop-shadow-sm" />
                        </motion.div>
                      </button>
                    </div>
                  </div>
                )}

                {/* 5. TREASURE CHEST NODE (With Pumpkin #FE7F2D lock) */}
                {node.type === 'chest' && (
                  <button
                    onClick={() => {
                      playChestOpen(soundEnabled);
                      onOpenChest();
                    }}
                    className="flex flex-col items-center group cursor-pointer active:scale-95 transition-transform"
                    title="Unlock Chapter Chest"
                  >
                    {/* Duolingo-style 3D Treasure Chest */}
                    <div className="relative w-20 h-16 flex flex-col items-center">
                      {/* Chest Lid */}
                      <div className="w-18 h-7 bg-[#d9c4b3] rounded-t-xl border-2 border-[#bfa593] shadow-[0_3px_0_#9f8674] relative flex items-center justify-center group-hover:bg-[#e4d2c3] transition-colors">
                        <div className="w-8 h-2.5 bg-[#9f8674] rounded-t-xs" />
                        {/* Metal Brackets */}
                        <div className="absolute left-2.5 top-0 bottom-0 w-2 bg-[#9f8674]" />
                        <div className="absolute right-2.5 top-0 bottom-0 w-2 bg-[#9f8674]" />
                      </div>
                      {/* Chest Base */}
                      <div className="w-18 h-8 bg-[#cbb3a1] rounded-b-lg border-2 border-[#bfa593] shadow-[0_5px_0_#9f8674] relative flex items-center justify-center -mt-0.5">
                        <div className="absolute left-2.5 top-0 bottom-0 w-2 bg-[#9f8674]" />
                        <div className="absolute right-2.5 top-0 bottom-0 w-2 bg-[#9f8674]" />
                        {/* Pumpkin Reward Lock */}
                        <div className="w-5 h-6 bg-[#FE7F2D] rounded-sm border border-[#cf5c15] shadow-xs flex items-center justify-center z-10">
                          <div className="w-1.5 h-2 bg-[#233D4D] rounded-full" />
                        </div>
                      </div>
                    </div>
                    {/* Chest Label */}
                    {skeletonMode ? (
                      <div className="w-16 h-2.5 mt-2 rounded-full skeleton-shimmer" />
                    ) : (
                      <span className="text-[10px] font-black tracking-wider text-[#233D4D]/70 uppercase mt-1">
                        Bonus Cache
                      </span>
                    )}
                  </button>
                )}

                {/* 6. LOCKED FUTURE NODES */}
                {node.type === 'locked' && (
                  <div
                    className="w-16 h-16 rounded-full bg-[#e2cbba]/70 border-2 border-[#d1b8a5] shadow-[0_6px_0_#c2ab98] flex items-center justify-center opacity-80"
                    title={node.title}
                  >
                    <Lock className="w-6 h-6 text-[#233D4D]/40" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
