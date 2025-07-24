'use client';

import { motion } from 'framer-motion';

export function HowItWorks() {
  const steps = [
    {
      id: 1,
      title: 'Create Game',
      description: 'Set up your trivia game with custom categories, difficulty levels, and gaming parameters.',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      ),
      gradient: 'from-gamechain-primary to-gamechain-secondary',
      delay: 0.1,
    },
    {
      id: 2,
      title: 'Input Questions',
      description: 'Add engaging trivia questions or let our AI generate smart questions for your game.',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      gradient: 'from-gamechain-secondary to-gamechain-accent',
      delay: 0.2,
    },
    {
      id: 3,
      title: 'Stake Rewards',
      description: 'Set token rewards and entry stakes to create competitive incentives for players.',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
      ),
      gradient: 'from-gamechain-accent to-gamechain-primary',
      delay: 0.3,
    },
    {
      id: 4,
      title: 'Share & Play',
      description: 'Invite friends, share your game with the community, and start playing together.',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
        </svg>
      ),
      gradient: 'from-gamechain-primary to-gamechain-accent',
      delay: 0.4,
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-gamechain-surface-variant relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 digital-grid opacity-5" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-gamechain-primary/10 to-gamechain-secondary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-r from-gamechain-accent/10 to-gamechain-primary/10 rounded-full blur-3xl" />

      <div className="container mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-3xl md:text-5xl font-bold mb-6"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <span className="matrix-text holographic">How It Works</span>
          </motion.h2>
          <motion.p
            className="cyber-text text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Get started with the following steps to create your own
            <span className="text-gamechain-accent"> blockchain-powered</span> trivia experience
          </motion.p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              className="group relative"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: step.delay }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              {/* Connecting Line for Desktop */}
              {index < steps.length - 1 && (
                <div className="hidden xl:block absolute top-1/3 -right-4 w-8 h-0.5 bg-gradient-to-r from-gamechain-accent to-transparent z-0" />
              )}

              {/* Card */}
              <div className="relative h-full p-8 bg-gamechain-surface border border-gamechain-outline rounded-xl hover:border-gamechain-accent transition-all duration-300 scan-lines group-hover:shadow-2xl group-hover:shadow-gamechain-primary/20">
                {/* Step Number */}
                <motion.div
                  className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-r from-gamechain-primary to-gamechain-secondary rounded-full flex items-center justify-center text-white font-bold text-sm z-10"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {step.id}
                </motion.div>

                {/* Neon glow effect on hover */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 neon-border" />
                
                {/* Icon Container */}
                <motion.div
                  className={`w-16 h-16 bg-gradient-to-r ${step.gradient} rounded-xl flex items-center justify-center mx-auto mb-6 text-white relative overflow-hidden`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {/* Animated background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                    animate={{ x: [-100, 100] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                  <div className="relative z-10">
                    {step.icon}
                  </div>
                </motion.div>

                {/* Content */}
                <div className="text-center space-y-4">
                  <motion.h3
                    className="text-xl font-bold cyber-text text-foreground group-hover:text-gamechain-accent transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                  >
                    {step.title}
                  </motion.h3>
                  <p className="text-muted-foreground leading-relaxed cyber-text">
                    {step.description}
                  </p>
                </div>

                {/* Bottom Accent */}
                <motion.div
                  className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r ${step.gradient} group-hover:w-full transition-all duration-500 rounded-t-full`}
                  whileHover={{ width: '100%' }}
                />

                {/* Floating Particles */}
                <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-gamechain-accent rounded-full opacity-0 group-hover:opacity-100"
                      style={{
                        left: `${20 + i * 30}%`,
                        top: `${30 + i * 20}%`,
                      }}
                      animate={{
                        y: [0, -20, 0],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.5,
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="max-w-2xl mx-auto space-y-6">
            <h3 className="text-2xl md:text-3xl font-bold matrix-text text-foreground">
              Ready to Create Your First Game?
            </h3>
            <p className="cyber-text text-muted-foreground">
              Join thousands of creators building the future of interactive learning and gaming.
            </p>
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-gamechain-primary via-gamechain-secondary to-gamechain-accent text-white cyber-text font-semibold rounded-lg neon-border hover:neon-glow transition-all duration-300 relative overflow-hidden"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                animate={{ x: [-100, 100] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              <span className="relative z-10">START CREATING NOW</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}