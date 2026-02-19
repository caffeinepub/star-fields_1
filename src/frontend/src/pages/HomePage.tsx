import CurrentNakshatraBanner from '../components/CurrentNakshatraBanner';
import NakshatraGrid from '../components/NakshatraGrid';

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Track the Moon. Understand the Moment.
          </h1>
          <div className="text-lg text-muted-foreground max-w-3xl mx-auto space-y-3">
            <p>
              A Nakshatra is one of 27 lunar mansions — sacred segments of the sky the Moon travels through each month in Vedic astrology.
              Each Nakshatra carries a distinct emotional, psychological, and karmic tone.
            </p>
            <p>
              As the Moon moves, the feeling of time shifts.
              This app helps you recognize that rhythm — not to predict fate, but to understand the energy shaping the present moment.
            </p>
          </div>
        </div>

        <CurrentNakshatraBanner />

        <div className="pt-4">
          <NakshatraGrid />
        </div>
      </div>
    </div>
  );
}
