import {http} from '../http';
import {useQuery} from '@tanstack/react-query';
import {API_ENDPOINTS} from '../api-endpoints';

const fetchChatInfo = async ({queryKey}: any) => {
  const [_key, _params] = queryKey;
  const {receiverId, currentId} = _params;
  // console.log(value, debouncedSearchResults, 'params query');
  const {data} = await http.get(
    `${API_ENDPOINTS.CHAT_INFO}?receiver_id=${
      receiverId ? receiverId : ''
    }&sender_id=${currentId}`,
  );
  return data;
};

export const useGetChatInfo = (options: any) => {
  return useQuery([`CHAT_INFO`, options], fetchChatInfo, {
    staleTime: 1000 * 5,
  });
};
