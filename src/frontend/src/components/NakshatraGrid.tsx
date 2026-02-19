import { Link } from '@tanstack/react-router';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Sparkles, Loader2 } from 'lucide-react';
import { useCurrentNakshatra } from '../hooks/useCurrentNakshatra';
import { useNakshatras, useGetNakshatraImage } from '../hooks/useQueries';
import { NAKSHATRAS } from '../utils/nakshatraEngine';

function NakshatraCardImage({ imageId, nakshatraName, nakshatraIndex }: { imageId?: string; nakshatraName: string; nakshatraIndex: number }) {
  const { data: imageUrl, isLoading } = useGetNakshatraImage(imageId);

  if (isLoading) {
    return <Skeleton className="absolute inset-0 w-full h-full" />;
  }

  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt={nakshatraName}
        className="absolute inset-0 w-full h-full object-cover"
      />
    );
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="text-center p-6">
        <div className="text-6xl font-bold text-primary/20 mb-2">
          {nakshatraIndex}
        </div>
        <div className="text-sm text-muted-foreground">
          {NAKSHATRAS[nakshatraIndex - 1]?.startDegree.toFixed(1)}° - {NAKSHATRAS[nakshatraIndex - 1]?.endDegree.toFixed(1)}°
        </div>
      </div>
    </div>
  );
}

export default function NakshatraGrid() {
  const currentNakshatra = useCurrentNakshatra();
  const { data: backendNakshatras, isLoading, isFetching } = useNakshatras();

  const getImageId = (nakshatraName: string): string | undefined => {
    if (!backendNakshatras || backendNakshatras.length === 0) {
      return undefined;
    }
    const backendData = backendNakshatras.find(n => n.name === nakshatraName);
    return backendData?.imageId;
  };

  // Show loading state during initial fetch or retries
  if (isLoading || (isFetching && !backendNakshatras)) {
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-4">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
        <div className="text-center space-y-2">
          <p className="text-lg font-medium">Initializing backend canister...</p>
          <p className="text-sm text-muted-foreground">This may take a moment on first load</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {NAKSHATRAS.map((nakshatra) => {
        const isCurrent = nakshatra.index === currentNakshatra.index;
        const imageId = getImageId(nakshatra.name);

        return (
          <Link
            key={nakshatra.slug}
            to="/nakshatras/$slug/$section"
            params={{ slug: nakshatra.slug, section: 'traits' }}
            className="group"
          >
            <Card
              className={`overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${
                isCurrent
                  ? 'ring-2 ring-primary shadow-lg shadow-primary/20 bg-primary/5'
                  : 'hover:border-primary/50'
              }`}
            >
              <div className="relative aspect-[4/5] bg-gradient-to-br from-accent/20 via-background to-accent/10 overflow-hidden">
                {isCurrent && (
                  <div className="absolute top-3 right-3 z-10">
                    <Badge className="bg-primary text-primary-foreground shadow-lg flex items-center gap-1.5 px-3 py-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      Moon Here Now
                    </Badge>
                  </div>
                )}
                <NakshatraCardImage 
                  imageId={imageId} 
                  nakshatraName={nakshatra.name}
                  nakshatraIndex={nakshatra.index}
                />
                {isCurrent && (
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent animate-pulse" />
                )}
              </div>
              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">
                  {nakshatra.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  Nakshatra {nakshatra.index} of 27
                </p>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
