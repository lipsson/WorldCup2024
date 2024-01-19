import { useQuery } from '@tanstack/react-query';
import { httpClient } from '../../../common/api/http-client'
import { TeamsType } from '../types/types';

export const useAllTeamsListQuery = (cup: number) => {
  return useQuery<TeamsType[]>({
    queryKey: ['all-teams-list'],
    queryFn: async () => {
      const { data } = await httpClient.get<TeamsType[]>(`/${cup}`);
      return data;
    },
  })
};
