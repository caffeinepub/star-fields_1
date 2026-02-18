import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Nakshatra } from '../backend';

export function useNakshatras() {
  const { actor, isFetching } = useActor();

  return useQuery<Nakshatra[]>({
    queryKey: ['nakshatras', actor?.toString()],
    queryFn: async () => {
      if (!actor) return [];
      
      // First, ensure backend is initialized
      try {
        await actor.initialize();
      } catch (error) {
        console.error('Failed to initialize backend:', error);
      }
      
      // Then fetch all nakshatras
      const nakshatras = await actor.getAllNakshatras();
      return nakshatras;
    },
    enabled: !!actor && !isFetching,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
}

export function useNakshatraByName(name: string) {
  const { actor, isFetching } = useActor();

  return useQuery<Nakshatra | null>({
    queryKey: ['nakshatra', name, actor?.toString()],
    queryFn: async () => {
      if (!actor || !name) return null;
      
      // Ensure backend is initialized before reading
      try {
        await actor.initialize();
      } catch (error) {
        console.error('Failed to initialize backend:', error);
      }
      
      const nakshatra = await actor.readNakshatra(name);
      return nakshatra;
    },
    enabled: !!actor && !isFetching && !!name,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
}
