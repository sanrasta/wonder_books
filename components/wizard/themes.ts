// Theme configurations for different endpoints

import { ThemeConfig } from './types';

export const kidsTheme: ThemeConfig = {
  variant: 'kids',
  colors: {
    primary: '#A5B4FC',      // Periwinkle
    primaryHover: '#818CF8', // Indigo
    accent: '#FFB7A1',       // Peach
    accentHover: '#FFA58A',  // Darker peach
    background: 'from-[#EFF6FF] to-[#F0FDF4]', // Blue to mint gradient
    backgroundAlt: '#EFF6FF',
    cardBg: 'rgba(255, 255, 255, 0.8)',
    highlight: '#FEF3C7',    // Sherbet yellow
    text: '#1E293B',         // Slate 800
    textMuted: '#64748B',    // Slate 500
  },
  packs: [
    { id: 1, name: 'Adventurer', pages: 12, price: 29, icon: '🌟' },
    { id: 2, name: 'Explorer', pages: 24, price: 49, popular: true, icon: '🚀' },
    { id: 3, name: 'Hero', pages: 36, price: 69, icon: '👑' },
  ],
  genderOptions: [
    { id: 'boy', label: 'Boy', icon: '👦' },
    { id: 'girl', label: 'Girl', icon: '👧' },
  ],
  stepCount: 4,
};

export const valentinesTheme: ThemeConfig = {
  variant: 'valentines',
  colors: {
    primary: '#F43F5E',      // Rose 500
    primaryHover: '#E11D48', // Rose 600
    accent: '#EC4899',       // Pink 500
    accentHover: '#DB2777',  // Pink 600
    background: 'from-[#FFF1F2] to-[#FCE7F3]', // Rose to pink gradient
    backgroundAlt: '#FFF1F2',
    cardBg: 'rgba(255, 255, 255, 0.85)',
    highlight: '#FECDD3',    // Rose 200
    text: '#881337',         // Rose 900
    textMuted: '#BE123C',    // Rose 700
  },
  packs: [
    { id: 1, name: 'Sweetheart', pages: 12, price: 39, icon: '💕' },
    { id: 2, name: 'Soulmate', pages: 24, price: 59, popular: true, icon: '💘' },
    { id: 3, name: 'Forever', pages: 36, price: 79, icon: '💎' },
  ],
  genderOptions: [
    { id: 'her', label: 'For Her', icon: '👩' },
    { id: 'him', label: 'For Him', icon: '👨' },
    { id: 'us', label: 'For Us', icon: '💑' },
  ],
  stepCount: 4,
};

export function getTheme(variant: 'kids' | 'valentines'): ThemeConfig {
  return variant === 'valentines' ? valentinesTheme : kidsTheme;
}

