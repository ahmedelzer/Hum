import {http} from '../http';
import {useQuery} from '@tanstack/react-query';
import {API_ENDPOINTS} from '../api-endpoints';

const fetchChatRequestsSend = async ({queryKey}: any) => {
  const [_key, _params] = queryKey;
  const {data} = await http.get(API_ENDPOINTS.CHAT_SEND);
  return data.data;
};

export const useGetChatRequestsSend = () => {
  return useQuery([`CHAT_SEND`], fetchChatRequestsSend, {
    staleTime: 60 * 1000 * 5,
    cacheTime: 60 * 1000 * 5,
  });
};
