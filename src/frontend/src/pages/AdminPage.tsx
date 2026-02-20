import { Link } from '@tanstack/react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Edit, AlertCircle, RefreshCw, Loader2 } from 'lucide-react';
import { useNakshatras, useGetNakshatraImage } from '../hooks/useQueries';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import AdminLogoutButton from '../components/AdminLogoutButton';

function NakshatraImage({ imageId, name }: { imageId?: string; name: string }) {
  const { data: imageUrl, isLoading } = useGetNakshatraImage(imageId);

  if (!imageId) return null;

  if (isLoading) {
    return (
      <div className="aspect-[4/5] w-full rounded-md overflow-hidden mb-2">
        <Skeleton className="w-full h-full" />
      </div>
    );
  }

  if (imageUrl) {
    return (
      <div className="aspect-[4/5] w-full rounded-md overflow-hidden mb-2">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  return null;
}

export default function AdminPage() {
  const { data: nakshatras, isLoading, error, refetch, isFetching } = useNakshatras();

  // Check if this is an initialization error (retrying)
  const isInitializing = (isLoading || (isFetching && !nakshatras)) && !error;
  
  // Only show error if it's a genuine failure after all retries
  const showError = error && !isLoading && !isFetching;

  if (isInitializing) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <AdminLogoutButton />
          </div>
          <div className="flex flex-col items-center justify-center py-16 space-y-4">
            <Loader2 className="w-12 h-12 animate-spin text-primary" />
            <div className="text-center space-y-2">
              <p className="text-lg font-medium">Initializing backend canister...</p>
              <p className="text-sm text-muted-foreground">Please wait while we connect to the service</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showError) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="flex justify-end mb-4">
            <AdminLogoutButton />
          </div>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Unable to Load Nakshatras</AlertTitle>
            <AlertDescription>
              {error instanceof Error ? error.message : 'An unexpected error occurred while loading the data.'}
            </AlertDescription>
          </Alert>
          <div className="flex justify-center">
            <Button onClick={() => refetch()} variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!nakshatras || nakshatras.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="flex justify-end mb-4">
            <AdminLogoutButton />
          </div>
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>No Data Available</AlertTitle>
            <AlertDescription>
              No Nakshatras found. The backend may need to be initialized.
            </AlertDescription>
          </Alert>
          <div className="flex justify-center">
            <Button onClick={() => refetch()} variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Manage all {nakshatras.length} Nakshatras - edit images, descriptions, and details
            </p>
          </div>
          <AdminLogoutButton />
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
                <NakshatraImage imageId={nakshatra.imageId} name={nakshatra.name} />
                <p className="text-sm text-muted-foreground line-clamp-2">
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
