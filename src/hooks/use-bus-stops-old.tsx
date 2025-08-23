import {
  addStop,
  deleteStop,
  getStopById,
  getStops,
  updateStop,
} from '@/lib/api/route-management/stops';
import { BusStopRequest } from '@/types/requestdto/bus-stop';
import { BusStopResponse } from '@/types/responsedto/bus-stop';
import { QueryParams } from '@/types/requestdto/pagination';
import { useEffect, useState, useCallback } from 'react';

interface PaginatedResponse {
  content: BusStopResponse[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

const useBusStops = () => {
  const [busStops, setBusStops] = useState<BusStopResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentParams, setCurrentParams] = useState<QueryParams | undefined>();
  const [pagination, setPagination] = useState({
    totalElements: 0,
    totalPages: 0,
    currentPage: 0,
    pageSize: 10,
  });

  const loadBusStops = useCallback(async (params?: QueryParams) => {
    setLoading(true);
    setCurrentParams(params);
    try {
      const response: PaginatedResponse = await getStops(params);
      console.log(response);
      setBusStops(response.content);
      setPagination({
        totalElements: response.totalElements,
        totalPages: response.totalPages,
        currentPage: response.number,
        pageSize: response.size,
      });
    } catch (error: any) {
      console.log('error loading', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadBusStopById = async (id: String) => {
    try {
      const response = await getStopById(id);
      return response;
    } catch (error: any) {
      console.log('error loading', error);
    }
  };

  useEffect(() => {
    loadBusStops();
  }, []);

  const addBusStop = async (data: BusStopRequest) => {
    try {
      const response = await addStop(data);
      console.log(response);
      // Don't call loadBusStops() here - let the parent component handle the refetch
    } catch (error) {
      console.error('Failed to add');
    }
  };

  const updateBusStop = async (data: BusStopRequest, id: String) => {
    try {
      const response = await updateStop(data, id);
      console.log(response);
      // Don't call loadBusStops() here - let the parent component handle the refetch
    } catch (error) {
      console.error('Failed to update');
    }
  };

  const deleteBusStop = async (id: String) => {
    try {
      const response = await deleteStop(id);
      console.log(response);
      // Refetch with current parameters after deletion
      loadBusStops(currentParams);
    } catch (error) {
      console.error('Failed to delete');
    }
  };

  return {
    busStops,
    pagination,
    addBusStop,
    loading,
    refetch: loadBusStops,
    updateBusStop,
    deleteBusStop,
    loadBusStopById,
  };
};

export default useBusStops;
