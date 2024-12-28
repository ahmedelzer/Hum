import {API_ENDPOINTS} from '../api-endpoints';
import {useMutation} from '@tanstack/react-query';
import {http} from '../http';

async function requestRejectChat(id: any) {
  return http.patch(`${API_ENDPOINTS.REJECT_CHAT}=${id}`);
}

export const useRejectChat = () => {
  return useMutation((id: any) => requestRejectChat(id), {
    onError: data => {
      console.log(data, 'reject chat request  error response');
    },
  });
};
