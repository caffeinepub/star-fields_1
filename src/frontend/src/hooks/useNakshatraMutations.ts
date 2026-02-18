import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Nakshatra } from '../backend';

export function useUpdateNakshatra() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (nakshatra: Nakshatra) => {
      if (!actor) throw new Error('Actor not initialized');
      const result = await actor.updateNakshatra(nakshatra);
      if (!result) {
        throw new Error('Failed to update Nakshatra');
      }
      return result;
    },
    onSuccess: (_, variables) => {
      // Invalidate all nakshatras queries
      queryClient.invalidateQueries({ queryKey: ['nakshatras'] });
      // Invalidate the specific nakshatra query
      queryClient.invalidateQueries({ queryKey: ['nakshatra', variables.name] });
    },
  });
}
