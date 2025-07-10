export type Theme = 'light' | 'dark' | 'system';

export interface ThemeColors {
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  popover: string;
  popoverForeground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  destructiveForeground: string;
  success: string;
  successForeground: string;
  warning: string;
  warningForeground: string;
  border: string;
  input: string;
  ring: string;
  gamechainPrimary: string;
  gamechainSecondary: string;
  gamechainAccent: string;
  gamechainNeutral: string;
  gamechainSurface: string;
  gamechainSurfaceVariant: string;
  gamechainOutline: string;
}

export interface GameChainTheme {
  name: string;
  colors: ThemeColors;
}

export const GAMECHAIN_THEMES: Record<'light' | 'dark', GameChainTheme> = {
  light: {
    name: 'GameChain Light',
    colors: {
      background: '#f8f9fa',
      foreground: '#1a1a1a',
      card: '#ffffff',
      cardForeground: '#1a1a1a',
      popover: '#ffffff',
      popoverForeground: '#1a1a1a',
      primary: '#2563eb',
      primaryForeground: '#ffffff',
      secondary: '#6b7280',
      secondaryForeground: '#ffffff',
      muted: '#f3f4f6',
      mutedForeground: '#6b7280',
      accent: '#3b82f6',
      accentForeground: '#ffffff',
      destructive: '#ef4444',
      destructiveForeground: '#ffffff',
      success: '#10b981',
      successForeground: '#ffffff',
      warning: '#f59e0b',
      warningForeground: '#ffffff',
      border: '#e5e7eb',
      input: '#f3f4f6',
      ring: '#2563eb',
      gamechainPrimary: '#4f46e5',
      gamechainSecondary: '#7c3aed',
      gamechainAccent: '#06b6d4',
      gamechainNeutral: '#64748b',
      gamechainSurface: '#ffffff',
      gamechainSurfaceVariant: '#f1f5f9',
      gamechainOutline: '#cbd5e1',
    },
  },
  dark: {
    name: 'GameChain Dark',
    colors: {
      background: '#0a0a0a',
      foreground: '#f8fafc',
      card: '#1e293b',
      cardForeground: '#f8fafc',
      popover: '#1e293b',
      popoverForeground: '#f8fafc',
      primary: '#3b82f6',
      primaryForeground: '#ffffff',
      secondary: '#475569',
      secondaryForeground: '#f8fafc',
      muted: '#334155',
      mutedForeground: '#94a3b8',
      accent: '#6366f1',
      accentForeground: '#ffffff',
      destructive: '#f87171',
      destructiveForeground: '#ffffff',
      success: '#34d399',
      successForeground: '#ffffff',
      warning: '#fbbf24',
      warningForeground: '#ffffff',
      border: '#334155',
      input: '#1e293b',
      ring: '#3b82f6',
      gamechainPrimary: '#6366f1',
      gamechainSecondary: '#8b5cf6',
      gamechainAccent: '#22d3ee',
      gamechainNeutral: '#64748b',
      gamechainSurface: '#1e293b',
      gamechainSurfaceVariant: '#334155',
      gamechainOutline: '#475569',
    },
  },
};
