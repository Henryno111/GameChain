'use client';

import { motion } from 'framer-motion';
import { GameChainAnimation } from './GameChainAnimation';

export function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.5)), url('/gamechain.jpg')`
          }}
        />
        {/* Matrix rain overlay */}
        <div className="matrix-rain" />
        {/* Digital grid overlay */}
        <div className="absolute inset-0 digital-grid opacity-20" />
      </div>

      {/* Content Grid */}
      <div className="relative z-10 h-full min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-8 items-center h-full min-h-screen py-20">
            
            {/* Left Column - Text Content */}
            <motion.div
              className="space-y-8 text-left"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              {/* Main Heading */}
              <div className="space-y-4">
                <motion.h1
                  className="text-4xl md:text-6xl xl:text-7xl font-bold leading-tight"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <span className="matrix-text holographic block mb-2">
                    GAMECHAIN
                  </span>
                  <span 
                    className="glitch-text cyber-text text-white block text-3xl md:text-4xl xl:text-5xl"
                    data-text="The Future of Gaming"
                  >
                    The Future of Gaming
                  </span>
                </motion.h1>
              </div>

              {/* Description */}
              <motion.div
                className="space-y-6"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <p className="text-lg md:text-xl cyber-text text-gray-200 leading-relaxed max-w-2xl">
                  This platform combines{' '}
                  <span className="text-gamechain-accent font-semibold">trivia</span> with{' '}
                  <span className="text-gamechain-primary font-semibold">Web3</span> and{' '}
                  <span className="text-gamechain-secondary font-semibold">Artificial Intelligence</span> to 
                  amplify gaming, learning, connection and community engagement.
                </p>
                
                <p className="text-md md:text-lg cyber-text text-gray-300 leading-relaxed max-w-2xl">
                  Create games, stake rewards and make memories together in our 
                  <span className="text-gamechain-accent font-semibold"> community-driven</span> ecosystem.
                </p>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 pt-4"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <motion.a
                  href="/dashboard"
                  className="inline-block px-8 py-4 bg-gradient-to-r from-gamechain-primary to-gamechain-secondary text-white cyber-text font-semibold rounded-lg neon-border hover:neon-glow transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  START GAMING
                </motion.a>
                
                <motion.button
                  className="px-8 py-4 border-2 border-gamechain-accent text-gamechain-accent cyber-text font-semibold rounded-lg hover:bg-gamechain-accent hover:text-black transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  EXPLORE PLATFORM
                </motion.button>
              </motion.div>

              {/* Stats */}
              <motion.div
                className="grid grid-cols-3 gap-6 pt-8 border-t border-gamechain-outline"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.9 }}
              >
                <div className="text-center">
                  <div className="matrix-text text-2xl md:text-3xl font-bold text-gamechain-primary">1K+</div>
                  <div className="cyber-text text-sm text-gray-400">Active Players</div>
                </div>
                <div className="text-center">
                  <div className="matrix-text text-2xl md:text-3xl font-bold text-gamechain-secondary">50+</div>
                  <div className="cyber-text text-sm text-gray-400">Games Created</div>
                </div>
                <div className="text-center">
                  <div className="matrix-text text-2xl md:text-3xl font-bold text-gamechain-accent">24/7</div>
                  <div className="cyber-text text-sm text-gray-400">Platform Active</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column - Animation */}
            <motion.div
              className="relative h-96 md:h-[500px] xl:h-[600px] flex items-center justify-center"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              <div className="relative w-full h-full max-w-lg">
                <GameChainAnimation />
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-gamechain-accent rounded-full flex justify-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-3 bg-gamechain-accent rounded-full mt-2"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}