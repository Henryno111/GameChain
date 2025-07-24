'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider, darkTheme, lightTheme } from '@rainbow-me/rainbowkit';
import { useTheme } from '@/contexts/ThemeContext';
import { config } from '@/config/wallet';
import { useState } from 'react';

import '@rainbow-me/rainbowkit/styles.css';

interface WalletProviderProps {
  children: React.ReactNode;
}

const ThemedRainbowKitProvider = ({ children }: { children: React.ReactNode }) => {
  const { actualTheme } = useTheme();

  const customTheme = actualTheme === 'dark' 
    ? darkTheme({
        accentColor: '#22d3ee', // gamechain-accent
        accentColorForeground: 'white',
        borderRadius: 'medium',
        fontStack: 'system',
        overlayBlur: 'small',
      })
    : lightTheme({
        accentColor: '#6366f1', // gamechain-primary
        accentColorForeground: 'white',
        borderRadius: 'medium',
        fontStack: 'system',
        overlayBlur: 'small',
      });

  return (
    <RainbowKitProvider 
      theme={customTheme}
      appInfo={{
        appName: 'GameChain',
        disclaimer: ({ Text, Link }) => (
          <Text>
            By connecting your wallet, you agree to GameChain's{' '}
            <Link href="/terms">Terms of Service</Link>{' '}
            and{' '}
            <Link href="/privacy">Privacy Policy</Link>
            .
          </Text>
        ),
      }}
    >
      {children}
    </RainbowKitProvider>
  );
};

export function WalletProvider({ children }: WalletProviderProps) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  }));

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ThemedRainbowKitProvider>
          {children}
        </ThemedRainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}