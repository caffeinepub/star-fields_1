import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Nakshatra } from '../backend';

interface UpdateNakshatraParams {
  nakshatra: Nakshatra;
  imageData?: Uint8Array | null;
}

export function useUpdateNakshatra() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ nakshatra, imageData }: UpdateNakshatraParams) => {
      if (!actor) throw new Error('Actor not initialized');

      // If there's a new image to upload, handle it first
      if (imageData) {
        await actor.replaceNakshatraImage(nakshatra.name, imageData);
      }

      // Update the nakshatra data
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
      queryClient.invalidateQueries({ queryKey: ['nakshatra', variables.nakshatra.name] });
      // Invalidate image cache if image was updated
      if (variables.imageData && variables.nakshatra.imageId) {
        queryClient.invalidateQueries({ queryKey: ['nakshatraImage', variables.nakshatra.imageId] });
      }
    },
  });
}
