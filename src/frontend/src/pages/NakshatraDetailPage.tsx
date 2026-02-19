import { useParams, Link } from '@tanstack/react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, Moon, Sparkles, AlertCircle, Loader2 } from 'lucide-react';
import { getNakshatraBySlug } from '../utils/nakshatraEngine';
import { useCurrentNakshatra } from '../hooks/useCurrentNakshatra';
import { useNakshatraByName, useGetNakshatraImage } from '../hooks/useQueries';
import { PADA_DATA } from '../utils/padaData';

export default function NakshatraDetailPage() {
  const { slug, section } = useParams({ strict: false });
  const nakshatra = getNakshatraBySlug(slug as string);
  const currentNakshatra = useCurrentNakshatra();
  
  const { data: backendData, error, isLoading, isFetching } = useNakshatraByName(nakshatra?.name || '');
  const { data: imageUrl, isLoading: imageLoading } = useGetNakshatraImage(backendData?.imageId);

  if (!nakshatra) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Nakshatra not found</h1>
        <Link to="/nakshatras">
          <Button>Return to Home</Button>
        </Link>
      </div>
    );
  }

  const isCurrent = nakshatra.index === currentNakshatra.index;

  // Check if this is an initialization error (retrying)
  const isInitializing = (isLoading || (isFetching && !backendData)) && !error;
  
  // Only show error if it's a genuine failure after all retries
  const showError = error && !isLoading && !isFetching;

  // Get pada data - prioritize backend data, fallback to padaData.ts
  const getPadaInfo = (padaNumber: 1 | 2 | 3 | 4) => {
    const backendPada = backendData?.[`pada${padaNumber}` as keyof typeof backendData];
    
    // Check if backend has custom pada data (not default/empty)
    if (backendPada && typeof backendPada === 'object' && 'title' in backendPada && 'description' in backendPada) {
      const pada = backendPada as { title: string; description: string };
      if (pada.title && pada.description && pada.title !== `Pada ${padaNumber}` && pada.description !== `Description for Pada ${padaNumber}`) {
        return pada;
      }
    }
    
    // Fallback to padaData.ts
    const fallbackPada = PADA_DATA.find(
      p => p.nakshatraName === nakshatra.name && p.padaNumber === padaNumber
    );
    
    return fallbackPada ? {
      title: fallbackPada.title,
      description: fallbackPada.description,
      degreeRange: fallbackPada.degreeRange,
      navamsaSign: fallbackPada.navamsaSign
    } : null;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <Link to="/nakshatras">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to All Nakshatras
          </Button>
        </Link>

        {isInitializing && (
          <Alert className="border-primary/50 bg-primary/5">
            <Loader2 className="h-4 w-4 animate-spin" />
            <AlertTitle>Loading Nakshatra Details</AlertTitle>
            <AlertDescription>
              Initializing backend canister, please wait...
            </AlertDescription>
          </Alert>
        )}

        {showError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Unable to Load Details</AlertTitle>
            <AlertDescription>
              {error instanceof Error ? error.message : 'Failed to load Nakshatra details from the backend.'}
            </AlertDescription>
          </Alert>
        )}

        <div className="grid md:grid-cols-[300px_1fr] gap-6">
          <div className="space-y-4">
            <Card className={isCurrent ? 'ring-2 ring-primary shadow-lg shadow-primary/20' : ''}>
              <div className="relative aspect-[4/5] bg-gradient-to-br from-accent/20 via-background to-accent/10 overflow-hidden rounded-t-lg">
                {isCurrent && (
                  <div className="absolute top-3 right-3 z-10">
                    <Badge className="bg-primary text-primary-foreground shadow-lg flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      Moon Here
                    </Badge>
                  </div>
                )}
                {imageLoading ? (
                  <Skeleton className="absolute inset-0 w-full h-full" />
                ) : imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={nakshatra.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-6">
                      <div className="text-7xl font-bold text-primary/20 mb-2">
                        {nakshatra.index}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <CardContent className="p-4 space-y-2">
                <h1 className="text-2xl font-bold">{nakshatra.name}</h1>
                <p className="text-sm text-muted-foreground">
                  Nakshatra {nakshatra.index} of 27
                </p>
                <p className="text-xs text-muted-foreground">
                  {nakshatra.startDegree.toFixed(2)}° - {nakshatra.endDegree.toFixed(2)}°
                </p>
              </CardContent>
            </Card>

            {!isCurrent && (
              <Card className="bg-accent/20 border-accent">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Moon className="w-4 h-4" />
                    Today's Moon
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    The Moon is currently in <strong>{currentNakshatra.name}</strong>.
                  </p>
                  <Link
                    to="/nakshatras/$slug/$section"
                    params={{ slug: currentNakshatra.slug, section: 'traits' }}
                  >
                    <Button variant="outline" size="sm" className="w-full">
                      View Today's Nakshatra
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="space-y-6">
            {isCurrent && (
              <Card className="bg-primary/10 border-primary/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    Lunar Climate Today
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Ground your energy and connect with your body</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Favorable for new beginnings and swift action</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Good day for healing and rejuvenation practices</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            )}

            <Tabs defaultValue={section || 'traits'} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="traits" asChild>
                  <Link
                    to="/nakshatras/$slug/$section"
                    params={{ slug: nakshatra.slug, section: 'traits' }}
                  >
                    Traits
                  </Link>
                </TabsTrigger>
                <TabsTrigger value="pada" asChild>
                  <Link
                    to="/nakshatras/$slug/$section"
                    params={{ slug: nakshatra.slug, section: 'pada' }}
                  >
                    Pada
                  </Link>
                </TabsTrigger>
                <TabsTrigger value="mythology" asChild>
                  <Link
                    to="/nakshatras/$slug/$section"
                    params={{ slug: nakshatra.slug, section: 'mythology' }}
                  >
                    Mythology
                  </Link>
                </TabsTrigger>
                <TabsTrigger value="symbolism" asChild>
                  <Link
                    to="/nakshatras/$slug/$section"
                    params={{ slug: nakshatra.slug, section: 'symbolism' }}
                  >
                    Symbolism
                  </Link>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="traits" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Characteristics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Description</h3>
                      <p className="text-muted-foreground">
                        {backendData?.description || 'Loading description...'}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Key Traits</h3>
                      <p className="text-muted-foreground">
                        {backendData?.characteristics || 'Loading characteristics...'}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="pada" className="mt-6 space-y-4">
                {[1, 2, 3, 4].map((padaNum) => {
                  const padaInfo = getPadaInfo(padaNum as 1 | 2 | 3 | 4);
                  if (!padaInfo) return null;

                  return (
                    <Card key={padaNum}>
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <span>Pada {padaNum}</span>
                          {'navamsaSign' in padaInfo && padaInfo.navamsaSign && (
                            <Badge variant="outline">{padaInfo.navamsaSign}</Badge>
                          )}
                        </CardTitle>
                        {'degreeRange' in padaInfo && padaInfo.degreeRange && (
                          <p className="text-sm text-muted-foreground">{padaInfo.degreeRange}</p>
                        )}
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div>
                          <h4 className="font-semibold text-sm mb-1">{padaInfo.title}</h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {padaInfo.description}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </TabsContent>

              <TabsContent value="mythology" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Mythology & Deity</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Ruling Deity</h3>
                      <p className="text-muted-foreground">
                        {backendData?.rulingDeity || 'Loading deity information...'}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Mythological Significance</h3>
                      <p className="text-muted-foreground">
                        The deity {backendData?.rulingDeity} governs this nakshatra, bringing their unique
                        qualities and blessings to those born under this lunar mansion.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="symbolism" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Symbolism</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Symbol</h3>
                      <p className="text-muted-foreground">
                        {backendData?.symbol || 'Loading symbol information...'}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Symbolic Meaning</h3>
                      <p className="text-muted-foreground">
                        The symbol of {backendData?.symbol} represents the core essence and energy
                        of this nakshatra, reflecting its deeper spiritual significance.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
