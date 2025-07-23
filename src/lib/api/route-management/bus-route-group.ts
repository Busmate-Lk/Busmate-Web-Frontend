import { BusRouteGroupResponse } from '@/types/responsedto/bus-route-group';
import { routeManagementClient } from '../client';
import { BusRouteGroupRequest } from '@/types/requestdto/bus-route-group';

export const getRouteGroups = async (): Promise<BusRouteGroupResponse[]> => {
  const response = await routeManagementClient.get('/api/route-groups');
  return response.data.busRouteGroups;
};

export const getRouteGroupById = async (
  id: String
): Promise<BusRouteGroupResponse> => {
  const response = await routeManagementClient.get(`/api/route-groups/${id}`);
  return response.data.busRouteGroup;
};

export const addRouteGroup = async (
  data: BusRouteGroupRequest
): Promise<BusRouteGroupResponse> => {
  const response = await routeManagementClient.post('/api/route-groups', data);
  return response.data.busRouteGroup;
};

export const updateRouteGroup = async (
  data: BusRouteGroupRequest,
  id: String
): Promise<BusRouteGroupResponse> => {
  const response = await routeManagementClient.put(
    `/api/route-groups/${id}`,
    data
  );
  return response.data.busRouteGroup;
};

export const deleteRouteGroup = async (id: String) => {
  const response = await routeManagementClient.delete(
    `/api/route-groups/${id}`
  );
  return response.data;
};
