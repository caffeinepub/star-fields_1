import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Nakshatra } from '../backend';

// Check if error is an initialization/startup error
function isInitializationError(error: unknown): boolean {
  if (error instanceof Error) {
    const message = error.message.toLowerCase();
    return (
      message.includes('ic0508') ||
      message.includes('stopped') ||
      message.includes('canister') ||
      message.includes('unavailable') ||
      message.includes('initializing') ||
      message.includes('not initialized')
    );
  }
  return false;
}

// Transform backend errors into user-friendly messages
function transformError(error: unknown): Error {
  if (error instanceof Error) {
    const message = error.message;
    
    // Check for canister stopped/unavailable errors
    if (message.includes('IC0508') || 
        message.includes('stopped') || 
        message.includes('Canister') ||
        message.includes('unavailable')) {
      return new Error('The service is temporarily unavailable. The backend canister may be stopped or initializing. Please try again in a moment.');
    }
    
    // Check for initialization errors
    if (message.includes('not initialized') || message.includes('empty')) {
      return new Error('The Nakshatra data has not been initialized yet. Please contact the administrator.');
    }
    
    return error;
  }
  
  return new Error('An unexpected error occurred');
}

export function useGetAllNakshatras() {
  const { actor, isFetching } = useActor();

  return useQuery<Nakshatra[]>({
    queryKey: ['nakshatras'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      try {
        const result = await actor.getAllNakshatras();
        return result;
      } catch (error) {
        throw transformError(error);
      }
    },
    enabled: !!actor && !isFetching,
    // Retry initialization errors with exponential backoff
    retry: (failureCount, error) => {
      // Retry initialization errors up to 5 times
      if (isInitializationError(error)) {
        return failureCount < 5;
      }
      // Retry other errors up to 2 times
      return failureCount < 2;
    },
    retryDelay: (attemptIndex) => {
      // Exponential backoff: 1s, 2s, 4s, 8s, 16s (max 30s)
      return Math.min(1000 * Math.pow(2, attemptIndex), 30000);
    },
  });
}

// Alias for backward compatibility
export const useNakshatras = useGetAllNakshatras;

export function useNakshatraByName(name: string) {
  const { actor, isFetching } = useActor();

  return useQuery<Nakshatra | null>({
    queryKey: ['nakshatra', name],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      try {
        const result = await actor.readNakshatra(name);
        return result;
      } catch (error) {
        throw transformError(error);
      }
    },
    enabled: !!actor && !isFetching && !!name,
    // Retry initialization errors with exponential backoff
    retry: (failureCount, error) => {
      // Retry initialization errors up to 5 times
      if (isInitializationError(error)) {
        return failureCount < 5;
      }
      // Retry other errors up to 2 times
      return failureCount < 2;
    },
    retryDelay: (attemptIndex) => {
      // Exponential backoff: 1s, 2s, 4s, 8s, 16s (max 30s)
      return Math.min(1000 * Math.pow(2, attemptIndex), 30000);
    },
  });
}

export function useGetNakshatraImage(imageId: string | undefined) {
  const { actor, isFetching } = useActor();

  return useQuery<string | null>({
    queryKey: ['nakshatraImage', imageId],
    queryFn: async () => {
      if (!actor || !imageId) return null;
      try {
        const imageBlob = await actor.getImage(imageId);
        if (!imageBlob) return null;
        
        // Convert Uint8Array to Blob and create object URL for display
        // Create a new Uint8Array to ensure proper type compatibility
        const uint8Array = new Uint8Array(imageBlob);
        const blob = new Blob([uint8Array], { type: 'image/jpeg' });
        const imageUrl = URL.createObjectURL(blob);
        return imageUrl;
      } catch (error) {
        console.error('Failed to fetch image:', error);
        return null;
      }
    },
    enabled: !!actor && !isFetching && !!imageId,
    staleTime: 1000 * 60 * 10, // Cache for 10 minutes
    retry: 1,
  });
}
