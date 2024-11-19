import {API_ENDPOINTS} from '../api-endpoints';
import {useMutation} from '@tanstack/react-query';
import {http} from '../http';

async function requestAcceptChat(id: any) {
  return http.patch(`${API_ENDPOINTS.ACCEPT_CHAT}=${id}`);
}

export const useAcceptChat = () => {
  return useMutation((id: any) => requestAcceptChat(id), {
    onError: data => {
      console.log(data, 'accept chat request error response');
    },
  });
};
