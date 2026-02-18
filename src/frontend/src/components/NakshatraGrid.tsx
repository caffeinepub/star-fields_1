import { Link } from '@tanstack/react-router';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles } from 'lucide-react';
import { useCurrentNakshatra } from '../hooks/useCurrentNakshatra';
import { useNakshatras } from '../hooks/useQueries';
import { NAKSHATRAS } from '../utils/nakshatraEngine';

export default function NakshatraGrid() {
  const currentNakshatra = useCurrentNakshatra();
  const { data: backendNakshatras } = useNakshatras();

  const getImageUrl = (nakshatraName: string) => {
    const backendData = backendNakshatras?.find(n => n.name === nakshatraName);
    return backendData?.imageUrl || '';
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {NAKSHATRAS.map((nakshatra) => {
        const isCurrent = nakshatra.index === currentNakshatra.index;
        const imageUrl = getImageUrl(nakshatra.name);

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
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={nakshatra.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-6">
                      <div className="text-6xl font-bold text-primary/20 mb-2">
                        {nakshatra.index}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {nakshatra.startDegree.toFixed(1)}° - {nakshatra.endDegree.toFixed(1)}°
                      </div>
                    </div>
                  </div>
                )}
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
