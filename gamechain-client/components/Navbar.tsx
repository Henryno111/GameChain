'use client';

import { motion } from 'framer-motion';
import { ThemeToggle } from '@/components/ThemeToggle';
import { ConnectWallet } from '@/components/ConnectWallet';

export function Navbar() {
  const handleSignIn = () => {
    // TODO: Implement sign in logic
    console.log('Sign in clicked');
  };

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-50 w-full border-b border-gamechain-outline bg-gamechain-surface/80 backdrop-blur-md transition-all duration-200"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <motion.div 
            className="flex items-center"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="flex-shrink-0">
              <motion.div 
                className="flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="relative">
                  <motion.div 
                    className="w-8 h-8 bg-gradient-to-br from-gamechain-primary to-gamechain-secondary rounded-lg flex items-center justify-center"
                    whileHover={{ rotate: 10 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
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
                  </motion.div>
                  <motion.div 
                    className="absolute -top-1 -right-1 w-3 h-3 bg-gamechain-accent rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                <span className="text-xl font-bold text-gamechain-primary">
                  GameChain
                </span>
              </motion.div>
            </div>
          </motion.div>

          {/* Right side buttons */}
          <motion.div 
            className="flex items-center space-x-3"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <ThemeToggle compact={true} />
            
            <ConnectWallet variant="outline" size="md" />

            <motion.button
              onClick={handleSignIn}
              className="group relative inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-gamechain-primary border border-gamechain-primary rounded-lg hover:bg-gamechain-secondary hover:border-gamechain-secondary transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-gamechain-primary focus:ring-offset-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400 }}
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
            </motion.button>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
}
