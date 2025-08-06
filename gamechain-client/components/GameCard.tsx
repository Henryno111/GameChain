'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

interface GameCardProps {
  title: string;
  reward: number;
  icon: string;
  href?: string;
  isDisabled?: boolean;
  className?: string;
  onClick?: () => void;
}

export function GameCard({ 
  title, 
  reward, 
  icon, 
  href, 
  isDisabled = false,
  className = "",
  onClick
}: GameCardProps) {
  const cardContent = (
    <motion.div
      whileHover={!isDisabled ? { scale: 1.02, y: -2 } : undefined}
      whileTap={!isDisabled ? { scale: 0.98 } : undefined}
      onClick={onClick}
      className={`
        relative bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700
        transition-all duration-300 hover:shadow-2xl hover:border-blue-300 dark:hover:border-blue-600
        shadow-[0_4px_20px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)]
        hover:shadow-[0_8px_30px_rgba(59,130,246,0.15)] dark:hover:shadow-[0_8px_30px_rgba(59,130,246,0.25)]
        ${!isDisabled && (href || onClick) ? 'cursor-pointer group' : 'cursor-default opacity-75'}
        ${className}
      `}
    >
      {/* Game Icon */}
      <div className="flex justify-center mb-4">
        <div className={`
          w-16 h-16 rounded-lg flex items-center justify-center text-2xl
          ${icon === '🎯' ? 'bg-blue-100 dark:bg-blue-900' : 
            icon === '💎' ? 'bg-cyan-100 dark:bg-cyan-900' : 
            'bg-purple-100 dark:bg-purple-900'}
        `}>
          {icon}
        </div>
      </div>

      {/* Game Title */}
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center mb-2">
        {title}
      </h3>

      {/* Reward */}
      <div className="text-center">
        <span className="text-sm text-gray-600 dark:text-gray-400">Reward — </span>
        <span className="text-sm font-medium text-gray-900 dark:text-white">{reward}</span>
      </div>

      {/* Arrow indicator for clickable cards */}
      {!isDisabled && (
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <svg 
            className="w-5 h-5 text-gray-400 group-hover:text-blue-500" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      )}
    </motion.div>
  );

  if (isDisabled || !href || onClick) {
    return cardContent;
  }

  return (
    <Link href={href} className="block">
      {cardContent}
    </Link>
  );
}