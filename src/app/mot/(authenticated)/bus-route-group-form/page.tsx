'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Layout } from '@/components/shared/layout';
import {
  ArrowLeft,
  Save,
  AlertCircle,
  Plus,
  Trash2,
  MapPin,
} from 'lucide-react';
import { BusRouteGroupRequest } from '@/types/requestdto/bus-route-group';
import { BusRouteGroupResponse } from '@/types/responsedto/bus-route-group';
import { BusStopResponse } from '@/types/responsedto/bus-stop';
import { AddStopModal } from '@/components/mot/AddStopModal';
import { dummyRouteGroups, dummyBusStops } from '@/lib/data/route-groups-dummy';

interface RouteFormData {
  id: string;
  name: string;
  description: string;
  startStopId: string;
  endStopId: string;
  distanceKm: number;
  estimatedDurationMinutes: number;
  direction: string;
  routeStops: Array<{
    id: string;
    stopId: string;
    stopOrder: number;
    distanceFromStartKm: number;
  }>;
}

export default function BusRouteGroupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const routeGroupId = searchParams?.get('routeGroupId');
  const isEdit = !!routeGroupId;

  // Mock functions to replace the hook
  const loadBusRouteGroupbyId = async (id: string) => {
    const group = dummyRouteGroups.find((g) => g.id === id);
    return group;
  };

  const addBusRouteGroup = async (data: BusRouteGroupRequest) => {
    console.log('Adding route group:', data);
    // In a real app, this would call an API
    return { success: true };
  };

  const updateBusRouteGroup = async (
    data: BusRouteGroupRequest,
    id: string
  ) => {
    console.log('Updating route group:', data, 'with id:', id);
    // In a real app, this would call an API
    return { success: true };
  };

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'normal' as 'expressway' | 'normal',
    routeNumber: '',
    routes: [] as RouteFormData[],
  });

  const [availableStops, setAvailableStops] = useState<BusStopResponse[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stopsLoading, setStopsLoading] = useState(false);
  const [showAddStopModal, setShowAddStopModal] = useState(false);

  // Load stops data
  useEffect(() => {
    const loadStops = async () => {
      try {
        setStopsLoading(true);
        // Use dummy data instead of API call
        setAvailableStops(dummyBusStops);
      } catch (error) {
        console.error('Failed to load stops:', error);
      } finally {
        setStopsLoading(false);
      }
    };
    loadStops();
  }, []);

  // Load existing route group data for edit mode
  useEffect(() => {
    if (isEdit && routeGroupId) {
      const loadRouteGroup = async () => {
        try {
          setIsLoading(true);
          const data = await loadBusRouteGroupbyId(routeGroupId);
          if (data) {
            setFormData({
              name: String(data.name),
              description: String(data.description),
              category: (data.category || 'normal') as 'expressway' | 'normal',
              routeNumber: String(data.routeNumber || ''),
              routes: data.routes.map((route) => ({
                id: String(route.id),
                name: String(route.name),
                description: String(route.description),
                startStopId: String(route.startStopId),
                endStopId: String(route.endStopId),
                distanceKm: route.distanceKm,
                estimatedDurationMinutes: route.estimatedDurationMinutes,
                direction: String(route.direction),
                routeStops: route.routeStops.map((stop, index) => ({
                  id: `${String(stop.stopId)}-${index}`, // Generate a unique ID
                  stopId: String(stop.stopId),
                  stopOrder: stop.stopOrder,
                  distanceFromStartKm: stop.distanceFromStartKm,
                })),
              })),
            });
          }
        } catch (error) {
          console.error('Failed to load route group:', error);
        } finally {
          setIsLoading(false);
        }
      };
      loadRouteGroup();
    }
  }, [isEdit, routeGroupId, loadBusRouteGroupbyId]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear validation error when user starts typing
    if (touched[field] && errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  const handleFieldBlur = (field: string) => {
    setTouched((prev) => ({
      ...prev,
      [field]: true,
    }));
  };

  // Route management functions
  const addNewRoute = () => {
    const newRoute: RouteFormData = {
      id: `route-${Date.now()}`,
      name: '',
      description: '',
      startStopId: '',
      endStopId: '',
      distanceKm: 0,
      estimatedDurationMinutes: 0,
      direction: 'forward',
      routeStops: [],
    };

    setFormData((prev) => ({
      ...prev,
      routes: [...prev.routes, newRoute],
    }));
  };

  const removeRoute = (routeIndex: number) => {
    setFormData((prev) => ({
      ...prev,
      routes: prev.routes.filter((_, index) => index !== routeIndex),
    }));
  };

  const updateRoute = (
    routeIndex: number,
    field: keyof RouteFormData,
    value: any
  ) => {
    setFormData((prev) => ({
      ...prev,
      routes: prev.routes.map((route, index) =>
        index === routeIndex ? { ...route, [field]: value } : route
      ),
    }));
  };

  const addRouteStop = (routeIndex: number) => {
    const newStop = {
      id: `stop-${Date.now()}`,
      stopId: '',
      stopOrder: formData.routes[routeIndex].routeStops.length + 1,
      distanceFromStartKm: 0,
    };

    setFormData((prev) => ({
      ...prev,
      routes: prev.routes.map((route, index) =>
        index === routeIndex
          ? { ...route, routeStops: [...route.routeStops, newStop] }
          : route
      ),
    }));
  };

  const removeRouteStop = (routeIndex: number, stopIndex: number) => {
    setFormData((prev) => ({
      ...prev,
      routes: prev.routes.map((route, index) =>
        index === routeIndex
          ? {
              ...route,
              routeStops: route.routeStops
                .filter((_, sIndex) => sIndex !== stopIndex)
                .map((stop, sIndex) => ({ ...stop, stopOrder: sIndex + 1 })), // Reorder stops
            }
          : route
      ),
    }));
  };

  const updateRouteStop = (
    routeIndex: number,
    stopIndex: number,
    field: string,
    value: any
  ) => {
    setFormData((prev) => ({
      ...prev,
      routes: prev.routes.map((route, index) =>
        index === routeIndex
          ? {
              ...route,
              routeStops: route.routeStops.map((stop, sIndex) =>
                sIndex === stopIndex ? { ...stop, [field]: value } : stop
              ),
            }
          : route
      ),
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Route group name is required';
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Route group name must be at least 3 characters long';
    }

    // Category validation
    if (!formData.category) {
      newErrors.category = 'Route category is required';
    }

    // Route Number validation
    if (!formData.routeNumber.trim()) {
      newErrors.routeNumber = 'Route number is required';
    } else {
      const routeNumber = formData.routeNumber.trim();
      const expectedPrefix = formData.category === 'expressway' ? 'E' : 'N';
      const pattern = new RegExp(`^${expectedPrefix}\\d{3}$`);

      if (!pattern.test(routeNumber)) {
        newErrors.routeNumber = `Route number must follow format ${expectedPrefix}### (e.g., ${expectedPrefix}001)`;
      }
    }

    // Description validation
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.trim().length < 10) {
      newErrors.description = 'Description must be at least 10 characters long';
    }

    // Routes validation
    if (formData.routes.length === 0) {
      newErrors.routes = 'At least one route is required';
    } else {
      // Validate each route
      formData.routes.forEach((route, routeIndex) => {
        if (!route.name.trim()) {
          newErrors[`route_${routeIndex}_name`] = 'Route name is required';
        }
        if (!route.description.trim()) {
          newErrors[`route_${routeIndex}_description`] =
            'Route description is required';
        }
        if (!route.startStopId) {
          newErrors[`route_${routeIndex}_startStop`] = 'Start stop is required';
        }
        if (!route.endStopId) {
          newErrors[`route_${routeIndex}_endStop`] = 'End stop is required';
        }
        if (route.startStopId === route.endStopId) {
          newErrors[`route_${routeIndex}_endStop`] =
            'End stop must be different from start stop';
        }
        if (route.distanceKm <= 0) {
          newErrors[`route_${routeIndex}_distance`] =
            'Distance must be greater than 0';
        }
        if (route.estimatedDurationMinutes <= 0) {
          newErrors[`route_${routeIndex}_duration`] =
            'Duration must be greater than 0';
        }

        // Validate route stops
        route.routeStops.forEach((stop, stopIndex) => {
          if (!stop.stopId) {
            newErrors[`route_${routeIndex}_stop_${stopIndex}_id`] =
              'Stop selection is required';
          }
          if (stop.distanceFromStartKm < 0) {
            newErrors[`route_${routeIndex}_stop_${stopIndex}_distance`] =
              'Distance cannot be negative';
          }
        });
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    // Mark all fields as touched
    const touchedFields: Record<string, boolean> = {
      name: true,
      description: true,
      category: true,
      routeNumber: true,
    };

    // Mark all route fields as touched for validation
    formData.routes.forEach((route, routeIndex) => {
      touchedFields[`route_${routeIndex}_name`] = true;
      touchedFields[`route_${routeIndex}_description`] = true;
      touchedFields[`route_${routeIndex}_startStop`] = true;
      touchedFields[`route_${routeIndex}_endStop`] = true;
      touchedFields[`route_${routeIndex}_distance`] = true;
      touchedFields[`route_${routeIndex}_duration`] = true;

      route.routeStops.forEach((stop, stopIndex) => {
        touchedFields[`route_${routeIndex}_stop_${stopIndex}_id`] = true;
        touchedFields[`route_${routeIndex}_stop_${stopIndex}_distance`] = true;
      });
    });

    setTouched(touchedFields);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      // Convert form data to BusRouteGroupRequest format
      const requestData: BusRouteGroupRequest = {
        name: String(formData.name.trim()),
        description: String(formData.description.trim()),
        category: formData.category,
        routeNumber: String(formData.routeNumber.trim()),
        routes: formData.routes.map((route) => ({
          id: String(route.id),
          name: String(route.name.trim()),
          description: String(route.description.trim()),
          startStopId: String(route.startStopId),
          endStopId: String(route.endStopId),
          distanceKm: route.distanceKm,
          estimatedDurationMinutes: route.estimatedDurationMinutes,
          direction: route.direction,
          routeStops: route.routeStops.map((stop) => ({
            id: String(stop.id),
            stopId: String(stop.stopId),
            stopOrder: stop.stopOrder,
            distanceFromStartKm: stop.distanceFromStartKm,
          })),
        })) as any, // Using 'as any' to match the tuple type in the interface
      };

      if (isEdit && routeGroupId) {
        await updateBusRouteGroup(requestData, routeGroupId);
      } else {
        await addBusRouteGroup(requestData);
      }
      router.push('/mot/bus-route-groups');
    } catch (error) {
      console.error('Failed to save route group:', error);
      // You might want to show a toast notification here
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push('/mot/bus-route-groups');
  };

  const handleStopAdded = (newStop: BusStopResponse) => {
    setAvailableStops((prev) => [...prev, newStop]);
    setShowAddStopModal(false);
  };

  if (isLoading) {
    return (
      <Layout
        activeItem="bus-route-groups"
        pageTitle="Loading..."
        pageDescription="Loading route group information"
        role="mot"
      >
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading route group information...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      activeItem="bus-route-groups"
      pageTitle={isEdit ? 'Edit Route Group' : 'Add New Route Group'}
      pageDescription={
        isEdit
          ? 'Update route group information'
          : 'Create a new bus route group'
      }
      role="mot"
    >
      <div className="space-y-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <button
            className="text-blue-600 hover:text-blue-800 underline-offset-4 hover:underline p-0 h-auto"
            onClick={() => router.push('/mot/bus-route-groups')}
          >
            Route Groups Management
          </button>
          <span>/</span>
          <span>{isEdit ? 'Edit Route Group' : 'Add Route Group'}</span>
        </div>

        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={handleCancel}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {isEdit ? 'Edit Route Group' : 'Add New Route Group'}
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              {isEdit
                ? 'Update the route group information below'
                : 'Fill in the details to create a new route group'}
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Basic Information
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Enter the basic details for the route group
            </p>
          </div>

          <div className="px-6 py-6 space-y-6">
            {/* Route Group Name */}
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-sm font-medium text-gray-700"
              >
                Route Group Name *
              </label>
              <input
                id="name"
                type="text"
                placeholder="e.g., Intercity Routes, Urban Routes, Express Lines"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                onBlur={() => handleFieldBlur('name')}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  touched.name && errors.name
                    ? 'border-red-500'
                    : 'border-gray-300'
                }`}
              />
              {touched.name && errors.name && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.name}
                </p>
              )}
            </div>

            {/* Category and Route Number Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Route Category */}
              <div className="space-y-2">
                <label
                  htmlFor="category"
                  className="text-sm font-medium text-gray-700"
                >
                  Route Category *
                </label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) =>
                    handleInputChange('category', e.target.value)
                  }
                  onBlur={() => handleFieldBlur('category')}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    touched.category && errors.category
                      ? 'border-red-500'
                      : 'border-gray-300'
                  }`}
                >
                  <option value="normal">Normal Route</option>
                  <option value="expressway">Expressway Route</option>
                </select>
                {touched.category && errors.category && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.category}
                  </p>
                )}
                <p className="text-xs text-gray-500">
                  {formData.category === 'expressway'
                    ? 'High-speed routes with limited stops for faster travel'
                    : 'Standard routes with regular stops within city or urban areas'}
                </p>
              </div>

              {/* Route Number */}
              <div className="space-y-2">
                <label
                  htmlFor="routeNumber"
                  className="text-sm font-medium text-gray-700"
                >
                  Route Number *
                </label>
                <input
                  id="routeNumber"
                  type="text"
                  placeholder={
                    formData.category === 'expressway'
                      ? 'e.g., E001, E024'
                      : 'e.g., N138, N245'
                  }
                  value={formData.routeNumber}
                  onChange={(e) =>
                    handleInputChange(
                      'routeNumber',
                      e.target.value.toUpperCase()
                    )
                  }
                  onBlur={() => handleFieldBlur('routeNumber')}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    touched.routeNumber && errors.routeNumber
                      ? 'border-red-500'
                      : 'border-gray-300'
                  }`}
                />
                {touched.routeNumber && errors.routeNumber && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.routeNumber}
                  </p>
                )}
                <p className="text-xs text-gray-500">
                  {formData.category === 'expressway'
                    ? 'Use format: E + 3 digits (e.g., E001)'
                    : 'Use format: N + 3 digits (e.g., N138)'}
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label
                htmlFor="description"
                className="text-sm font-medium text-gray-700"
              >
                Description *
              </label>
              <textarea
                id="description"
                rows={4}
                placeholder="Provide a detailed description of this route group, including its purpose and the types of routes it contains..."
                value={formData.description}
                onChange={(e) =>
                  handleInputChange('description', e.target.value)
                }
                onBlur={() => handleFieldBlur('description')}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none ${
                  touched.description && errors.description
                    ? 'border-red-500'
                    : 'border-gray-300'
                }`}
              />
              {touched.description && errors.description && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.description}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Routes Management Section */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Routes</h2>
                <p className="text-sm text-gray-600 mt-1">
                  Manage routes within this group
                </p>
              </div>
              <button
                onClick={addNewRoute}
                className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                <Plus className="h-4 w-4" />
                Add Route
              </button>
            </div>
          </div>

          <div className="px-6 py-6">
            {formData.routes.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <MapPin className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p className="text-lg font-medium mb-2">No routes added yet</p>
                <p className="text-sm">
                  Click "Add Route" to create your first route in this group.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {formData.routes.map((route, routeIndex) => (
                  <div
                    key={route.id}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        Route {routeIndex + 1}
                      </h3>
                      <button
                        onClick={() => removeRoute(routeIndex)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Remove Route"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      {/* Route Name */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                          Route Name *
                        </label>
                        <input
                          type="text"
                          placeholder="e.g., Route A, Express Line 1"
                          value={route.name}
                          onChange={(e) =>
                            updateRoute(routeIndex, 'name', e.target.value)
                          }
                          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                            errors[`route_${routeIndex}_name`]
                              ? 'border-red-500'
                              : 'border-gray-300'
                          }`}
                        />
                        {errors[`route_${routeIndex}_name`] && (
                          <p className="text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle className="h-4 w-4" />
                            {errors[`route_${routeIndex}_name`]}
                          </p>
                        )}
                      </div>

                      {/* Direction */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                          Direction
                        </label>
                        <select
                          value={route.direction}
                          onChange={(e) =>
                            updateRoute(routeIndex, 'direction', e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="forward">Forward</option>
                          <option value="backward">Backward</option>
                        </select>
                      </div>
                    </div>

                    {/* Route Description */}
                    <div className="space-y-2 mb-4">
                      <label className="text-sm font-medium text-gray-700">
                        Route Description *
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Describe this route's purpose and key characteristics..."
                        value={route.description}
                        onChange={(e) =>
                          updateRoute(routeIndex, 'description', e.target.value)
                        }
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none ${
                          errors[`route_${routeIndex}_description`]
                            ? 'border-red-500'
                            : 'border-gray-300'
                        }`}
                      />
                      {errors[`route_${routeIndex}_description`] && (
                        <p className="text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="h-4 w-4" />
                          {errors[`route_${routeIndex}_description`]}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                      {/* Start Stop */}{' '}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-medium text-gray-700">
                            Start Stop *
                          </label>
                          <button
                            type="button"
                            onClick={() => setShowAddStopModal(true)}
                            className="text-xs text-blue-600 hover:text-blue-800 underline"
                          >
                            + Add New Stop
                          </button>
                        </div>
                        <select
                          value={route.startStopId}
                          onChange={(e) =>
                            updateRoute(
                              routeIndex,
                              'startStopId',
                              e.target.value
                            )
                          }
                          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                            errors[`route_${routeIndex}_startStop`]
                              ? 'border-red-500'
                              : 'border-gray-300'
                          }`}
                          disabled={stopsLoading}
                        >
                          <option value="">Select start stop</option>
                          {availableStops.map((stop) => (
                            <option key={stop.id} value={stop.id}>
                              {stop.name} - {stop.location.city}
                            </option>
                          ))}
                        </select>
                        {errors[`route_${routeIndex}_startStop`] && (
                          <p className="text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle className="h-4 w-4" />
                            {errors[`route_${routeIndex}_startStop`]}
                          </p>
                        )}
                      </div>
                      {/* End Stop */}{' '}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-medium text-gray-700">
                            End Stop *
                          </label>
                          <button
                            type="button"
                            onClick={() => setShowAddStopModal(true)}
                            className="text-xs text-blue-600 hover:text-blue-800 underline"
                          >
                            + Add New Stop
                          </button>
                        </div>
                        <select
                          value={route.endStopId}
                          onChange={(e) =>
                            updateRoute(routeIndex, 'endStopId', e.target.value)
                          }
                          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                            errors[`route_${routeIndex}_endStop`]
                              ? 'border-red-500'
                              : 'border-gray-300'
                          }`}
                          disabled={stopsLoading}
                        >
                          <option value="">Select end stop</option>
                          {availableStops.map((stop) => (
                            <option key={stop.id} value={stop.id}>
                              {stop.name} - {stop.location.city}
                            </option>
                          ))}
                        </select>
                        {errors[`route_${routeIndex}_endStop`] && (
                          <p className="text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle className="h-4 w-4" />
                            {errors[`route_${routeIndex}_endStop`]}
                          </p>
                        )}
                      </div>
                      {/* Distance */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                          Distance (km) *
                        </label>
                        <input
                          type="number"
                          min="0"
                          step="0.1"
                          placeholder="0.0"
                          value={route.distanceKm || ''}
                          onChange={(e) =>
                            updateRoute(
                              routeIndex,
                              'distanceKm',
                              parseFloat(e.target.value) || 0
                            )
                          }
                          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                            errors[`route_${routeIndex}_distance`]
                              ? 'border-red-500'
                              : 'border-gray-300'
                          }`}
                        />
                        {errors[`route_${routeIndex}_distance`] && (
                          <p className="text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle className="h-4 w-4" />
                            {errors[`route_${routeIndex}_distance`]}
                          </p>
                        )}
                      </div>
                      {/* Duration */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                          Duration (minutes) *
                        </label>
                        <input
                          type="number"
                          min="0"
                          placeholder="0"
                          value={route.estimatedDurationMinutes || ''}
                          onChange={(e) =>
                            updateRoute(
                              routeIndex,
                              'estimatedDurationMinutes',
                              parseInt(e.target.value) || 0
                            )
                          }
                          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                            errors[`route_${routeIndex}_duration`]
                              ? 'border-red-500'
                              : 'border-gray-300'
                          }`}
                        />
                        {errors[`route_${routeIndex}_duration`] && (
                          <p className="text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle className="h-4 w-4" />
                            {errors[`route_${routeIndex}_duration`]}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Intermediate Stops */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-gray-700">
                          Intermediate Stops ({route.routeStops.length})
                        </label>
                        <button
                          onClick={() => addRouteStop(routeIndex)}
                          className="flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors text-sm"
                        >
                          <Plus className="h-3 w-3" />
                          Add Stop
                        </button>
                      </div>

                      {route.routeStops.length === 0 ? (
                        <div className="text-center py-4 text-gray-500 border border-gray-200 rounded-md">
                          <p className="text-sm">No intermediate stops added</p>
                        </div>
                      ) : (
                        <div className="space-y-3 border border-gray-200 rounded-md p-3">
                          {route.routeStops.map((stop, stopIndex) => (
                            <div
                              key={stop.id}
                              className="flex items-center gap-3 p-3 bg-gray-50 rounded-md"
                            >
                              <div className="flex-shrink-0">
                                <span className="text-sm font-medium text-gray-600">
                                  #{stop.stopOrder}
                                </span>
                              </div>

                              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div>
                                  <div className="flex items-center justify-between mb-1">
                                    <span className="text-xs font-medium text-gray-600">
                                      Select Stop
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() => setShowAddStopModal(true)}
                                      className="text-xs text-blue-600 hover:text-blue-800 underline"
                                    >
                                      + Add New
                                    </button>
                                  </div>
                                  <select
                                    value={stop.stopId}
                                    onChange={(e) =>
                                      updateRouteStop(
                                        routeIndex,
                                        stopIndex,
                                        'stopId',
                                        e.target.value
                                      )
                                    }
                                    className={`w-full px-2 py-1 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${
                                      errors[
                                        `route_${routeIndex}_stop_${stopIndex}_id`
                                      ]
                                        ? 'border-red-500'
                                        : 'border-gray-300'
                                    }`}
                                    disabled={stopsLoading}
                                  >
                                    <option value="">Select stop</option>
                                    {availableStops.map((availableStop) => (
                                      <option
                                        key={availableStop.id}
                                        value={availableStop.id}
                                      >
                                        {availableStop.name} -{' '}
                                        {availableStop.location.city}
                                      </option>
                                    ))}
                                  </select>
                                  {errors[
                                    `route_${routeIndex}_stop_${stopIndex}_id`
                                  ] && (
                                    <p className="text-xs text-red-600 mt-1">
                                      {
                                        errors[
                                          `route_${routeIndex}_stop_${stopIndex}_id`
                                        ]
                                      }
                                    </p>
                                  )}
                                </div>

                                <div>
                                  <input
                                    type="number"
                                    min="0"
                                    step="0.1"
                                    placeholder="Distance from start (km)"
                                    value={stop.distanceFromStartKm || ''}
                                    onChange={(e) =>
                                      updateRouteStop(
                                        routeIndex,
                                        stopIndex,
                                        'distanceFromStartKm',
                                        parseFloat(e.target.value) || 0
                                      )
                                    }
                                    className={`w-full px-2 py-1 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${
                                      errors[
                                        `route_${routeIndex}_stop_${stopIndex}_distance`
                                      ]
                                        ? 'border-red-500'
                                        : 'border-gray-300'
                                    }`}
                                  />
                                  {errors[
                                    `route_${routeIndex}_stop_${stopIndex}_distance`
                                  ] && (
                                    <p className="text-xs text-red-600 mt-1">
                                      {
                                        errors[
                                          `route_${routeIndex}_stop_${stopIndex}_distance`
                                        ]
                                      }
                                    </p>
                                  )}
                                </div>
                              </div>

                              <button
                                onClick={() =>
                                  removeRouteStop(routeIndex, stopIndex)
                                }
                                className="flex-shrink-0 p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                                title="Remove Stop"
                              >
                                <Trash2 className="h-3 w-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Error for routes validation */}
            {errors.routes && (
              <div className="rounded-md bg-red-50 p-4 mt-4">
                <div className="flex">
                  <AlertCircle className="h-5 w-5 text-red-400" />
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                      Route Validation Error
                    </h3>
                    <div className="mt-2 text-sm text-red-700">
                      <p>{errors.routes}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200">
          <button
            onClick={handleCancel}
            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="h-4 w-4" />
            {isSubmitting
              ? 'Saving...'
              : isEdit
              ? 'Update Route Group'
              : 'Create Route Group'}
          </button>
        </div>
      </div>

      {/* Add Stop Modal */}
      <AddStopModal
        isOpen={showAddStopModal}
        onClose={() => setShowAddStopModal(false)}
        onStopAdded={handleStopAdded}
      />
    </Layout>
  );
}
