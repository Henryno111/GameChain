'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface ConnectWalletProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showAccountInfo?: boolean;
}

export function ConnectWallet({ 
  variant = 'primary', 
  size = 'md', 
  className = '',
  showAccountInfo = false 
}: ConnectWalletProps) {

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  const variantClasses = {
    primary: 'text-white bg-gamechain-primary border border-gamechain-primary hover:bg-gamechain-secondary hover:border-gamechain-secondary',
    secondary: 'text-white bg-gamechain-secondary border border-gamechain-secondary hover:bg-gamechain-primary hover:border-gamechain-primary',
    outline: 'text-gamechain-primary bg-transparent border border-gamechain-primary hover:bg-gamechain-primary hover:text-white',
  };

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus ||
            authenticationStatus === 'authenticated');

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <motion.button
                    onClick={openConnectModal}
                    type="button"
                    className={`
                      group relative inline-flex items-center justify-center 
                      ${sizeClasses[size]} 
                      ${variantClasses[variant]}
                      font-medium rounded-lg transition-all duration-200 ease-in-out 
                      focus:outline-none focus:ring-2 focus:ring-gamechain-primary focus:ring-offset-2
                      ${className}
                    `}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <div className="absolute inset-0 w-0 bg-gamechain-primary transition-all duration-200 ease-in-out group-hover:w-full rounded-lg opacity-20"></div>
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
                          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                        />
                      </svg>
                      Connect Wallet
                    </span>
                  </motion.button>
                );
              }

              if (chain.unsupported) {
                return (
                  <motion.button
                    onClick={openChainModal}
                    type="button"
                    className={`
                      group relative inline-flex items-center justify-center 
                      ${sizeClasses[size]} 
                      text-white bg-red-600 border border-red-600 hover:bg-red-700 hover:border-red-700
                      font-medium rounded-lg transition-all duration-200 ease-in-out 
                      focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
                      ${className}
                    `}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
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
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                        />
                      </svg>
                      Wrong Network
                    </span>
                  </motion.button>
                );
              }

              if (showAccountInfo) {
                return (
                  <div className="flex items-center space-x-2">
                    <motion.button
                      onClick={openChainModal}
                      style={{ display: 'flex', alignItems: 'center' }}
                      type="button"
                      className="flex items-center px-3 py-2 text-sm font-medium text-gamechain-primary bg-gamechain-surface border border-gamechain-outline rounded-lg hover:bg-gamechain-surface-variant transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      {chain.hasIcon && (
                        <div
                          style={{
                            background: chain.iconBackground,
                            width: 16,
                            height: 16,
                            borderRadius: 999,
                            overflow: 'hidden',
                            marginRight: 6,
                          }}
                        >
                          {chain.iconUrl && (
                            <Image
                              alt={chain.name ?? 'Chain icon'}
                              src={chain.iconUrl}
                              width={16}
                              height={16}
                              style={{ width: 16, height: 16 }}
                            />
                          )}
                        </div>
                      )}
                      {chain.name}
                    </motion.button>

                    <motion.button
                      onClick={openAccountModal}
                      type="button"
                      className={`
                        group relative inline-flex items-center justify-center 
                        ${sizeClasses[size]} 
                        ${variantClasses[variant]}
                        font-medium rounded-lg transition-all duration-200 ease-in-out 
                        focus:outline-none focus:ring-2 focus:ring-gamechain-primary focus:ring-offset-2
                        ${className}
                      `}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
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
                        {account.displayName}
                      </span>
                    </motion.button>
                  </div>
                );
              }

              return (
                <motion.button
                  onClick={openAccountModal}
                  type="button"
                  className={`
                    group relative inline-flex items-center justify-center 
                    ${sizeClasses[size]} 
                    ${variantClasses[variant]}
                    font-medium rounded-lg transition-all duration-200 ease-in-out 
                    focus:outline-none focus:ring-2 focus:ring-gamechain-primary focus:ring-offset-2
                    ${className}
                  `}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <div className="absolute inset-0 w-0 bg-gradient-to-r from-gamechain-primary to-gamechain-secondary transition-all duration-200 ease-in-out group-hover:w-full rounded-lg opacity-20"></div>
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
                    {account.displayName}
                  </span>
                </motion.button>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}