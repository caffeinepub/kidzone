import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';

export function useGetBestScore() {
  const { actor, isFetching } = useActor();

  return useQuery<bigint | null>({
    queryKey: ['bestScore'],
    queryFn: async () => {
      if (!actor) return null;
      try {
        const score = await actor.getBestScore();
        return score;
      } catch {
        // No score found yet
        return null;
      }
    },
    enabled: !!actor && !isFetching,
  });
}

export function useRecordScore() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (moves: number) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.recordScore(BigInt(moves));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bestScore'] });
    },
  });
}
