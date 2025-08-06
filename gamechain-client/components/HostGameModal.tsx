'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useGame, useGameActions } from '@/contexts/GameContext';
import { ConnectWallet } from './ConnectWallet';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function HostGameModal() {
  const { state } = useGame();
  const { closeHostModal, setSelectedMode, openConnectWalletModal, createGame } = useGameActions();
  const router = useRouter();
  const [gameTitle, setGameTitle] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const handleModeSelect = (mode: 'onchain' | 'offline') => {
    setSelectedMode(mode);
    if (mode === 'onchain') {
      openConnectWalletModal();
    }
  };

  const handleCreateGame = async () => {
    if (!gameTitle.trim() || !state.selectedMode) return;
    
    setIsCreating(true);
    
    try {
      createGame({
        title: gameTitle.trim(),
        mode: state.selectedMode,
        questionCount: 10,
        questions: [],
      });

      closeHostModal();
      setSelectedMode(null);
      setGameTitle('');
      router.push('/quiz/setup');
    } catch (error) {
      console.error('Error creating game:', error);
    } finally {
      setIsCreating(false);
    }
  };

  const resetModal = () => {
    setSelectedMode(null);
    setGameTitle('');
    setIsCreating(false);
  };

  const handleClose = () => {
    closeHostModal();
    resetModal();
  };

  if (!state.hostModalOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        />

        {/* Modal */}
        <motion.div
          className="relative bg-background border border-gamechain-outline rounded-xl p-6 w-full max-w-md mx-4 shadow-2xl"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground cyber-text">
              Host New Game
            </h2>
            <button
              onClick={handleClose}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Game Title Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-foreground mb-2">
              Game Title
            </label>
            <input
              type="text"
              value={gameTitle}
              onChange={(e) => setGameTitle(e.target.value)}
              placeholder="Enter game title..."
              className="w-full px-4 py-3 bg-input border border-gamechain-outline rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-gamechain-primary focus:border-transparent transition-all"
            />
          </div>

          {/* Mode Selection */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-foreground mb-4">
              Choose Game Mode
            </label>
            <div className="grid grid-cols-2 gap-4">
              {/* Onchain Mode */}
              <motion.button
                onClick={() => handleModeSelect('onchain')}
                className={`
                  relative p-4 rounded-lg border-2 transition-all duration-200
                  ${state.selectedMode === 'onchain'
                    ? 'border-gamechain-primary bg-gamechain-primary/10 text-gamechain-primary'
                    : 'border-gamechain-outline bg-card hover:border-gamechain-primary/50 text-muted-foreground hover:text-foreground'
                  }
                `}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">⛓️</div>
                  <div className="font-semibold text-sm">Onchain</div>
                  <div className="text-xs opacity-80 mt-1">Web3 rewards</div>
                </div>
                {state.selectedMode === 'onchain' && (
                  <motion.div
                    className="absolute top-2 right-2 text-gamechain-primary"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500 }}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </motion.div>
                )}
              </motion.button>

              {/* Offline Mode */}
              <motion.button
                onClick={() => handleModeSelect('offline')}
                className={`
                  relative p-4 rounded-lg border-2 transition-all duration-200
                  ${state.selectedMode === 'offline'
                    ? 'border-gamechain-secondary bg-gamechain-secondary/10 text-gamechain-secondary'
                    : 'border-gamechain-outline bg-card hover:border-gamechain-secondary/50 text-muted-foreground hover:text-foreground'
                  }
                `}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">🎮</div>
                  <div className="font-semibold text-sm">Offline</div>
                  <div className="text-xs opacity-80 mt-1">Quick play</div>
                </div>
                {state.selectedMode === 'offline' && (
                  <motion.div
                    className="absolute top-2 right-2 text-gamechain-secondary"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500 }}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </motion.div>
                )}
              </motion.button>
            </div>
          </div>

          {/* Wallet Connection for Onchain Mode */}
          <AnimatePresence>
            {state.connectWalletModalOpen && state.selectedMode === 'onchain' && (
              <motion.div
                className="mb-6 p-4 bg-card border border-gamechain-outline rounded-lg"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-4">
                    Connect your wallet to enable onchain features
                  </p>
                  <ConnectWallet variant="primary" size="md" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <motion.button
              onClick={handleClose}
              className="flex-1 px-4 py-3 text-muted-foreground bg-muted hover:bg-muted/80 rounded-lg font-medium transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Cancel
            </motion.button>
            <motion.button
              onClick={handleCreateGame}
              disabled={!gameTitle.trim() || !state.selectedMode || isCreating}
              className={`
                flex-1 px-4 py-3 rounded-lg font-medium transition-all
                ${!gameTitle.trim() || !state.selectedMode || isCreating
                  ? 'bg-muted text-muted-foreground cursor-not-allowed'
                  : 'bg-gradient-to-r from-gamechain-primary to-gamechain-secondary text-white hover:opacity-90'
                }
              `}
              whileHover={!gameTitle.trim() || !state.selectedMode || isCreating ? {} : { scale: 1.02 }}
              whileTap={!gameTitle.trim() || !state.selectedMode || isCreating ? {} : { scale: 0.98 }}
            >
              {isCreating ? (
                <div className="flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                  Creating...
                </div>
              ) : (
                'Create Game'
              )}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}