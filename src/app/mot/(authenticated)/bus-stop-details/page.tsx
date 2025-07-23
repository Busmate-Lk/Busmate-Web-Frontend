'use client';

import { ArrowLeft, Edit } from 'lucide-react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Layout } from '@/components/shared/layout';
import BusStopInfoCard from '@/components/mot/bus-stop-details/BusStopInfoCard';
import BusStopMapCard from '@/components/mot/bus-stop-details/BusStopMapCard';
import useBusStops from '@/hooks/use-bus-stops';
import { useEffect, useState } from 'react';
import { BusStopResponse } from '@/types/responsedto/bus-stop';

export default function ViewBusStop() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const busStopId = searchParams.get('id');
  const { loadBusStopById } = useBusStops();
  const [busStop, setBusStop] = useState<BusStopResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBusStop = async () => {
      if (!busStopId) {
        setError('No bus stop ID provided');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await loadBusStopById(busStopId);
        if (data) {
          setBusStop(data);
        } else {
          setError('Bus stop not found');
        }
      } catch (err) {
        setError('Failed to load bus stop details');
        console.error('Error loading bus stop:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBusStop();
  }, [busStopId]);

  if (loading) {
    return (
      <Layout
        activeItem="bus-stops"
        pageTitle="Bus Stop Details"
        pageDescription="View and manage bus stop information"
        role="mot"
      >
        <div className="space-y-6">
          <button
            className="flex items-center border px-4 py-2 rounded text-gray-700 hover:bg-gray-100"
            onClick={() => router.push('/mot/bus-stops')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Stop List
          </button>
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !busStop) {
    return (
      <Layout
        activeItem="bus-stops"
        pageTitle="Bus Stop Details"
        pageDescription="View and manage bus stop information"
        role="mot"
      >
        <div className="space-y-6">
          <button
            className="flex items-center border px-4 py-2 rounded text-gray-700 hover:bg-gray-100"
            onClick={() => router.push('/mot/bus-stops')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Stop List
          </button>
          <div className="text-red-600 font-semibold">
            {error || 'Bus stop not found.'}
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      activeItem="bus-stops"
      pageTitle="Bus Stop Details"
      pageDescription="View and manage bus stop information"
      role="mot"
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Bus Stop Details
            </h2>
            <p className="text-gray-600 mt-1">
              View and manage bus stop information
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              className="flex items-center border px-4 py-2 rounded text-gray-700 hover:bg-gray-100"
              onClick={() => router.push('/mot/bus-stops')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Stop List
            </button>
            <button
              className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              onClick={() => router.push(`/mot/bus-stop-form?id=${busStop.id}`)}
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Stop
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BusStopInfoCard
            busStop={busStop}
            onEdit={() => router.push(`/mot/bus-stop-form?id=${busStop.id}`)}
          />
          <BusStopMapCard busStop={busStop} />
        </div>
      </div>
    </Layout>
  );
}
