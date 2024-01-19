import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { httpClient } from '../../../common/api/http-client';
import { ApiErrorType } from '../../../common/api/query-client';

export const useNewResultMutation = (cup: number): UseMutationResult<
  unknown,
  ApiErrorType,
  number
> => {
  const client = useQueryClient();
  return useMutation(
    async (body) => {
      const response = await httpClient.patch<number>(`/${cup}/${body}`);
      return response.data;
    },
    {
      onSuccess: async () => {
        await client.invalidateQueries(['worldcups-list']);
      },
    },
  );
};