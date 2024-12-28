import {http} from '../http';
import {useQuery} from '@tanstack/react-query';
import {API_ENDPOINTS} from '../api-endpoints';

const fetchMatchUsers = async () => {
  const {data} = await http.get(API_ENDPOINTS.GET_MATCH_USERS);
  return data;
};

export const useGetMatchUsers = () => {
  return useQuery([`MATCH_USERS`], fetchMatchUsers, {
    staleTime: 60 * 1000 * 5,
    cacheTime: 60 * 1000 * 5,
  });
};
