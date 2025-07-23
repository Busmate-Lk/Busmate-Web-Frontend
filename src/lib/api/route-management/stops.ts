import { BusStopResponse } from '@/types/responsedto/bus-stop';
import { routeManagementClient } from '../client';
import { BusStopRequest } from '@/types/requestdto/bus-stop';

export const getStops = async (): Promise<BusStopResponse[]> => {
  const response = await routeManagementClient.get<{busStops:BusStopResponse[]}>('/api/stops');
  return response.data.busStops;
};

export const getStopById = async(id:String):Promise<BusStopResponse>=>{
  const response = await routeManagementClient.get<{busStop:BusStopResponse}>(`/api/stops/${id}`);
  return response.data.busStop;
}

export const addStop = async (data:BusStopRequest):Promise<BusStopResponse> =>{
    const response = await routeManagementClient.post<{busStop:BusStopResponse}>('/api/stops',data);
    return response.data.busStop;
};

export const updateStop = async(data:BusStopRequest,id:String):Promise<BusStopResponse> =>{
  const response = await routeManagementClient.put<{busStop:BusStopResponse}>(`/api/stops/${id}`,data)
  return response.data.busStop;
}

export const deleteStop = async(id:String)=>{
  const response = await routeManagementClient.delete(`/api/stops/${id}`)
  return response.data;
}



 