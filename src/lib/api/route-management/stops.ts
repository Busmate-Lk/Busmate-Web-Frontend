import { BusStopResponse } from '@/types/responsedto/bus-stop';
import { routeManagementClient } from '../client';
import { BusStopRequest } from '@/types/requestdto/bus-stop';
import { QueryParams } from '@/types/requestdto/pagination';

export const getStops = async (
  params?: QueryParams
): Promise<{
  content: BusStopResponse[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}> => {
  const searchParams = new URLSearchParams();

  if (params?.page !== undefined)
    searchParams.append('page', params.page.toString());
  if (params?.size !== undefined)
    searchParams.append('size', params.size.toString());
  if (params?.sortBy) searchParams.append('sortBy', params.sortBy);
  if (params?.sortDir) searchParams.append('sortDir', params.sortDir);
  if (params?.search) searchParams.append('search', params.search);

  const queryString = searchParams.toString();
  const url = `/api/stops${queryString ? `?${queryString}` : ''}`;

  const response = await routeManagementClient.get(url);
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
