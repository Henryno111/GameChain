'use client';

import { useEffect } from 'react';
import { useGameActions } from '@/contexts/GameContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { HostGameModal } from '@/components/HostGameModal';

export default function HostGamePage() {
  const { openHostModal } = useGameActions();

  useEffect(() => {
    openHostModal();
  }, [openHostModal]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Main Content - This serves as a backdrop while the modal is open */}
      <main className="flex-1 container mx-auto px-4 py-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gamechain-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading game setup...</p>
        </div>
      </main>

      <Footer />
      
      {/* Modal */}
      <HostGameModal />
    </div>
  );
}