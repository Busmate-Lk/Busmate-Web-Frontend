import { BusStopResponse } from '@/types/responsedto/bus-stop';
import { routeManagementClient } from '../client';
import { BusStopRequest } from '@/types/requestdto/bus-stop';

export const getStops = async (): Promise<BusStopResponse[]> => {
  const response = await routeManagementClient.get('/api/stops');
  return response.data;
};

export const getStopById = async (id: String): Promise<BusStopResponse> => {
  const response = await routeManagementClient.get(`/api/stops/${id}`);
  return response.data;
};

export const addStop = async (
  data: BusStopRequest
): Promise<BusStopResponse> => {
  const response = await routeManagementClient.post('/api/stops', data);
  return response.data;
};

export const updateStop = async (
  data: BusStopRequest,
  id: String
): Promise<BusStopResponse> => {
  const response = await routeManagementClient.put(`/api/stops/${id}`, data);
  return response.data;
};

export const deleteStop = async (id: String) => {
  const response = await routeManagementClient.delete(`/api/stops/${id}`);
  return response.data;
};
