'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameActions } from '@/contexts/GameContext';

interface JoinGameModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function JoinGameModal({ isOpen, onClose }: JoinGameModalProps) {
  const { joinGame } = useGameActions();
  const [gameCode, setGameCode] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [isJoining, setIsJoining] = useState(false);
  const [error, setError] = useState('');

  const handleJoin = async () => {
    if (!gameCode.trim() || !playerName.trim()) {
      setError('Please enter both game code and player name');
      return;
    }

    if (!gameCode.startsWith('GC') || gameCode.length !== 8) {
      setError('Invalid game code format. Code should be like GC123456');
      return;
    }

    setIsJoining(true);
    setError('');

    try {
      const playerId = `player_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      joinGame(gameCode.toUpperCase(), playerId);
      
      onClose();
      resetForm();
    } catch {
      setError('Failed to join game. Please check the game code and try again.');
    } finally {
      setIsJoining(false);
    }
  };

  const resetForm = () => {
    setGameCode('');
    setPlayerName('');
    setError('');
    setIsJoining(false);
  };

  const handleClose = () => {
    onClose();
    resetForm();
  };

  const formatGameCode = (value: string) => {
    const cleaned = value.replace(/[^A-Z0-9]/g, '');
    if (cleaned.startsWith('GC')) {
      return cleaned.slice(0, 8);
    } else {
      return 'GC' + cleaned.slice(0, 6);
    }
  };

  const handleGameCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatGameCode(e.target.value.toUpperCase());
    setGameCode(formatted);
  };

  if (!isOpen) return null;

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
              Join Game
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

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-4">
            {/* Game Code Input */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Game Code
              </label>
              <input
                type="text"
                value={gameCode}
                onChange={handleGameCodeChange}
                placeholder="GC123456"
                className="w-full px-4 py-3 bg-input border border-gamechain-outline rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-gamechain-primary focus:border-transparent transition-all font-mono text-lg tracking-wider"
                maxLength={8}
                style={{ letterSpacing: '0.2em' }}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Enter the 8-character game code (e.g., GC123456)
              </p>
            </div>

            {/* Player Name Input */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Your Name
              </label>
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-4 py-3 bg-input border border-gamechain-outline rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-gamechain-primary focus:border-transparent transition-all"
                maxLength={20}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-8">
            <motion.button
              onClick={handleClose}
              className="flex-1 px-4 py-3 text-muted-foreground bg-muted hover:bg-muted/80 rounded-lg font-medium transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Cancel
            </motion.button>
            <motion.button
              onClick={handleJoin}
              disabled={!gameCode.trim() || !playerName.trim() || isJoining}
              className={`
                flex-1 px-4 py-3 rounded-lg font-medium transition-all
                ${!gameCode.trim() || !playerName.trim() || isJoining
                  ? 'bg-muted text-muted-foreground cursor-not-allowed'
                  : 'bg-gradient-to-r from-gamechain-primary to-gamechain-secondary text-white hover:opacity-90'
                }
              `}
              whileHover={!gameCode.trim() || !playerName.trim() || isJoining ? {} : { scale: 1.02 }}
              whileTap={!gameCode.trim() || !playerName.trim() || isJoining ? {} : { scale: 0.98 }}
            >
              {isJoining ? (
                <div className="flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                  Joining...
                </div>
              ) : (
                'Join Game'
              )}
            </motion.button>
          </div>

          {/* Info */}
          <div className="mt-6 p-4 bg-card border border-gamechain-outline rounded-lg">
            <div className="flex items-start gap-3">
              <div className="text-gamechain-accent mt-0.5">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-sm text-muted-foreground">
                <p className="font-medium text-foreground mb-1">How to join:</p>
                <ol className="list-decimal list-inside space-y-1">
                  <li>Get the game code from the host</li>
                  <li>Enter the code and your name</li>
                  <li>Click &quot;Join Game&quot; to participate</li>
                </ol>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}