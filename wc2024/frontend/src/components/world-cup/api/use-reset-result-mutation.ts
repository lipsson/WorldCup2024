import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { httpClient } from '../../../common/api/http-client';

export const useResetResultMutation = (cup: number): UseMutationResult => {
  const client = useQueryClient();
  return useMutation(
    async () => {
      const response = await httpClient.patch<number>(`/${cup}`);
      return response.data;
    },
    {
      onSuccess: async () => {
        await client.invalidateQueries(['worldcups-list']);
      },
    },
  );
};