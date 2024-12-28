// import {useState, useEffect} from 'react';
// import {http} from '../http';
// import {useQuery} from '@tanstack/react-query';
// import {API_ENDPOINTS} from '../api-endpoints';
// import {storage} from '../../utils/storage';

// const fetchEventInfo = async () => {
//   const uuid = storage.getString('uuid');
//   if (!uuid) {
//     return [];
//   }
//   const {data} = await http.get(`${API_ENDPOINTS.UUID}?event_uuid=${uuid}`);
//   return data?.data;
// };

// export const useGetEventInfo = () => {
//   return useQuery([`EVENT_INFO`], fetchEventInfo, {
//     // cacheTime: 60000 /* 1 minute */,
//     // staleTime: 60000 /* 1 minute */,
//   });
// };
