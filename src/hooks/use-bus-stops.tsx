import { addStop, deleteStop, getStopById, getStops, updateStop } from '@/lib/api/route-management/stops';
import { BusStopRequest } from '@/types/requestdto/bus-stop';
import { BusStopResponse } from '@/types/responsedto/bus-stop';
import { useEffect, useState } from 'react';

const useBusStops = () => {
  const [busStops, setBusStops] = useState<BusStopResponse[]>([]);
  const [loading, setLoading] = useState(false);

  const loadBusStops = async () => {
    setLoading(true);
    try {
      const response = await getStops();
      setBusStops(response);
    } catch (error: any) {
      console.log('error loading', error);
    } finally {
      setLoading(false);
    }
  };

  const loadBusStopById = async (id:String) =>{
    try {
      const response = await getStopById(id);
      return response
    } catch (error: any) {
      console.log('error loading', error);
    }
  }

  useEffect(() => {
    loadBusStops();
  }, []);

  const addBusStop = async (data: BusStopRequest) => {
    try {
      const response = await addStop(data);
      console.log(response);
    } catch (error) {
      console.error('Failed to add');
    } finally {
      loadBusStops();
    }
  };

  const updateBusStop =async(data:BusStopRequest,id:String)=>{
    try {
      const response = await updateStop(data,id);
      console.log(response);
    } catch (error) {
      console.error('Failed to update');    
    }finally{
      loadBusStops()
    }
  }

  const deleteBusStop= async(id:String)=>{
    try {
      const response =await deleteStop(id);
      console.log(response);      
    } catch (error) {
      console.error('Failed to delete')
    }finally{
      loadBusStops();
    }
  }

  return {
    busStops,
    addBusStop,
    loading,
    refetch: loadBusStops,
    updateBusStop,
    deleteBusStop,
    loadBusStopById,
  };
};

export default useBusStops;
