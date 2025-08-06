'use client';

import { useState } from 'react';
import { GameCard } from './GameCard';
import { JoinGameModal } from './JoinGameModal';

const gamesData = [
  // Row 1
  {
    id: 'host-game',
    title: 'Host game',
    reward: 0,
    icon: '🎮',
    href: '/host-game'
  },
  {
    id: 'join-game',
    title: 'Join game',
    reward: 0,
    icon: '🎯',
    isJoinGame: true
  },
  {
    id: 'stats',
    title: 'Connect',
    reward: 0,
    icon: '📊',
    isDisabled: true // This card is not clickable as per requirements
  },
  // Row 2
  {
    id: 'buildathon-quiz',
    title: 'Buildathon Quiz',
    reward: 0,
    icon: '🎯',
    href: '/games/buildathon-quiz'
  },
  {
    id: 'crypto-quiz',
    title: 'Crypto Quiz',
    reward: 0,
    icon: '💎',
    href: '/games/crypto-quiz'
  },
  {
    id: 'trivia-night',
    title: 'Trivia Night',
    reward: 0,
    icon: '💎',
    href: '/games/trivia-night'
  }
];

export function GamesSection() {
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  return (
    <div className="w-full">
      {/* Games Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {gamesData.map((game) => (
          <GameCard
            key={game.id}
            title={game.title}
            reward={game.reward}
            icon={game.icon}
            href={game.href}
            isDisabled={game.isDisabled}
            onClick={game.isJoinGame ? () => setIsJoinModalOpen(true) : undefined}
          />
        ))}
      </div>

      {/* View All Link */}
      <div className="mt-8 text-center">
        <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium inline-flex items-center gap-2 transition-colors duration-200">
          View All
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>

      {/* Join Game Modal */}
      <JoinGameModal 
        isOpen={isJoinModalOpen} 
        onClose={() => setIsJoinModalOpen(false)} 
      />
    </div>
  );
}