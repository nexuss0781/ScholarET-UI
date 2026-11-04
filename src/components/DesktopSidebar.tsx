import React from 'react';
import {
  Home,
  Package,
  Dumbbell,
  Shield,
  User,
  Search,
  Volume2,
  VolumeX,
  Eye,
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
  Sparkles,
  Layers,
  GraduationCap
} from 'lucide-react';
import { TabType } from './BottomTabBar';
import { playTap, playPop } from '../utils/audio';
import { Mascot } from './Mascot';

interface DesktopSidebarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  skeletonMode: boolean;
  onToggleSkeletonMode: () => void;
  onOpenPaletteModal: () => void;
}

export const DesktopSidebar: React.FC<DesktopSidebarProps> = ({
  activeTab,
  onTabChange,
  isCollapsed,
  onToggleCollapse,
  soundEnabled,
  onToggleSound,
  skeletonMode,
  onToggleSkeletonMode,
  onOpenPaletteModal,
}) => {
  const navItems = [
    { id: 'path' as TabType, label: 'Curriculum Path', icon: Home, code: '01' },
    { id: 'practice' as TabType, label: 'Practice Gym', icon: Dumbbell, code: '02' },
    { id: 'leaderboard' as TabType, label: 'Scholar League', icon: Shield, code: '03' },
    { id: 'quests' as TabType, label: 'Textbook Caches', icon: Package, code: '04', badge: '!' },
    { id: 'profile' as TabType, label: 'Scholar Profile', icon: User, code: '05' },
  ];

  return (
    <aside
      className={`hidden md:flex flex-col justify-between shrink-0 h-screen sticky top-0 border-r-2 border-[#192b36] bg-gradient-to-b from-[#233D4D] via-[#1d3340] to-[#162732] text-[#F4E1D2] select-none z-30 transition-all duration-300 ease-in-out shadow-2xl ${
        isCollapsed ? 'w-20 px-2.5 py-4' : 'w-64 p-4'
      }`}
    >
      {/* Top Section */}
      <div className="space-y-4">
        {/* Window Traffic Light Dots (Inspired by Reference Image 1) */}
        <div className="flex items-center justify-between px-1.5 pt-1">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] border border-[#e0443e] shadow-xs" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FE7F2D] border border-[#cf5c15] shadow-xs" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#20bf6b] border border-[#169b55] shadow-xs" />
          </div>
          {!isCollapsed && (
            <span className="text-[10px] font-black uppercase tracking-wider text-[#00A8A8] bg-[#008080]/20 border border-[#008080]/40 px-2 py-0.5 rounded-md shadow-xs">
              GRADE 12 ET
            </span>
          )}
        </div>

        {/* Brand Lockup: ScholarET */}
        <div
          onClick={() => {
            playTap(soundEnabled);
            onTabChange('path');
          }}
          className={`flex items-center cursor-pointer group transition-all ${
            isCollapsed ? 'justify-center py-2' : 'gap-3 px-1 py-1'
          }`}
          title="ScholarET - Grade 12 Textbook Curriculum"
        >
          {/* Logo 3D Icon */}
          <div className="w-11 h-11 rounded-2xl bg-[#008080] border-2 border-[#00A3A3] shadow-[0_3px_0_#005757] flex items-center justify-center font-black text-white text-xl shrink-0 group-hover:scale-105 group-hover:shadow-[0_4px_0_#005757] transition-all relative">
            <span className="text-xl leading-none">∫</span>
            {/* Pumpkin Reward Dot */}
            <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#FE7F2D] border border-white shadow-xs" />
          </div>

          {!isCollapsed && (
            <div className="overflow-hidden">
              <div className="flex items-baseline">
                <span className="text-lg font-black tracking-tight text-white leading-tight">
                  Scholar
                </span>
                <span className="text-lg font-black tracking-tight text-[#FE7F2D] leading-tight ml-0.5 drop-shadow-xs">
                  ET
                </span>
              </div>
              <p className="text-[10px] font-bold text-[#F4E1D2]/70 uppercase tracking-wider truncate flex items-center gap-1">
                <GraduationCap className="w-3 h-3 text-[#00A8A8] inline" />
                Textbook Curriculum
              </p>
            </div>
          )}
        </div>

        {/* Search / Filter Quick Trigger */}
        {!isCollapsed ? (
          <div className="relative">
            <div className="w-full flex items-center justify-between px-3 py-2 bg-[#182933] rounded-xl border border-[#2f4b5c] shadow-inner text-xs font-semibold text-[#F4E1D2]/80 hover:border-[#008080] transition-colors">
              <div className="flex items-center gap-2">
                <Search className="w-3.5 h-3.5 text-[#00A8A8]" />
                <span className="text-xs text-[#F4E1D2]/70">Search units...</span>
              </div>
              <span className="text-[10px] font-mono bg-[#233D4D] border border-[#3b596d] px-1.5 py-0.5 rounded text-[#F4E1D2]/90">
                ⌘K
              </span>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <button
              onClick={() => playTap(soundEnabled)}
              className="w-10 h-10 rounded-xl bg-[#182933] border border-[#2f4b5c] flex items-center justify-center text-[#00A8A8] hover:bg-[#233D4D] hover:border-[#008080] transition-all cursor-pointer"
              title="Search textbook units (⌘K)"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Navigation Category Label */}
        {!isCollapsed && (
          <div className="px-1 text-[10px] font-black uppercase tracking-wider text-[#00A8A8] flex items-center justify-between">
            <span>Curriculum Navigation</span>
            <span className="text-[9px] text-[#F4E1D2]/50 font-mono">v2.4</span>
          </div>
        )}

        {/* Nav Items (Colorised with strong Ocean Teal and Pumpkin accents) */}
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => {
                  playTap(soundEnabled);
                  onTabChange(item.id);
                }}
                className={`w-full flex items-center rounded-2xl font-black text-xs tracking-wide transition-all cursor-pointer relative group ${
                  isCollapsed ? 'justify-center p-2.5' : 'justify-between px-3.5 py-2.5'
                } ${
                  isActive
                    ? 'bg-[#008080] text-white border-2 border-[#00A3A3] shadow-[0_4px_0_#005757] translate-y-[-1px]'
                    : 'text-[#F4E1D2]/80 hover:bg-[#1a2e3b] hover:text-white border-2 border-transparent'
                }`}
                title={isCollapsed ? item.label : undefined}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-5 h-5 shrink-0 transition-transform ${
                      isActive
                        ? 'text-white stroke-[2.8] scale-105 drop-shadow-xs'
                        : 'text-[#00A8A8] group-hover:text-white group-hover:scale-110'
                    }`}
                  />
                  {!isCollapsed && (
                    <span className="truncate">{item.label}</span>
                  )}
                </div>

                {!isCollapsed && (
                  <div className="flex items-center gap-1.5">
                    {item.badge ? (
                      <span className="px-2 py-0.5 rounded-full bg-[#FE7F2D] text-white font-black text-[10px] shadow-[0_2px_0_#b34705] animate-pulse">
                        {item.badge}
                      </span>
                    ) : (
                      <span
                        className={`text-[9px] font-mono ${
                          isActive ? 'text-white/80' : 'text-[#F4E1D2]/40 group-hover:text-[#F4E1D2]/70'
                        }`}
                      >
                        {item.code}
                      </span>
                    )}
                  </div>
                )}

                {/* Collapsed Badge Dot in Glowing Pumpkin */}
                {isCollapsed && item.badge && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-[#FE7F2D] ring-2 ring-[#233D4D] shadow-xs" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section (Matching Reference Image 1 with bottom user card & collapse toggle) */}
      <div className="space-y-3 pt-3 border-t-2 border-[#192b36]">
        {/* Quick Toggles: Skeleton & Sound */}
        {!isCollapsed ? (
          <div className="space-y-1.5">
            {/* Skeleton Shimmer Toggle */}
            <button
              onClick={() => {
                playPop(soundEnabled);
                onToggleSkeletonMode();
              }}
              className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                skeletonMode
                  ? 'bg-[#FE7F2D] text-white border-[#cf5c15] shadow-[0_2px_0_#9a3b04]'
                  : 'bg-[#182933] text-[#F4E1D2]/80 border-[#2f4b5c] hover:bg-[#203745] hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2">
                <Eye className="w-3.5 h-3.5 text-[#00A8A8]" />
                <span>Skeleton Shimmer</span>
              </div>
              <span className="text-[10px] font-black uppercase">
                {skeletonMode ? 'ON' : 'OFF'}
              </span>
            </button>

            {/* Sound Toggle */}
            <button
              onClick={() => {
                playTap(!soundEnabled);
                onToggleSound();
              }}
              className="w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs font-bold bg-[#182933] text-[#F4E1D2]/80 border border-[#2f4b5c] hover:bg-[#203745] hover:text-white transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2">
                {soundEnabled ? (
                  <Volume2 className="w-3.5 h-3.5 text-[#00A8A8]" />
                ) : (
                  <VolumeX className="w-3.5 h-3.5 text-slate-400" />
                )}
                <span>Haptic Audio</span>
              </div>
              <span
                className={`text-[10px] font-black ${
                  soundEnabled ? 'text-[#00A8A8]' : 'text-slate-400'
                }`}
              >
                {soundEnabled ? 'ON' : 'MUTED'}
              </span>
            </button>

            {/* Palette Token Audit Link */}
            <button
              onClick={() => {
                playTap(soundEnabled);
                onOpenPaletteModal();
              }}
              className="w-full flex items-center justify-between px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider text-[#F4E1D2]/60 hover:text-[#00A8A8] transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-1.5">
                <Layers className="w-3 h-3 text-[#FE7F2D]" />
                <span>60 · 30 · 10 Palette</span>
              </div>
              <span>Audit</span>
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-1.5">
            <button
              onClick={() => {
                playPop(soundEnabled);
                onToggleSkeletonMode();
              }}
              className={`w-10 h-9 rounded-xl border flex items-center justify-center cursor-pointer transition-all ${
                skeletonMode
                  ? 'bg-[#FE7F2D] text-white border-[#cf5c15] shadow-xs'
                  : 'bg-[#182933] text-[#F4E1D2]/80 border-[#2f4b5c] hover:bg-[#233D4D]'
              }`}
              title={`Skeleton Shimmer: ${skeletonMode ? 'ON' : 'OFF'}`}
            >
              <Eye className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                playTap(!soundEnabled);
                onToggleSound();
              }}
              className="w-10 h-9 rounded-xl bg-[#182933] border border-[#2f4b5c] flex items-center justify-center text-[#00A8A8] hover:bg-[#233D4D] cursor-pointer"
              title={`Tactile Audio: ${soundEnabled ? 'ON' : 'MUTED'}`}
            >
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-[#00A8A8]" />
              ) : (
                <VolumeX className="w-4 h-4 text-slate-400" />
              )}
            </button>
          </div>
        )}

        {/* User Profile Card with the Bottom Sidebar Collapser/Expander Button (Matching Image 1) */}
        <div
          className={`p-2 rounded-2xl bg-[#182a36] border-2 border-[#2b4453] shadow-md flex items-center transition-all ${
            isCollapsed ? 'flex-col gap-2 p-1.5' : 'justify-between gap-2'
          }`}
        >
          {/* Avatar & User Details */}
          <div className={`flex items-center gap-2.5 overflow-hidden ${isCollapsed ? 'flex-col' : ''}`}>
            {/* Archie Vector Avatar in Ocean Teal frame */}
            <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-[#008080] shadow-xs shrink-0 flex items-center justify-center bg-[#233D4D]">
              <Mascot size="xs" interactive={false} />
            </div>
            {!isCollapsed && (
              <div className="overflow-hidden">
                <div className="font-black text-xs text-white truncate leading-tight flex items-center gap-1">
                  <span>Archie Scholar</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00A8A8]" />
                </div>
                <div className="text-[10px] text-[#F4E1D2]/70 font-semibold truncate">
                  ScholarET · Grade 12
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Collapser / Expander Button at Bottom (Requested in Prompt) */}
          <button
            onClick={() => {
              playTap(soundEnabled);
              onToggleCollapse();
            }}
            className="w-8 h-8 rounded-xl bg-[#008080] hover:bg-[#009696] border border-[#00A3A3] shadow-[0_2px_0_#005757] flex items-center justify-center text-white active:scale-90 transition-all cursor-pointer shrink-0"
            title={isCollapsed ? 'Expand sidebar (Ctrl+B)' : 'Collapse sidebar (Ctrl+B)'}
          >
            {isCollapsed ? (
              <PanelLeftOpen className="w-4 h-4" />
            ) : (
              <PanelLeftClose className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </aside>
  );
};
