'use client';

import { useState, useMemo } from 'react';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import BusStopStats from '@/components/mot/bus-stops/BusStopStats';
import BusStopFilters from '@/components/mot/bus-stops/BusStopFilters';
import BusStopTable from '@/components/mot/bus-stops/BusStopTable';
import { Layout } from '@/components/shared/layout';
import useBusStops from '@/hooks/use-bus-stops';

export default function BusStops() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [cityFilter, setCityFilter] = useState('all');
  const [stateFilter, setStateFilter] = useState('all');
  const [accessibilityFilter, setAccessibilityFilter] = useState('all');

  const { busStops, addBusStop, loading } = useBusStops();

  const filteredBusStops = useMemo(() => {
    if (!busStops) return [];

    return busStops.filter((stop) => {
      const matchesSearch =
        stop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stop.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stop.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stop.location.address.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCity =
        cityFilter === 'all' || stop.location.city === cityFilter;
      const matchesState =
        stateFilter === 'all' || stop.location.state === stateFilter;

      const matchesAccessibility =
        accessibilityFilter === 'all' ||
        (accessibilityFilter === 'accessible' && stop.isAccessible) ||
        (accessibilityFilter === 'non-accessible' && !stop.isAccessible);

      return (
        matchesSearch && matchesCity && matchesState && matchesAccessibility
      );
    });
  }, [busStops, searchTerm, cityFilter, stateFilter, accessibilityFilter]);

  if (loading) {
    return (
      <Layout
        activeItem="bus-stops"
        pageTitle="Bus Stops Management"
        pageDescription="Manage and monitor bus stop locations and facilities"
        role="mot"
      >
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      activeItem="bus-stops"
      pageTitle="Bus Stops Management"
      pageDescription="Manage and monitor bus stop locations and facilities"
      role="mot"
    >
      <div className="space-y-6">
        <BusStopStats busStops={filteredBusStops} />

        {/* Filters and Add Button */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <BusStopFilters
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              cityFilter={cityFilter}
              setCityFilter={setCityFilter}
              stateFilter={stateFilter}
              setStateFilter={setStateFilter}
              accessibilityFilter={accessibilityFilter}
              setAccessibilityFilter={setAccessibilityFilter}
              busStops={busStops || []}
            />
          </div>
          <button
            onClick={() => router.push('/mot/bus-stop-form')}
            className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 whitespace-nowrap"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Bus Stop
          </button>
        </div>

        <BusStopTable busStops={filteredBusStops} />
      </div>
    </Layout>
  );
}
