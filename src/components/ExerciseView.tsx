import React, { useState } from 'react';
import { X, Volume2, Check, Share2, Flag, ArrowRight, Sparkles, RefreshCw } from 'lucide-react';
import { motion } from 'motion/react';
import { Mascot } from './Mascot';
import { playPop, playSuccess, playTap } from '../utils/audio';

interface TokenItem {
  id: string;
  text: string;
  visualSkeletonWidth?: number; // for skeleton visual token
}

interface ExerciseViewProps {
  onClose: () => void;
  onComplete: () => void;
  soundEnabled: boolean;
  skeletonMode: boolean;
  onToggleSkeletonMode: () => void;
}

export const ExerciseView: React.FC<ExerciseViewProps> = ({
  onClose,
  onComplete,
  soundEnabled,
  skeletonMode,
  onToggleSkeletonMode,
}) => {
  // Calculus theorem proof step: lim x->0 (sin x / x) = 1
  const initialBank: TokenItem[] = [
    { id: 't1', text: 'lim x→0', visualSkeletonWidth: 64 },
    { id: 't2', text: 'sin(x)', visualSkeletonWidth: 48 },
    { id: 't3', text: '/ x', visualSkeletonWidth: 36 },
    { id: 't4', text: '=', visualSkeletonWidth: 28 },
    { id: 't5', text: '1', visualSkeletonWidth: 24 },
    { id: 't6', text: 'continuous', visualSkeletonWidth: 80 },
    { id: 't7', text: 'cos(0)', visualSkeletonWidth: 54 },
    { id: 't8', text: 'dx', visualSkeletonWidth: 32 },
  ];

  // Starting pre-placed tokens (matching image 1 where some tokens are on the lines)
  const [selectedTokens, setSelectedTokens] = useState<TokenItem[]>([
    initialBank[0],
    initialBank[1],
    initialBank[2],
  ]);

  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [mascotSpeaking, setMascotSpeaking] = useState(false);

  // Check if token is placed
  const isSelected = (id: string) => selectedTokens.some(t => t.id === id);

  const handleSelectToken = (token: TokenItem) => {
    if (isSelected(token.id) || isAnswerChecked) return;
    playPop(soundEnabled);
    setSelectedTokens([...selectedTokens, token]);
  };

  const handleRemoveToken = (token: TokenItem) => {
    if (isAnswerChecked) return;
    playTap(soundEnabled);
    setSelectedTokens(selectedTokens.filter(t => t.id !== token.id));
  };

  const handleSpeakerClick = () => {
    playPop(soundEnabled);
    setMascotSpeaking(true);
    setTimeout(() => setMascotSpeaking(false), 1200);
  };

  const handleCheckAnswer = () => {
    playSuccess(soundEnabled);
    setIsAnswerChecked(true);
  };

  const handleReset = () => {
    playTap(soundEnabled);
    setSelectedTokens([]);
    setIsAnswerChecked(false);
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-between w-full max-w-2xl mx-auto select-none bg-[#F4E1D2] px-2 sm:px-4">
      {/* 1. Header (Matching Image 1: Close X, Progress Bar, Streak Pill, Hearts) */}
      <div className="px-4 pt-3 pb-2 flex items-center justify-between gap-3">
        {/* Close Button */}
        <button
          onClick={() => {
            playTap(soundEnabled);
            onClose();
          }}
          className="w-10 h-10 rounded-full flex items-center justify-center text-[#233D4D]/60 hover:text-[#233D4D] hover:bg-black/5 active:scale-95 transition-all cursor-pointer"
          aria-label="Exit exercise"
        >
          <X className="w-6 h-6 stroke-[2.5]" />
        </button>

        {/* Segmented Progress Bar in Ocean Teal #008080 */}
        <div className="flex-1 flex flex-col items-center">
          {/* Top Streak mini-label in Pumpkin #FE7F2D */}
          <div className="flex items-center gap-1 text-[11px] font-black uppercase tracking-wider text-[#FE7F2D] mb-1">
            <Sparkles className="w-3 h-3 fill-[#FE7F2D]" />
            <span>2 in a row</span>
          </div>
          <div className="w-full h-3.5 bg-[#e2cbba] rounded-full overflow-hidden p-0.5 shadow-inner">
            <motion.div
              initial={{ width: '45%' }}
              animate={{ width: isAnswerChecked ? '75%' : '60%' }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="h-full bg-[#008080] rounded-full relative shadow-xs"
            >
              <div className="absolute top-0.5 left-2 right-2 h-1 bg-white/35 rounded-full" />
            </motion.div>
          </div>
        </div>

        {/* Lives / Hearts */}
        <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/60 border border-[#e2cbba]">
          <span className="text-red-500 text-sm">❤️</span>
          <span className="text-xs font-black text-[#233D4D]">2</span>
        </div>
      </div>

      {/* Main Exercise Content Area */}
      <div className="px-4 flex-1 flex flex-col justify-start pt-2">
        {/* Question Prompt Title (Visual Skeleton or Human Title) */}
        <div className="mb-4">
          {skeletonMode ? (
            <div className="space-y-2">
              <div className="w-48 h-6 rounded-md skeleton-shimmer" />
              <div className="w-32 h-3.5 rounded-md skeleton-shimmer" />
            </div>
          ) : (
            <div>
              <h1 className="text-xl font-black text-[#233D4D] tracking-tight">
                Complete the Textbook Theorem
              </h1>
              <p className="text-xs font-semibold text-[#008080] uppercase tracking-wider">
                ScholarET · AP Calculus BC · Chapter 2 Exercise
              </p>
            </div>
          )}
        </div>

        {/* Mascot & Speech Bubble Row (Matching Image 1: Character speaking to user) */}
        <div className="flex items-start gap-2 mb-6">
          {/* Archie Mascot in talking/explaining mood */}
          <div className="shrink-0 -ml-2">
            <Mascot
              mood={isAnswerChecked ? 'cheering' : mascotSpeaking ? 'explaining' : 'idle'}
              size="md"
            />
          </div>

          {/* Speech Bubble */}
          <div className="flex-1 relative mt-2">
            <div className="p-3.5 bg-white rounded-2xl border-2 border-[#e2cbba] shadow-[0_3px_0_#d1b8a5] relative">
              {/* Speech bubble pointer triangle */}
              <div className="absolute top-5 -left-2.5 w-3 h-3 bg-white border-l-2 border-b-2 border-[#e2cbba] transform rotate-45" />

              <div className="flex items-center gap-2.5">
                {/* Audio Speaker Button (Teal #008080) */}
                <button
                  onClick={handleSpeakerClick}
                  className="w-9 h-9 rounded-xl bg-[#008080]/15 text-[#008080] hover:bg-[#008080]/25 active:scale-95 flex items-center justify-center shrink-0 transition-all cursor-pointer"
                  title="Listen to textbook theorem pronunciation"
                >
                  <Volume2 className="w-5 h-5" />
                </button>

                {/* Speech Bubble Content */}
                {skeletonMode ? (
                  <div className="flex-1 space-y-2 py-1">
                    <div className="w-full h-4 rounded-md skeleton-shimmer" />
                    <div className="w-4/5 h-3.5 rounded-md skeleton-shimmer" />
                  </div>
                ) : (
                  <div className="flex-1">
                    <div className="text-sm font-black text-[#233D4D] leading-tight">
                      Evaluate standard limit for fundamental trig ratio:
                    </div>
                    <div className="text-xs font-mono text-[#008080] font-bold mt-1 tracking-wider border-b border-dashed border-[#008080]/40 pb-0.5 inline-block">
                      f(x) = sin(x)/x as x → 0
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Solution Assembly Board: Ruled Lines with Dropped Chips (Matching Image 1) */}
        <div className="w-full mb-6">
          {/* Line 1 */}
          <div className="min-h-[46px] border-b-2 border-[#e2cbba] pb-2 flex flex-wrap items-center gap-2">
            {selectedTokens.slice(0, 5).map((token) => (
              <motion.button
                key={token.id}
                layout
                initial={{ scale: 0.8, opacity: 0, y: 10 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 450, damping: 25 }}
                onClick={() => handleRemoveToken(token)}
                className="px-3.5 py-1.5 rounded-xl bg-[#e6f4f4] border-2 border-[#008080] shadow-[0_3px_0_#005a5a] text-[#008080] font-black text-sm active:translate-y-[2px] active:shadow-none transition-all cursor-pointer"
              >
                {skeletonMode ? (
                  <div
                    className="h-3.5 rounded-md skeleton-shimmer-teal"
                    style={{ width: `${token.visualSkeletonWidth}px` }}
                  />
                ) : (
                  <span>{token.text}</span>
                )}
              </motion.button>
            ))}
          </div>

          {/* Line 2 */}
          <div className="min-h-[46px] border-b-2 border-[#e2cbba] pt-2 pb-2 flex flex-wrap items-center gap-2">
            {selectedTokens.slice(5).map((token) => (
              <motion.button
                key={token.id}
                layout
                initial={{ scale: 0.8, opacity: 0, y: 10 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 450, damping: 25 }}
                onClick={() => handleRemoveToken(token)}
                className="px-3.5 py-1.5 rounded-xl bg-[#e6f4f4] border-2 border-[#008080] shadow-[0_3px_0_#005a5a] text-[#008080] font-black text-sm active:translate-y-[2px] active:shadow-none transition-all cursor-pointer"
              >
                {skeletonMode ? (
                  <div
                    className="h-3.5 rounded-md skeleton-shimmer-teal"
                    style={{ width: `${token.visualSkeletonWidth}px` }}
                  />
                ) : (
                  <span>{token.text}</span>
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Word / Token Bank (Bottom Bank matching Image 1) */}
        <div className="mt-auto pb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-[#233D4D]/50">
              Textbook Formula Tokens
            </span>
            <button
              onClick={handleReset}
              className="text-[11px] font-bold text-[#008080] flex items-center gap-1 hover:underline cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
              Reset
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {initialBank.map((token) => {
              const selected = isSelected(token.id);

              return (
                <div key={token.id} className="relative">
                  {/* Ghost placeholder when selected */}
                  {selected && (
                    <div
                      className="px-3.5 py-2 rounded-xl bg-[#e2cbba]/60 border-2 border-dashed border-[#d1b8a5] opacity-50"
                      style={{
                        minWidth: skeletonMode ? `${token.visualSkeletonWidth! + 24}px` : '48px',
                        height: '38px',
                      }}
                    />
                  )}

                  {/* Active 3D Token Button */}
                  {!selected && (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleSelectToken(token)}
                      className="px-3.5 py-2 rounded-xl btn-3d-white border-2 border-[#e2cbba] font-bold text-sm text-[#233D4D] cursor-pointer flex items-center justify-center"
                      style={{
                        minWidth: skeletonMode ? `${token.visualSkeletonWidth! + 24}px` : '48px',
                      }}
                    >
                      {skeletonMode ? (
                        <div
                          className="h-3.5 rounded-md skeleton-shimmer"
                          style={{ width: `${token.visualSkeletonWidth}px` }}
                        />
                      ) : (
                        <span>{token.text}</span>
                      )}
                    </motion.button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3D Bottom Action Bar / Celebration Drawer (Matching Image 1 Green celebration bar) */}
      <div className="relative z-30">
        {!isAnswerChecked ? (
          // Pre-check Action Bar
          <div className="p-4 bg-[#F4E1D2] border-t border-[#e2cbba]/80 flex items-center justify-between gap-4">
            <button
              onClick={onToggleSkeletonMode}
              className="text-xs font-bold text-[#233D4D]/70 hover:text-[#233D4D] underline cursor-pointer"
            >
              {skeletonMode ? 'Show Formulas' : 'Skeleton Shimmer'}
            </button>

            <button
              onClick={handleCheckAnswer}
              disabled={selectedTokens.length === 0}
              className={`flex-1 py-3.5 px-6 rounded-2xl font-black text-sm uppercase tracking-wider transition-all cursor-pointer ${
                selectedTokens.length > 0
                  ? 'btn-3d-teal shadow-md'
                  : 'bg-[#d9c4b3] text-[#233D4D]/40 cursor-not-allowed shadow-none'
              }`}
            >
              CHECK THEOREM
            </button>
          </div>
        ) : (
          // Celebratory Bottom Sheet (Matching Image 1 'Good job! CONTINUE' drawer)
          <motion.div
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="p-5 rounded-t-3xl bg-[#dff0ea] border-t-2 border-[#008080]/30 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#008080] text-white flex items-center justify-center shadow-sm">
                  <Check className="w-5 h-5 stroke-[3]" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-[#008080] tracking-tight">
                    Good job!
                  </h3>
                  <p className="text-xs font-semibold text-[#233D4D]/70">
                    +15 XP · Formula Identity Verified
                  </p>
                </div>
              </div>

              {/* Share & Report Action Icons (Matching Image 1 top right of sheet) */}
              <div className="flex items-center gap-2 text-[#008080]">
                <button
                  onClick={() => playTap(soundEnabled)}
                  className="w-9 h-9 rounded-xl hover:bg-white/60 flex items-center justify-center transition-colors cursor-pointer"
                  title="Share achievement"
                >
                  <Share2 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => playTap(soundEnabled)}
                  className="w-9 h-9 rounded-xl hover:bg-white/60 flex items-center justify-center transition-colors cursor-pointer"
                  title="Report question"
                >
                  <Flag className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Tactile Big CONTINUE Button (Matching Image 1) in Ocean Teal / Pumpkin */}
            <button
              onClick={() => {
                playSuccess(soundEnabled);
                onComplete();
              }}
              className="w-full py-4 px-6 rounded-2xl btn-3d-teal font-black text-base uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 cursor-pointer active:translate-y-1"
            >
              <span>CONTINUE</span>
              <ArrowRight className="w-5 h-5 stroke-[2.5]" />
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};
