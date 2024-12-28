import {http} from '../http';
import {useQuery} from '@tanstack/react-query';
import {API_ENDPOINTS} from '../api-endpoints';

const fetchPartners = async () => {
  const {data} = await http.get(API_ENDPOINTS.PARTNERS);
  return data.data;
};

export const useGetPartners = () => {
  return useQuery([`PARTNERS`], fetchPartners, {
    staleTime: 60 * 1000 * 5,
    cacheTime: 60 * 1000 * 5,
  });
};
