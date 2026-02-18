import CurrentNakshatraBanner from '../components/CurrentNakshatraBanner';
import NakshatraGrid from '../components/NakshatraGrid';

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            The 27 Nakshatras
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore the ancient Vedic lunar mansions and discover the cosmic energies
            that guide our journey through the stars.
          </p>
        </div>

        <CurrentNakshatraBanner />

        <div className="pt-4">
          <NakshatraGrid />
        </div>
      </div>
    </div>
  );
}
