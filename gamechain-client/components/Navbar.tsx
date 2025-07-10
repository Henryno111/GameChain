'use client';

import { useState } from 'react';
import { ThemeToggle } from '@/components/ThemeToggle';

export function Navbar() {
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnectWallet = async () => {
    setIsConnecting(true);
    // TODO: Implement wallet connection logic
    setTimeout(() => {
      setIsConnecting(false);
    }, 1000);
  };

  const handleSignIn = () => {
    // TODO: Implement sign in logic
    console.log('Sign in clicked');
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gamechain-outline bg-gamechain-surface/80 backdrop-blur-md transition-all duration-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <div className="w-8 h-8 bg-gradient-to-br from-gamechain-primary to-gamechain-secondary rounded-lg flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                      />
                    </svg>
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-gamechain-accent rounded-full animate-pulse"></div>
                </div>
                <span className="text-xl font-bold text-gamechain-primary">
                  GameChain
                </span>
              </div>
            </div>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-3">
            <ThemeToggle compact={true} />
            
            <button
              onClick={handleConnectWallet}
              disabled={isConnecting}
              className="group relative inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gamechain-primary bg-transparent border border-gamechain-primary rounded-lg hover:bg-gamechain-primary hover:text-white transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-gamechain-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="absolute inset-0 w-0 bg-gamechain-primary transition-all duration-200 ease-in-out group-hover:w-full rounded-lg"></div>
              <span className="relative z-10 flex items-center">
                {isConnecting ? (
                  <>
                    <div className="animate-spin -ml-1 mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
                    Connecting...
                  </>
                ) : (
                  <>
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                      />
                    </svg>
                    Connect Wallet
                  </>
                )}
              </span>
            </button>

            <button
              onClick={handleSignIn}
              className="group relative inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-gamechain-primary border border-gamechain-primary rounded-lg hover:bg-gamechain-secondary hover:border-gamechain-secondary transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-gamechain-primary focus:ring-offset-2 transform hover:scale-105 active:scale-95"
            >
              <div className="absolute inset-0 w-0 bg-gradient-to-r from-gamechain-primary to-gamechain-secondary transition-all duration-200 ease-in-out group-hover:w-full rounded-lg"></div>
              <span className="relative z-10 flex items-center">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                Sign In
              </span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
