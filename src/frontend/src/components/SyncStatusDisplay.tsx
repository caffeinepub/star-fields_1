import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { getLastSyncTimestamp } from '../hooks/useSyncFromLive';

function formatRelativeTime(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;
  
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (days > 0) {
    return `${days} day${days > 1 ? 's' : ''} ago`;
  }
  if (hours > 0) {
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  }
  if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  }
  return 'just now';
}

export default function SyncStatusDisplay() {
  const [lastSync, setLastSync] = useState<number | null>(null);
  const [, setTick] = useState(0);

  useEffect(() => {
    // Load initial sync timestamp
    setLastSync(getLastSyncTimestamp());

    // Listen for sync completion events
    const handleSyncCompleted = (event: Event) => {
      const customEvent = event as CustomEvent<{ timestamp: number }>;
      setLastSync(customEvent.detail.timestamp);
    };

    window.addEventListener('syncCompleted', handleSyncCompleted);

    // Update relative time every minute
    const interval = setInterval(() => {
      setTick(t => t + 1);
    }, 60000);

    return () => {
      window.removeEventListener('syncCompleted', handleSyncCompleted);
      clearInterval(interval);
    };
  }, []);

  if (!lastSync) {
    return (
      <Card className="border-warning/50 bg-warning/5">
        <CardContent className="flex items-center gap-3 py-3 px-4">
          <AlertCircle className="w-5 h-5 text-warning flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium">Never synced</p>
            <p className="text-xs text-muted-foreground">
              Draft data may differ from live. Click "Sync from Live" to pull the latest data.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const now = Date.now();
  const hoursSinceSync = (now - lastSync) / (1000 * 60 * 60);
  const isStale = hoursSinceSync > 24;

  return (
    <Card className={isStale ? 'border-warning/50 bg-warning/5' : 'border-success/50 bg-success/5'}>
      <CardContent className="flex items-center gap-3 py-3 px-4">
        {isStale ? (
          <Clock className="w-5 h-5 text-warning flex-shrink-0" />
        ) : (
          <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
        )}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium">
            Last synced {formatRelativeTime(lastSync)}
          </p>
          <p className="text-xs text-muted-foreground">
            {isStale 
              ? 'Data may be outdated. Consider syncing again.'
              : 'Draft is in sync with live data.'
            }
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
