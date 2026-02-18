import { Link } from '@tanstack/react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Edit, AlertCircle } from 'lucide-react';
import { useNakshatras } from '../hooks/useQueries';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function AdminPage() {
  const { data: nakshatras, isLoading, error } = useNakshatras();

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 27 }).map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-32" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-24" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Failed to load Nakshatras: {error instanceof Error ? error.message : 'Unknown error'}
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  if (!nakshatras || nakshatras.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              No Nakshatras found. The backend may need to be initialized.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Manage all {nakshatras.length} Nakshatras - edit images, descriptions, and details
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {nakshatras.map((nakshatra) => (
            <Card key={nakshatra.name} className="hover:border-primary/50 transition-colors">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center justify-between">
                  <span>{nakshatra.name}</span>
                  <Link
                    to="/admin/nakshatras/$id"
                    params={{ id: nakshatra.name }}
                  >
                    <Button size="sm" variant="ghost">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {nakshatra.imageUrl && (
                  <div className="aspect-[4/5] w-full rounded-md overflow-hidden mb-2">
                    <img
                      src={nakshatra.imageUrl}
                      alt={nakshatra.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="text-sm">
                  <span className="text-muted-foreground">Deity:</span>{' '}
                  <span className="font-medium">{nakshatra.rulingDeity}</span>
                </div>
                <div className="text-sm">
                  <span className="text-muted-foreground">Symbol:</span>{' '}
                  <span className="font-medium">{nakshatra.symbol}</span>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {nakshatra.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
