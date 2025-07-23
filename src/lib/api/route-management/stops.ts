import { BusStopResponse } from '@/types/responsedto/bus-stop';
import { routeManagementClient } from '../client';
import { BusStopRequest } from '@/types/requestdto/bus-stop';

export const getStops = async (): Promise<BusStopResponse[]> => {
  const response = await routeManagementClient.get<{busStops:BusStopResponse[]}>('/api/stops');
  return response.data.busStops;
};

export const addStop = async (data:BusStopRequest):Promise<BusStopResponse> =>{
    const response = await routeManagementClient.post<{busStops:BusStopResponse}>('/api/stops',data);
    return response.data.busStops;
};

 