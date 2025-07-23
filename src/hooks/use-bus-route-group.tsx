import {
  getRouteGroupById,
  getRouteGroups,
  addRouteGroup,
  updateRouteGroup,
  deleteRouteGroup,
} from '@/lib/api/route-management/bus-route-group';
import { BusRouteGroupRequest } from '@/types/requestdto/bus-route-group';
import { BusRouteGroupResponse } from '@/types/responsedto/bus-route-group';
import { useEffect, useState } from 'react';

const useBusRouteGroups = () => {
  const [busRouteGroupes, setBusRouteGroups] = useState<
    BusRouteGroupResponse[]
  >([]);
  const [loading, setLoading] = useState(false);

  const loadBusRouteGroups = async () => {
    setLoading(true);
    try {
      const response = await getRouteGroups();
      setBusRouteGroups(response);
    } catch (error: any) {
      console.log('error loading', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBusRouteGroups();
  }, []);

  const loadBusRouteGroupbyId = async (id: String) => {
    try {
      const response = await getRouteGroupById(id);
      return response;
    } catch (error: any) {
      console.log('error loading', error);
    } finally {
      setLoading(false);
    }
  };

  const addBusRouteGroup = async (data: BusRouteGroupRequest) => {
    try {
      const response = await addRouteGroup(data);
      console.log(response);
    } catch (error) {
      console.error('Failed to add');
    } finally {
      loadBusRouteGroups();
    }
  };

  const updateBusRouteGroup = async (
    data: BusRouteGroupRequest,
    id: String
  ) => {
    try {
      const response = await updateRouteGroup(data, id);
      console.log(response);
    } catch (error) {
      console.error('Failed to update');
    } finally {
      loadBusRouteGroups();
    }
  };

  const deleteBusRouteGroup = async (id: String) => {
    try {
      const response = await deleteRouteGroup(id);
      console.log(response);
    } catch (error) {
      console.error('Failed to delete');
    } finally {
      loadBusRouteGroups();
    }
  };

  return {
    busRouteGroupes,
    loading,
    addBusRouteGroup,
    updateBusRouteGroup,
    deleteBusRouteGroup,
    loadBusRouteGroupbyId,
  };
};

export { useBusRouteGroups };
export default useBusRouteGroups;
