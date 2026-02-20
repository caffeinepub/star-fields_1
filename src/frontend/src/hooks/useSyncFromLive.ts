import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { useInternetIdentity } from './useInternetIdentity';
import { createLiveActor, validateCanisterConfig } from '../utils/canisterConfig';
import type { Nakshatra, ImageExport } from '../backend';

export type SyncStage = 
  | 'idle'
  | 'validating'
  | 'exporting-nakshatras'
  | 'exporting-images'
  | 'importing-nakshatras'
  | 'importing-images'
  | 'complete';

export interface SyncProgress {
  stage: SyncStage;
  message: string;
}

export interface SyncResult {
  success: boolean;
  timestamp: number;
  nakshatraCount: number;
  imageCount: number;
}

const LAST_SYNC_KEY = 'lastSyncTimestamp';

export function useSyncFromLive() {
  const { actor: draftActor } = useActor();
  const { identity } = useInternetIdentity();
  const queryClient = useQueryClient();

  return useMutation<SyncResult, Error, void, { stage: SyncStage }>({
    mutationFn: async () => {
      if (!draftActor) {
        throw new Error('Draft actor not available');
      }

      if (!identity) {
        throw new Error('You must be logged in to sync data');
      }

      // Validate configuration
      const configValidation = validateCanisterConfig();
      if (!configValidation.valid) {
        throw new Error(configValidation.error);
      }

      let liveActor;
      try {
        // Create actor for live canister with same identity
        liveActor = await createLiveActor(identity);
      } catch (error) {
        throw new Error(`Failed to connect to live canister: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }

      // Export Nakshatra data from live
      let nakshatras: Nakshatra[];
      try {
        nakshatras = await liveActor.exportNakshatraData();
      } catch (error) {
        throw new Error(`Failed to export Nakshatra data from live: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }

      // Export image data from live
      let images: ImageExport[];
      try {
        images = await liveActor.exportImageData();
      } catch (error) {
        throw new Error(`Failed to export image data from live: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }

      // Import Nakshatra data to draft
      try {
        await draftActor.importNakshatraData(nakshatras);
      } catch (error) {
        throw new Error(`Failed to import Nakshatra data to draft: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }

      // Import image data to draft
      try {
        await draftActor.importImageData(images);
      } catch (error) {
        throw new Error(`Failed to import image data to draft: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }

      const timestamp = Date.now();
      
      // Store sync timestamp in localStorage
      localStorage.setItem(LAST_SYNC_KEY, timestamp.toString());

      // Dispatch custom event for sync completion
      window.dispatchEvent(new CustomEvent('syncCompleted', { detail: { timestamp } }));

      return {
        success: true,
        timestamp,
        nakshatraCount: nakshatras.length,
        imageCount: images.length,
      };
    },
    onSuccess: () => {
      // Invalidate all queries to refresh data
      queryClient.invalidateQueries();
    },
  });
}

export function getLastSyncTimestamp(): number | null {
  const timestamp = localStorage.getItem(LAST_SYNC_KEY);
  return timestamp ? parseInt(timestamp, 10) : null;
}
