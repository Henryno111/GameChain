import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto text-center">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                Play, Compete, and{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gamechain-primary to-gamechain-secondary">
                  Earn
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join the future of gaming on the blockchain. Connect with players worldwide, participate in events, and earn rewards in a decentralized ecosystem.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-3 bg-gamechain-primary text-white rounded-lg hover:bg-gamechain-secondary transition-colors duration-200 font-medium">
                  Start Playing
                </button>
                <button className="px-8 py-3 border border-gamechain-outline text-foreground rounded-lg hover:bg-gamechain-surface-variant transition-colors duration-200 font-medium">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gamechain-surface-variant">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Why Choose GameChain?
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Experience the next generation of gaming with blockchain technology
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-gamechain-surface rounded-lg border border-gamechain-outline">
                <div className="w-12 h-12 bg-gamechain-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Secure & Transparent</h3>
                <p className="text-muted-foreground">All transactions and game results are recorded on the blockchain for complete transparency.</p>
              </div>
              
              <div className="text-center p-6 bg-gamechain-surface rounded-lg border border-gamechain-outline">
                <div className="w-12 h-12 bg-gamechain-secondary rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Community Driven</h3>
                <p className="text-muted-foreground">Join a global community of players and participate in events and tournaments.</p>
              </div>
              
              <div className="text-center p-6 bg-gamechain-surface rounded-lg border border-gamechain-outline">
                <div className="w-12 h-12 bg-gamechain-accent rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Earn Rewards</h3>
                <p className="text-muted-foreground">Win tokens, NFTs, and other rewards by playing games and participating in events.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
