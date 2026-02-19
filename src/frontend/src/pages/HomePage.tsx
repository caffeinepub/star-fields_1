import { AlertCircle, Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import CurrentNakshatraBanner from '../components/CurrentNakshatraBanner';
import NakshatraGrid from '../components/NakshatraGrid';
import { useNakshatras } from '../hooks/useQueries';

export default function HomePage() {
  const { error, isLoading, isFetching, data } = useNakshatras();

  // Check if this is an initialization error (retrying)
  const isInitializing = (isLoading || (isFetching && !data)) && !error;
  
  // Only show error if it's a genuine failure after all retries
  const showError = error && !isLoading && !isFetching;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Track the Moon. Understand the Moment.
          </h1>
          <div className="text-lg text-muted-foreground max-w-3xl mx-auto space-y-4">
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

        {isInitializing && (
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
            <div className="text-center space-y-1">
              <p className="text-base font-medium">Initializing backend canister...</p>
              <p className="text-sm text-muted-foreground">Please wait while we connect to the service</p>
            </div>
          </div>
        )}

        {showError && (
          <Alert variant="destructive" className="max-w-2xl mx-auto">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Service Unavailable</AlertTitle>
            <AlertDescription>
              {error instanceof Error ? error.message : 'Unable to load Nakshatra data. Please try again later.'}
            </AlertDescription>
          </Alert>
        )}

        {!isInitializing && <CurrentNakshatraBanner />}

        <div className="pt-4">
          <NakshatraGrid />
        </div>
      </div>
    </div>
  );
}
