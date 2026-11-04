import React from 'react';
import { Home, Package, Dumbbell, Shield, User, Bell } from 'lucide-react';
import { motion } from 'motion/react';
import { playTap } from '../utils/audio';
import { Mascot } from './Mascot';

export type TabType = 'path' | 'quests' | 'practice' | 'leaderboard' | 'profile';

interface BottomTabBarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  soundEnabled: boolean;
}

export const BottomTabBar: React.FC<BottomTabBarProps> = ({
  activeTab,
  onTabChange,
  soundEnabled,
}) => {
  const tabs = [
    { id: 'path' as TabType, label: 'Curriculum', icon: Home, badge: null },
    { id: 'quests' as TabType, label: 'Caches', icon: Package, badge: '!' },
    { id: 'practice' as TabType, label: 'Gym', icon: Dumbbell, badge: null },
    { id: 'leaderboard' as TabType, label: 'Leagues', icon: Shield, badge: null },
    { id: 'profile' as TabType, label: 'Scholar', icon: User, badge: null },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-t from-[#162732] to-[#233D4D] text-[#F4E1D2] border-t-2 border-[#192b36] shadow-2xl w-full select-none">
      <div className="grid grid-cols-5 items-center h-16 px-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => {
                playTap(soundEnabled);
                onTabChange(tab.id);
              }}
              className="relative flex flex-col items-center justify-center h-full py-1 cursor-pointer transition-all active:scale-90"
              aria-label={tab.label}
            >
              {/* Active Tab Background Pill */}
              <div className="relative">
                {isActive && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute -inset-2 bg-[#008080] border border-[#00A3A3] shadow-[0_2px_0_#005757] rounded-2xl -z-10"
                    transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                  />
                )}

                {tab.id === 'profile' ? (
                  <div
                    className={`w-7 h-7 rounded-full overflow-hidden border-2 transition-all flex items-center justify-center bg-[#233D4D] ${
                      isActive ? 'border-white scale-110 shadow-xs' : 'border-[#008080]/60'
                    }`}
                  >
                    <Mascot size="xs" interactive={false} />
                  </div>
                ) : (
                  <Icon
                    className={`w-5.5 h-5.5 transition-all ${
                      isActive
                        ? 'text-white stroke-[2.8] scale-110 drop-shadow-xs'
                        : 'text-[#00A8A8] hover:text-white stroke-[2]'
                    }`}
                  />
                )}

                {/* Badge alert in glowing Pumpkin #FE7F2D */}
                {tab.badge && (
                  <span className="absolute -top-1.5 -right-2 w-4 h-4 bg-[#FE7F2D] text-white rounded-full text-[9px] font-black flex items-center justify-center border border-white shadow-xs animate-pulse">
                    {tab.badge}
                  </span>
                )}
              </div>

              {/* Minimal caption */}
              <span
                className={`text-[10px] font-black tracking-tight mt-1 transition-colors ${
                  isActive ? 'text-white' : 'text-[#F4E1D2]/70'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
