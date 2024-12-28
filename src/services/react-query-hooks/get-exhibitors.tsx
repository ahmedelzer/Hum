import {http} from '../http';
import {useQuery} from '@tanstack/react-query';
import {API_ENDPOINTS} from '../api-endpoints';

const fetchExhibitor = async ({queryKey}: any) => {
  const [_key, _params] = queryKey;
  const {data} = await http.get(API_ENDPOINTS.EXIHIBITORS);
  return data;
};

export const useGetExhibitors = () => {
  return useQuery([`EXHIBITORS`], fetchExhibitor, {
    staleTime: 60 * 1000 * 5,
    cacheTime: 60 * 1000 * 5,
  });
};
