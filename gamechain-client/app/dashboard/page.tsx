import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { GamesSection } from "@/components/GamesSection";

export default function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-left text-gray-900 dark:text-white">
            Welcome to your gaming dashboard...
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
            Have fun!!!
          </p>
        </div>

        {/* Games Grid */}
        <GamesSection />
      </main>

      <Footer />
    </div>
  );
}