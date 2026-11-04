/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { DesktopSidebar } from './components/DesktopSidebar';
import { TopStatsBar } from './components/TopStatsBar';
import { PathView } from './components/PathView';
import { ExerciseView } from './components/ExerciseView';
import { BottomTabBar, TabType } from './components/BottomTabBar';
import { ChestModal } from './components/ChestModal';
import { GuidebookModal } from './components/GuidebookModal';
import { GymView } from './components/GymView';
import { LeaderboardView } from './components/LeaderboardView';
import { ProfileView } from './components/ProfileView';
import { DesignTokensPanel } from './components/DesignTokensPanel';
import { playPop, playSuccess, playTap } from './utils/audio';

export default function App() {
  // Navigation & View State
  const [activeView, setActiveView] = useState<'path' | 'exercise'>('path');
  const [activeTab, setActiveTab] = useState<TabType>('path');
  const [activeSubject, setActiveSubject] = useState<string>('calc');

  // Sidebar Collapse State (Collapsed by default on desktop)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(true);

  // Gamification Metrics (Matching Grade 12 Textbook Curriculum)
  const [streak, setStreak] = useState<number>(2514);
  const [gems, setGems] = useState<number>(22698);
  const [hearts, setHearts] = useState<number>(5);

  // Modals & Panels
  const [chestModalOpen, setChestModalOpen] = useState<boolean>(false);
  const [guidebookOpen, setGuidebookOpen] = useState<boolean>(false);
  const [colorAuditOpen, setColorAuditOpen] = useState<boolean>(false);

  // UX Controls
  const [skeletonMode, setSkeletonMode] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Keyboard shortcut Ctrl+B / Cmd+B for sidebar toggle
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
        e.preventDefault();
        setIsSidebarCollapsed(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handlers
  const handleStartLesson = () => {
    playPop(soundEnabled);
    setActiveView('exercise');
  };

  const handleCompleteLesson = () => {
    playSuccess(soundEnabled);
    setGems(prev => prev + 25);
    setStreak(prev => prev + 1);
    setActiveView('path');
  };

  const handleClaimChest = () => {
    playSuccess(soundEnabled);
    setGems(prev => prev + 50);
    setChestModalOpen(false);
  };

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    if (activeView === 'exercise') {
      setActiveView('path');
    }
  };

  return (
    <div className="min-h-screen bg-[#F4E1D2] text-[#233D4D] antialiased selection:bg-[#008080] selection:text-white flex flex-col justify-between">
      {/* Exercise / Lesson Session View (Pure Full Screen & Focused) */}
      {activeView === 'exercise' ? (
        <div className="w-full min-h-screen bg-[#F4E1D2] flex flex-col items-center justify-between">
          <ExerciseView
            onClose={() => setActiveView('path')}
            onComplete={handleCompleteLesson}
            soundEnabled={soundEnabled}
            skeletonMode={skeletonMode}
            onToggleSkeletonMode={() => setSkeletonMode(!skeletonMode)}
          />
        </div>
      ) : (
        /* Full Screen & Clean Focused Platform Layout */
        <div className="w-full min-h-screen flex flex-col md:flex-row bg-[#F4E1D2]">
          {/* 1. Collapsible Left Sidebar for Desktop & Tablets (>= 768px) */}
          <DesktopSidebar
            activeTab={activeTab}
            onTabChange={handleTabChange}
            isCollapsed={isSidebarCollapsed}
            onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            soundEnabled={soundEnabled}
            onToggleSound={() => setSoundEnabled(!soundEnabled)}
            skeletonMode={skeletonMode}
            onToggleSkeletonMode={() => setSkeletonMode(!skeletonMode)}
            onOpenPaletteModal={() => setColorAuditOpen(true)}
          />

          {/* 2. Main Full-Screen Focused Stage (No redundant side panels) */}
          <main className="flex-1 flex flex-col min-h-screen min-w-0 transition-all duration-300 ease-in-out">
            {/* Top Navigation & Status Bar */}
            <TopStatsBar
              streak={streak}
              gems={gems}
              hearts={hearts}
              soundEnabled={soundEnabled}
              activeSubject={activeSubject}
              onSubjectChange={(subj) => setActiveSubject(subj)}
              onStreakClick={() => setColorAuditOpen(true)}
              onGemsClick={() => setChestModalOpen(true)}
              skeletonMode={skeletonMode}
            />

            {/* Tab Body - Centered with Generous Breathing Room */}
            <div className="flex-1 py-4 px-3 sm:px-8 max-w-3xl w-full mx-auto">
              {activeTab === 'path' && (
                <PathView
                  onStartLesson={handleStartLesson}
                  onOpenChest={() => setChestModalOpen(true)}
                  onOpenGuidebook={() => setGuidebookOpen(true)}
                  soundEnabled={soundEnabled}
                  skeletonMode={skeletonMode}
                  activeSubject={activeSubject}
                />
              )}

              {activeTab === 'quests' && (
                <div className="p-4 pb-24 md:pb-8 w-full max-w-xl mx-auto space-y-4">
                  <div className="p-5 rounded-3xl bg-[#008080] text-white shadow-[0_5px_0_#005a5a]">
                    <span className="text-[11px] font-black uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-md">
                      Curriculum Rewards
                    </span>
                    <h2 className="text-2xl font-black mt-2">Daily Textbook Caches</h2>
                    <p className="text-xs text-white/85 mt-1 font-medium">
                      Complete calculus exercises to unlock today’s formula cache!
                    </p>
                  </div>

                  <div
                    onClick={() => setChestModalOpen(true)}
                    className="p-5 bg-white rounded-3xl border-2 border-[#e2cbba] shadow-[0_3px_0_#d1b8a5] flex items-center justify-between cursor-pointer hover:border-[#008080] transition-colors"
                  >
                    <div className="flex items-center gap-3.5">
                      <span className="text-3xl">🎁</span>
                      <div>
                        <div className="font-black text-sm text-[#233D4D]">Chapter 2 Bonus Cache</div>
                        <div className="text-xs text-[#FE7F2D] font-black mt-0.5">+50 Mastery XP Available</div>
                      </div>
                    </div>
                    <button className="px-4 py-2 rounded-xl btn-3d-pumpkin text-xs font-black uppercase cursor-pointer">
                      OPEN CACHE
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'practice' && (
                <GymView
                  onStartDrill={handleStartLesson}
                  soundEnabled={soundEnabled}
                  skeletonMode={skeletonMode}
                />
              )}

              {activeTab === 'leaderboard' && (
                <LeaderboardView
                  soundEnabled={soundEnabled}
                  skeletonMode={skeletonMode}
                />
              )}

              {activeTab === 'profile' && (
                <ProfileView
                  streak={streak}
                  gems={gems}
                  skeletonMode={skeletonMode}
                />
              )}
            </div>
          </main>

          {/* 3. Bottom Tab Bar for Mobile Screens (< 768px) */}
          <BottomTabBar
            activeTab={activeTab}
            onTabChange={handleTabChange}
            soundEnabled={soundEnabled}
          />
        </div>
      )}

      {/* Global Modals */}
      <ChestModal
        isOpen={chestModalOpen}
        onClose={() => setChestModalOpen(false)}
        soundEnabled={soundEnabled}
        onClaim={handleClaimChest}
      />

      <GuidebookModal
        isOpen={guidebookOpen}
        onClose={() => setGuidebookOpen(false)}
        soundEnabled={soundEnabled}
        skeletonMode={skeletonMode}
      />

      <DesignTokensPanel
        isOpen={colorAuditOpen}
        onClose={() => setColorAuditOpen(false)}
      />
    </div>
  );
}
