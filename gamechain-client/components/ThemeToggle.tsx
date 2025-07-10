'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { useEffect, useState } from 'react';

export function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const { theme, actualTheme, setTheme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle click with debugging
  const handleToggle = () => {
    console.log('Theme toggle clicked:', { currentTheme: theme, currentActualTheme: actualTheme });
    toggleTheme();
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newTheme = e.target.value as 'light' | 'dark' | 'system';
    console.log('Theme select changed to:', newTheme);
    setTheme(newTheme);
  };

  if (!mounted) {
    return (
      <button
        className="inline-flex items-center justify-center w-9 h-9 rounded-md border border-gray-300 bg-white hover:bg-gray-50 transition-colors"
        disabled
      >
        <span className="sr-only">Toggle theme</span>
        <div className="w-4 h-4 bg-gray-400 rounded-full animate-pulse" />
      </button>
    );
  }

  if (compact) {
    return (
      <button
        onClick={handleToggle}
        className="inline-flex items-center justify-center w-9 h-9 rounded-md border border-gamechain-outline bg-gamechain-surface hover:bg-gamechain-surface-variant transition-colors focus:outline-none focus:ring-2 focus:ring-gamechain-primary focus:ring-offset-2"
        title={`Current theme: ${theme} (${actualTheme})`}
      >
        <span className="sr-only">Toggle theme</span>
        {actualTheme === 'light' ? (
          <SunIcon className="w-4 h-4 text-gamechain-neutral" />
        ) : (
          <MoonIcon className="w-4 h-4 text-gamechain-neutral" />
        )}
      </button>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      {/* Quick toggle button */}
      <button
        onClick={handleToggle}
        className="inline-flex items-center justify-center w-9 h-9 rounded-md border border-gamechain-outline bg-gamechain-surface hover:bg-gamechain-surface-variant transition-colors focus:outline-none focus:ring-2 focus:ring-gamechain-primary focus:ring-offset-2"
        title={`Current theme: ${theme} (${actualTheme})`}
      >
        <span className="sr-only">Toggle theme</span>
        {actualTheme === 'light' ? (
          <SunIcon className="w-4 h-4 text-gamechain-neutral" />
        ) : (
          <MoonIcon className="w-4 h-4 text-gamechain-neutral" />
        )}
      </button>

      {/* Theme selector dropdown */}
      <select
        value={theme}
        onChange={handleSelectChange}
        className="text-sm px-2 py-1 rounded-md border border-gamechain-outline bg-gamechain-surface text-foreground focus:outline-none focus:ring-2 focus:ring-gamechain-primary focus:ring-offset-2"
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="system">System</option>
      </select>
    </div>
  );
}

function SunIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
      />
    </svg>
  );
}