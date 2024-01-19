import { useQuery } from '@tanstack/react-query';
import { httpClient } from '../../../common/api/http-client'
import { WorldCupType } from '../types/types';

export const useWorldCupsListQuery = () => {
  return useQuery<WorldCupType[]>({
    queryKey: ['worldcups-list'],
    queryFn: async () => {
      const { data } = await httpClient.get<WorldCupType[]>('/');
      return data;
    },
  })
};
