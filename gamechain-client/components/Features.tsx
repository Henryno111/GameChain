'use client';

import { motion } from 'framer-motion';

export function Features() {
  const features = [
    {
      icon: '🧠',
      title: 'AI-Powered Trivia',
      description: 'Dynamic question generation using advanced AI to create personalized learning experiences that adapt to your knowledge level.',
      gradient: 'from-gamechain-primary to-gamechain-secondary'
    },
    {
      icon: '⛓️',
      title: 'Web3 Integration',
      description: 'Stake rewards, earn tokens, and own your achievements on the blockchain. True ownership of your gaming assets and progress.',
      gradient: 'from-gamechain-secondary to-gamechain-accent'
    },
    {
      icon: '🎮',
      title: 'Community Gaming',
      description: 'Create custom games, host tournaments, and compete with players worldwide in our decentralized gaming ecosystem.',
      gradient: 'from-gamechain-accent to-gamechain-primary'
    },
    {
      icon: '🏆',
      title: 'Reward System',
      description: 'Earn tokens for participation, win NFT rewards, and climb leaderboards to become a GameChain champion.',
      gradient: 'from-gamechain-primary to-gamechain-accent'
    },
    {
      icon: '📚',
      title: 'Learn & Earn',
      description: 'Transform learning into an engaging gaming experience where knowledge acquisition is rewarded and gamified.',
      gradient: 'from-gamechain-secondary to-gamechain-primary'
    },
    {
      icon: '🌐',
      title: 'Global Community',
      description: 'Connect with learners and gamers from around the world, forming teams and building lasting connections.',
      gradient: 'from-gamechain-accent to-gamechain-secondary'
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-gamechain-surface-variant relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 digital-grid opacity-10" />
      <div className="absolute inset-0">
        <div className="matrix-rain opacity-5" />
      </div>

      <div className="container mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="matrix-text holographic">Platform Features</span>
          </h2>
          <p className="cyber-text text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover how GameChain revolutionizes the intersection of 
            <span className="text-gamechain-accent"> gaming</span>,
            <span className="text-gamechain-primary"> learning</span>, and 
            <span className="text-gamechain-secondary"> blockchain technology</span>
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="group relative"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              {/* Card Background */}
              <div className="relative p-8 bg-gamechain-surface border border-gamechain-outline rounded-lg hover:border-gamechain-accent transition-all duration-300 scan-lines">
                {/* Neon glow effect on hover */}
                <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 neon-border" />
                
                {/* Icon */}
                <motion.div
                  className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-lg flex items-center justify-center mx-auto mb-6 text-2xl`}
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {feature.icon}
                </motion.div>

                {/* Content */}
                <div className="text-center space-y-4">
                  <h3 className="text-xl font-bold cyber-text text-foreground group-hover:text-gamechain-accent transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed cyber-text">
                    {feature.description}
                  </p>
                </div>

                {/* Hover indicator */}
                <motion.div
                  className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-gamechain-primary to-gamechain-accent group-hover:w-20 transition-all duration-300"
                  whileHover={{ width: 80 }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="max-w-2xl mx-auto space-y-6">
            <h3 className="text-2xl md:text-3xl font-bold matrix-text text-foreground">
              Ready to Join the Revolution?
            </h3>
            <p className="cyber-text text-muted-foreground">
              Be part of the future where gaming, learning, and earning converge in a decentralized ecosystem.
            </p>
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-gamechain-primary via-gamechain-secondary to-gamechain-accent text-white cyber-text font-semibold rounded-lg neon-border hover:neon-glow transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              EXPLORE GAMECHAIN
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}