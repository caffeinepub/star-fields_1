import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { RefreshCw, Loader2, AlertTriangle } from 'lucide-react';
import { useSyncFromLive } from '../hooks/useSyncFromLive';
import { toast } from 'sonner';

export default function SyncFromLiveButton() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const syncMutation = useSyncFromLive();

  const handleSync = async () => {
    setIsDialogOpen(false);
    
    try {
      const result = await syncMutation.mutateAsync();
      
      toast.success('Sync Complete', {
        description: `Successfully synced ${result.nakshatraCount} Nakshatras and ${result.imageCount} images from live.`,
        duration: 5000,
      });
    } catch (error) {
      toast.error('Sync Failed', {
        description: error instanceof Error ? error.message : 'An unexpected error occurred during sync.',
        duration: 7000,
      });
    }
  };

  return (
    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="default"
          size="lg"
          disabled={syncMutation.isPending}
          className="gap-2"
        >
          {syncMutation.isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Syncing...
            </>
          ) : (
            <>
              <RefreshCw className="w-4 h-4" />
              Sync from Live
            </>
          )}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-warning" />
            Sync Data from Live?
          </AlertDialogTitle>
          <AlertDialogDescription className="space-y-2">
            <p>
              This will replace <strong>all draft data</strong> with the current data from the live application.
            </p>
            <p className="text-sm">
              This includes:
            </p>
            <ul className="text-sm list-disc list-inside space-y-1 ml-2">
              <li>All 27 Nakshatra text content (descriptions, pada info, etc.)</li>
              <li>All uploaded images</li>
            </ul>
            <p className="font-semibold text-foreground mt-3">
              Any unsaved changes in the draft will be lost. This action cannot be undone.
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleSync}>
            Yes, Sync from Live
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
