import {http} from '../http';
import {useQuery} from '@tanstack/react-query';
import {API_ENDPOINTS} from '../api-endpoints';

const fetchSearchParams = async ({queryKey}: any) => {
  const [_key, _params] = queryKey;
  const {data} = await http.get(`${API_ENDPOINTS.EVENET_USER}/get_columns`);
  return data;
};

export const useGetSearchParams = () => {
  return useQuery([`SEARCH_PARAMS`], fetchSearchParams, {
    staleTime: 60 * 1000 * 5,
    cacheTime: 60 * 1000 * 5,
  });
};
