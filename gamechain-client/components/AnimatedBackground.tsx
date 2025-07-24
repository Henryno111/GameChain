'use client';

import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { useEffect, useState } from 'react';

export function AnimatedBackground() {
  const { actualTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Gradient Background */}
      <div 
        className={`absolute inset-0 transition-colors duration-1000 ${
          actualTheme === 'dark' 
            ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
            : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
        }`}
      />

      {/* Animated Orbs */}
      <motion.div
        className={`absolute w-96 h-96 rounded-full blur-3xl opacity-20 ${
          actualTheme === 'dark' 
            ? 'bg-gradient-to-r from-purple-600 to-blue-600' 
            : 'bg-gradient-to-r from-purple-300 to-blue-300'
        }`}
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          top: '10%',
          left: '10%',
        }}
      />

      <motion.div
        className={`absolute w-80 h-80 rounded-full blur-3xl opacity-15 ${
          actualTheme === 'dark' 
            ? 'bg-gradient-to-r from-green-600 to-teal-600' 
            : 'bg-gradient-to-r from-green-300 to-teal-300'
        }`}
        animate={{
          x: [0, -80, 0],
          y: [0, 80, 0],
          scale: [1, 0.9, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        style={{
          top: '60%',
          right: '15%',
        }}
      />

      <motion.div
        className={`absolute w-72 h-72 rounded-full blur-3xl opacity-10 ${
          actualTheme === 'dark' 
            ? 'bg-gradient-to-r from-pink-600 to-orange-600' 
            : 'bg-gradient-to-r from-pink-300 to-orange-300'
        }`}
        animate={{
          x: [0, 60, 0],
          y: [0, -40, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5
        }}
        style={{
          bottom: '20%',
          left: '50%',
        }}
      />

      {/* Floating Particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-2 h-2 rounded-full ${
            actualTheme === 'dark' 
              ? 'bg-white/10' 
              : 'bg-gray-400/20'
          }`}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 100 - 50, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5,
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}

      {/* Grid Pattern Overlay */}
      <div 
        className={`absolute inset-0 opacity-5 ${
          actualTheme === 'dark' ? 'opacity-10' : 'opacity-5'
        }`}
        style={{
          backgroundImage: `
            linear-gradient(${actualTheme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} 1px, transparent 1px),
            linear-gradient(90deg, ${actualTheme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Noise Texture for depth */}
      <div 
        className={`absolute inset-0 opacity-30 mix-blend-overlay ${
          actualTheme === 'dark' ? 'opacity-20' : 'opacity-30'
        }`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.1'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}