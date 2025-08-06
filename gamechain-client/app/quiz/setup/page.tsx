'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useGame, useGameActions } from '@/contexts/GameContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default function QuizSetupPage() {
  const { state } = useGame();
  const { createGame } = useGameActions();
  const router = useRouter();
  const [selectedQuestionCount, setSelectedQuestionCount] = useState<number>(10);
  const [gameTitle, setGameTitle] = useState('');
  const [gameMode, setGameMode] = useState<'onchain' | 'offline'>('offline');

  useEffect(() => {
    if (state.currentGame) {
      setGameTitle(state.currentGame.title);
      setGameMode(state.currentGame.mode);
      setSelectedQuestionCount(state.currentGame.questionCount);
    }
  }, [state.currentGame]);

  const questionCountOptions = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

  const handleContinue = () => {
    if (!state.currentGame) {
      createGame({
        title: gameTitle || 'Untitled Quiz',
        mode: gameMode,
        questionCount: selectedQuestionCount,
        questions: [],
      });
    }
    router.push('/quiz/questions');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground cyber-text mb-4">
              Quiz Game Setup
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Configure your quiz game settings and choose how many questions you want to include.
            </p>
          </motion.div>

          {/* Game Info Card */}
          <motion.div
            className="bg-card border border-gamechain-outline rounded-xl p-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-background rounded-lg border border-gamechain-outline">
                <div className="text-sm text-muted-foreground mb-2">Game Title</div>
                <div className="font-semibold text-foreground">{gameTitle || 'Untitled Quiz'}</div>
              </div>
              <div className="text-center p-4 bg-background rounded-lg border border-gamechain-outline">
                <div className="text-sm text-muted-foreground mb-2">Mode</div>
                <div className={`font-semibold ${gameMode === 'onchain' ? 'text-gamechain-primary' : 'text-gamechain-secondary'}`}>
                  {gameMode === 'onchain' ? '⛓️ Onchain' : '🎮 Offline'}
                </div>
              </div>
              <div className="text-center p-4 bg-background rounded-lg border border-gamechain-outline">
                <div className="text-sm text-muted-foreground mb-2">Game Code</div>
                <div className="font-semibold text-gamechain-accent font-mono">
                  {state.currentGame?.code || 'Generating...'}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Question Count Selection */}
          <motion.div
            className="bg-card border border-gamechain-outline rounded-xl p-8 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground cyber-text mb-4">
                How many questions?
              </h2>
              <p className="text-muted-foreground">
                Choose between 10-20 questions for your quiz game
              </p>
            </div>

            {/* Question Count Grid */}
            <div className="grid grid-cols-5 md:grid-cols-11 gap-3 max-w-4xl mx-auto mb-8">
              {questionCountOptions.map((count) => (
                <motion.button
                  key={count}
                  onClick={() => setSelectedQuestionCount(count)}
                  className={`
                    relative aspect-square flex items-center justify-center rounded-lg border-2 font-semibold text-lg transition-all duration-200
                    ${selectedQuestionCount === count
                      ? 'border-gamechain-primary bg-gamechain-primary/20 text-gamechain-primary'
                      : 'border-gamechain-outline bg-background hover:border-gamechain-primary/50 text-muted-foreground hover:text-foreground'
                    }
                  `}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {count}
                  {selectedQuestionCount === count && (
                    <motion.div
                      className="absolute -top-1 -right-1 w-4 h-4 bg-gamechain-primary rounded-full flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500 }}
                    >
                      <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </div>

            {/* Selected Count Display */}
            <motion.div
              className="text-center"
              key={selectedQuestionCount}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gamechain-primary/10 border border-gamechain-primary/20 rounded-full">
                <span className="text-gamechain-primary font-semibold">
                  {selectedQuestionCount} questions selected
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="flex gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <motion.button
              onClick={() => router.back()}
              className="px-8 py-3 text-muted-foreground bg-muted hover:bg-muted/80 rounded-lg font-medium transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Back
            </motion.button>
            <motion.button
              onClick={handleContinue}
              className="px-8 py-3 bg-gradient-to-r from-gamechain-primary to-gamechain-secondary text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Continue to Questions
            </motion.button>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}