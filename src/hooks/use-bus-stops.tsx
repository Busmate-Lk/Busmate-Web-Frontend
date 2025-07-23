import { addStop, getStops } from '@/lib/api/route-management/stops';
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

  return { busStops, addBusStop, loading, refetch: loadBusStops };
};

export default useBusStops;
