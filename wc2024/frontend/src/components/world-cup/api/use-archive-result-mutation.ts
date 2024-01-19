import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { httpClient } from '../../../common/api/http-client';
import { ApiErrorType } from 'common/api/query-client';

export type NewResultType = {
  home: number;
  guest: number;
}

export const useArchiveResultMutation = (cup: number): UseMutationResult<
  unknown,
  ApiErrorType,
  NewResultType
> => {
  const client = useQueryClient();
  return useMutation(
    async (body) => {
      const response = await httpClient.patch<NewResultType>(`/${cup}/${body.home}/${body.guest}`);

      return response.data;
    },
    {
      onSuccess: async () => {
        await client.invalidateQueries(['worldcups-list']);
      },
    },
  );
};
