import { useParams, Link } from '@tanstack/react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Moon, Sparkles } from 'lucide-react';
import { getNakshatraBySlug } from '../utils/nakshatraEngine';
import { useCurrentNakshatra } from '../hooks/useCurrentNakshatra';
import { useNakshatraByName } from '../hooks/useQueries';

export default function NakshatraDetailPage() {
  const { slug, section } = useParams({ strict: false });
  const nakshatra = getNakshatraBySlug(slug as string);
  const currentNakshatra = useCurrentNakshatra();
  
  const { data: backendData } = useNakshatraByName(nakshatra?.name || '');

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
  const imageUrl = backendData?.imageUrl || '';

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <Link to="/nakshatras">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to All Nakshatras
          </Button>
        </Link>

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
                {imageUrl ? (
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
              <TabsList className="grid w-full grid-cols-3 lg:grid-cols-5">
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
                <TabsTrigger value="ruler" asChild>
                  <Link
                    to="/nakshatras/$slug/$section"
                    params={{ slug: nakshatra.slug, section: 'ruler' }}
                  >
                    Ruler
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
                    <CardTitle>Traits & Characteristics</CardTitle>
                  </CardHeader>
                  <CardContent className="prose prose-invert max-w-none">
                    {backendData?.description ? (
                      <div className="space-y-4">
                        <p>{backendData.description}</p>
                        {backendData.characteristics && (
                          <div>
                            <h3 className="text-lg font-semibold mb-2">Key Characteristics</h3>
                            <p className="text-muted-foreground">{backendData.characteristics}</p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <p className="text-muted-foreground">
                        Detailed traits and characteristics for {nakshatra.name} will be available
                        once the admin adds content through the dashboard.
                      </p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="pada" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Pada Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent className="prose prose-invert max-w-none">
                    <p className="text-muted-foreground">
                      The four padas (quarters) of {nakshatra.name} will be detailed here once
                      content is added.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="mythology" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Mythology & Stories</CardTitle>
                  </CardHeader>
                  <CardContent className="prose prose-invert max-w-none">
                    <p className="text-muted-foreground">
                      Ancient stories and mythology related to {nakshatra.name} will appear here.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="ruler" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Planetary Ruler</CardTitle>
                  </CardHeader>
                  <CardContent className="prose prose-invert max-w-none">
                    <p className="text-muted-foreground">
                      Information about the planetary ruler of {nakshatra.name} will be shown here.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="symbolism" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Symbolism & Deity</CardTitle>
                  </CardHeader>
                  <CardContent className="prose prose-invert max-w-none">
                    {backendData ? (
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-lg font-semibold mb-2">Ruling Deity</h3>
                          <p className="text-muted-foreground">{backendData.rulingDeity}</p>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-2">Symbol</h3>
                          <p className="text-muted-foreground">{backendData.symbol}</p>
                        </div>
                      </div>
                    ) : (
                      <p className="text-muted-foreground">
                        Symbolic meanings and deity associations for {nakshatra.name} will be
                        described here.
                      </p>
                    )}
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
