'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function GameChainAnimation() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Central Hub */}
      <motion.div
        className="relative z-10"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        {/* Main Core */}
        <motion.div
          className="w-32 h-32 rounded-full bg-gradient-to-r from-gamechain-primary to-gamechain-secondary neon-glow flex items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <motion.div
            className="w-20 h-20 rounded-full bg-gamechain-accent opacity-80"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>

        {/* Orbiting Elements - Trivia */}
        <motion.div
          className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-8"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: '50% 80px' }}
        >
          <div className="w-8 h-8 bg-gamechain-primary rounded-full neon-border flex items-center justify-center">
            <span className="text-xs text-white font-bold">?</span>
          </div>
        </motion.div>

        {/* Orbiting Elements - Web3 */}
        <motion.div
          className="absolute top-1/2 right-0 transform translate-x-8 -translate-y-1/2"
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear", delay: 1 }}
          style={{ transformOrigin: '-80px 50%' }}
        >
          <div className="w-8 h-8 bg-gamechain-secondary rounded-full neon-border flex items-center justify-center">
            <span className="text-xs text-white font-bold">₿</span>
          </div>
        </motion.div>

        {/* Orbiting Elements - AI */}
        <motion.div
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-8"
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear", delay: 2 }}
          style={{ transformOrigin: '50% -80px' }}
        >
          <div className="w-8 h-8 bg-gamechain-accent rounded-full neon-border flex items-center justify-center">
            <span className="text-xs text-white font-bold">AI</span>
          </div>
        </motion.div>

        {/* Orbiting Elements - Gaming */}
        <motion.div
          className="absolute top-1/2 left-0 transform -translate-x-8 -translate-y-1/2"
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear", delay: 0.5 }}
          style={{ transformOrigin: '80px 50%' }}
        >
          <div className="w-8 h-8 bg-gamechain-primary rounded-full neon-border flex items-center justify-center">
            <span className="text-xs text-white font-bold">🎮</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Connection Lines */}
      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--gamechain-primary)" stopOpacity="0.6" />
            <stop offset="50%" stopColor="var(--gamechain-accent)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="var(--gamechain-secondary)" stopOpacity="0.6" />
          </linearGradient>
        </defs>
        
        {/* Animated connecting lines */}
        <motion.path
          d="M 50,50 L 150,150 M 150,50 L 50,150 M 100,20 L 100,180 M 20,100 L 180,100"
          stroke="url(#lineGradient)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{ duration: 2, delay: 1 }}
        />
      </svg>

      {/* Floating Data Particles */}
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-gamechain-accent rounded-full"
          initial={{
            x: Math.random() * 400 - 200,
            y: Math.random() * 400 - 200,
            opacity: 0
          }}
          animate={{
            x: Math.random() * 400 - 200,
            y: Math.random() * 400 - 200,
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: Math.random() * 4 + 3,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
        />
      ))}

      {/* Holographic Labels */}
      <motion.div
        className="absolute top-4 left-4 cyber-text text-gamechain-accent text-sm"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
      >
        TRIVIA
      </motion.div>
      
      <motion.div
        className="absolute top-4 right-4 cyber-text text-gamechain-primary text-sm"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5 }}
      >
        WEB3
      </motion.div>
      
      <motion.div
        className="absolute bottom-4 left-4 cyber-text text-gamechain-secondary text-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3 }}
      >
        AI POWERED
      </motion.div>
      
      <motion.div
        className="absolute bottom-4 right-4 cyber-text text-gamechain-accent text-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3.5 }}
      >
        GAMING
      </motion.div>

      {/* Scan lines effect */}
      <div className="absolute inset-0 scan-lines pointer-events-none" />
    </div>
  );
}