'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ChevronRight, 
  Save, 
  Rocket, 
  X, 
  Plus, 
  MapPin, 
  Timer, 
  GripVertical,
  Search,
  Copy,
  Map as MapIcon,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { Layout } from '@/components/shared/layout';
import { 
  RouteManagementService, 
  BusStopManagementService,
  type RouteGroupRequest,
  type RouteRequest,
  type StopRequest,
  type StopResponse 
} from '@/lib/api-client/route-management';

interface RouteStop {
  stopId: string;
  stopName: string;
  stopOrder: number;
  distanceFromStartKm: number;
  location?: {
    latitude: number;
    longitude: number;
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

interface RouteFormData {
  name: string;
  description: string;
  direction: 'OUTBOUND' | 'INBOUND';
  startStopId: string;
  startStopName: string;
  endStopId: string;
  endStopName: string;
  distanceKm: number;
  estimatedDurationMinutes: number;
  routeStops: RouteStop[];
}

interface RouteGroupFormData {
  name: string;
  description: string;
  outboundRoute: RouteFormData;
  inboundRoute: RouteFormData;
}

export default function AddNewRouteGroupPage() {
  const router = useRouter();
  
  // State
  const [activeTab, setActiveTab] = useState<'outbound' | 'inbound'>('outbound');
  const [isLoading, setIsLoading] = useState(false);
  const [isSavingDraft, setIsSavingDraft] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  
  // Available stops for search
  const [availableStops, setAvailableStops] = useState<StopResponse[]>([]);
  const [stopSearchTerm, setStopSearchTerm] = useState('');
  const [isStopSearchOpen, setIsStopSearchOpen] = useState(false);
  const [stopSearchField, setStopSearchField] = useState<'start' | 'end' | 'intermediate' | null>(null);

  // Form data
  const [formData, setFormData] = useState<RouteGroupFormData>({
    name: '',
    description: '',
    outboundRoute: {
      name: '',
      description: '',
      direction: 'OUTBOUND',
      startStopId: '',
      startStopName: '',
      endStopId: '',
      endStopName: '',
      distanceKm: 0,
      estimatedDurationMinutes: 0,
      routeStops: []
    },
    inboundRoute: {
      name: '',
      description: '',
      direction: 'INBOUND',
      startStopId: '',
      startStopName: '',
      endStopId: '',
      endStopName: '',
      distanceKm: 0,
      estimatedDurationMinutes: 0,
      routeStops: []
    }
  });

  // 🔌 API INTEGRATION POINT 1: Load Available Stops
  const loadAvailableStops = useCallback(async () => {
    try {
      // TODO: Replace with actual API call when stops search endpoint is available
      const stops = await BusStopManagementService.getAllStopsAsList();
      setAvailableStops(stops);
    } catch (error) {
      console.error('Error loading stops:', error);
    }
  }, []);

  useEffect(() => {
    loadAvailableStops();
  }, [loadAvailableStops]);

  // Auto-fill route names when group name changes
  useEffect(() => {
    if (formData.name) {
      setFormData(prev => ({
        ...prev,
        outboundRoute: {
          ...prev.outboundRoute,
          name: `${formData.name}-Outbound`
        },
        inboundRoute: {
          ...prev.inboundRoute,
          name: `${formData.name}-Inbound`
        }
      }));
    }
  }, [formData.name]);

  // Filter stops based on search term
  const filteredStops = availableStops.filter(stop =>
    stop.name?.toLowerCase().includes(stopSearchTerm.toLowerCase()) ||
    stop.location?.city?.toLowerCase().includes(stopSearchTerm.toLowerCase()) ||
    stop.location?.state?.toLowerCase().includes(stopSearchTerm.toLowerCase())
  );

  // Validation
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) {
      errors.groupName = 'Group name is required';
    }

    // Validate outbound route
    if (!formData.outboundRoute.startStopId) {
      errors.outboundStart = 'Start stop is required';
    }
    if (!formData.outboundRoute.endStopId) {
      errors.outboundEnd = 'End stop is required';
    }
    if (formData.outboundRoute.startStopId === formData.outboundRoute.endStopId) {
      errors.outboundStops = 'Start and end stops must be different';
    }

    // Validate inbound route
    if (!formData.inboundRoute.startStopId) {
      errors.inboundStart = 'Start stop is required';
    }
    if (!formData.inboundRoute.endStopId) {
      errors.inboundEnd = 'End stop is required';
    }
    if (formData.inboundRoute.startStopId === formData.inboundRoute.endStopId) {
      errors.inboundStops = 'Start and end stops must be different';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handlers
  const handleGroupInfoChange = (field: keyof Pick<RouteGroupFormData, 'name' | 'description'>, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear validation error when user starts typing
    if (validationErrors[field === 'name' ? 'groupName' : field]) {
      setValidationErrors(prev => ({
        ...prev,
        [field === 'name' ? 'groupName' : field]: ''
      }));
    }
  };

  const handleRouteChange = (
    route: 'outboundRoute' | 'inboundRoute',
    field: keyof RouteFormData,
    value: any
  ) => {
    setFormData(prev => ({
      ...prev,
      [route]: {
        ...prev[route],
        [field]: value
      }
    }));
  };

  const handleStopSelect = (stop: StopResponse) => {
    const currentRoute = activeTab === 'outbound' ? 'outboundRoute' : 'inboundRoute';
    
    if (stopSearchField === 'start') {
      handleRouteChange(currentRoute, 'startStopId', stop.id || '');
      handleRouteChange(currentRoute, 'startStopName', stop.name || '');
    } else if (stopSearchField === 'end') {
      handleRouteChange(currentRoute, 'endStopId', stop.id || '');
      handleRouteChange(currentRoute, 'endStopName', stop.name || '');
    } else if (stopSearchField === 'intermediate') {
      // Add intermediate stop
      const newStop: RouteStop = {
        stopId: stop.id || '',
        stopName: stop.name || '',
        stopOrder: formData[currentRoute].routeStops.length + 1,
        distanceFromStartKm: 0,
        location: stop.location
          ? {
              latitude: stop.location.latitude ?? 0,
              longitude: stop.location.longitude ?? 0,
              address: stop.location.address ?? '',
              city: stop.location.city ?? '',
              state: stop.location.state ?? '',
              zipCode: stop.location.zipCode ?? ''
            }
          : undefined
      };
      
      handleRouteChange(currentRoute, 'routeStops', [
        ...formData[currentRoute].routeStops,
        newStop
      ]);
    }
    
    setIsStopSearchOpen(false);
    setStopSearchField(null);
    setStopSearchTerm('');
  };

  const handleRemoveIntermediateStop = (stopIndex: number) => {
    const currentRoute = activeTab === 'outbound' ? 'outboundRoute' : 'inboundRoute';
    const updatedStops = formData[currentRoute].routeStops.filter((_, index) => index !== stopIndex);
    
    // Recalculate stop orders
    const reorderedStops = updatedStops.map((stop, index) => ({
      ...stop,
      stopOrder: index + 1
    }));
    
    handleRouteChange(currentRoute, 'routeStops', reorderedStops);
  };

  // 🔌 API INTEGRATION POINT 2: Auto-generate inbound from outbound
  const handleAutoGenerateInbound = () => {
    const outbound = formData.outboundRoute;
    
    setFormData(prev => ({
      ...prev,
      inboundRoute: {
        ...prev.inboundRoute,
        name: `${formData.name}-Inbound`,
        description: `Auto-generated reverse route of ${outbound.name}`,
        startStopId: outbound.endStopId,
        startStopName: outbound.endStopName,
        endStopId: outbound.startStopId,
        endStopName: outbound.startStopName,
        distanceKm: outbound.distanceKm,
        estimatedDurationMinutes: outbound.estimatedDurationMinutes,
        routeStops: [...outbound.routeStops].reverse().map((stop, index) => ({
          ...stop,
          stopOrder: index + 1,
          distanceFromStartKm: outbound.distanceKm - stop.distanceFromStartKm
        }))
      }
    }));
  };

  // 🔌 API INTEGRATION POINT 3: Save Draft
  const handleSaveDraft = async () => {
    try {
      setIsSavingDraft(true);
      
      // TODO: Implement draft save functionality
      // This could save to localStorage or a draft API endpoint
      const draftData = {
        ...formData,
        lastSaved: new Date().toISOString(),
        isDraft: true
      };
      
      localStorage.setItem('routeGroupDraft', JSON.stringify(draftData));
      
      // Show success message
      setError('Draft saved successfully!');
      setTimeout(() => setError(null), 3000);
      
    } catch (error) {
      console.error('Error saving draft:', error);
      setError('Failed to save draft. Please try again.');
    } finally {
      setIsSavingDraft(false);
    }
  };

  // 🔌 API INTEGRATION POINT 4: Create Route Group
  const handleCreateRouteGroup = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      // Prepare route group data for API
      const routeGroupRequest: RouteGroupRequest = {
        name: formData.name,
        description: formData.description,
        routes: [
          // Outbound route
          {
            name: formData.outboundRoute.name,
            description: formData.outboundRoute.description,
            direction: formData.outboundRoute.direction,
            startStopId: formData.outboundRoute.startStopId,
            endStopId: formData.outboundRoute.endStopId,
            distanceKm: formData.outboundRoute.distanceKm,
            estimatedDurationMinutes: formData.outboundRoute.estimatedDurationMinutes,
            routeStops: formData.outboundRoute.routeStops.map(stop => ({
              stopId: stop.stopId,
              stopOrder: stop.stopOrder,
              distanceFromStartKm: stop.distanceFromStartKm
            }))
          },
          // Inbound route
          {
            name: formData.inboundRoute.name,
            description: formData.inboundRoute.description,
            direction: formData.inboundRoute.direction,
            startStopId: formData.inboundRoute.startStopId,
            endStopId: formData.inboundRoute.endStopId,
            distanceKm: formData.inboundRoute.distanceKm,
            estimatedDurationMinutes: formData.inboundRoute.estimatedDurationMinutes,
            routeStops: formData.inboundRoute.routeStops.map(stop => ({
              stopId: stop.stopId,
              stopOrder: stop.stopOrder,
              distanceFromStartKm: stop.distanceFromStartKm
            }))
          }
        ]
      };

      // TODO: Replace with actual API call
      const createdRouteGroup = await RouteManagementService.createRouteGroup(routeGroupRequest);
      
      // Clear draft from localStorage on successful creation
      localStorage.removeItem('routeGroupDraft');
      
      // Redirect to the created route group details page
      router.push(`/mot/routes/${createdRouteGroup.id}`);
      
    } catch (error) {
      console.error('Error creating route group:', error);
      setError('Failed to create route group. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    // Clear any draft
    localStorage.removeItem('routeGroupDraft');
    router.push('/mot/routes');
  };

  // Load draft on component mount
  useEffect(() => {
    const savedDraft = localStorage.getItem('routeGroupDraft');
    if (savedDraft) {
      try {
        const draftData = JSON.parse(savedDraft);
        setFormData(draftData);
      } catch (error) {
        console.error('Error loading draft:', error);
      }
    }
  }, []);

  const getCurrentRoute = () => {
    return activeTab === 'outbound' ? formData.outboundRoute : formData.inboundRoute;
  };

  const getCurrentRouteKey = () => {
    return activeTab === 'outbound' ? 'outboundRoute' : 'inboundRoute';
  };

  return (
    <Layout
      activeItem="routes"
      pageTitle="Add New Route Group"
      pageDescription="Create a new route group with outbound and inbound routes"
      role="mot"
    >
      <div className="space-y-6">
        {/* 1. Header Section - Breadcrumbs + Actions */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Breadcrumbs */}
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <button 
              onClick={() => router.push('/mot')}
              className="hover:text-blue-600 transition-colors"
            >
              Home
            </button>
            <ChevronRight className="w-4 h-4" />
            <button 
              onClick={() => router.push('/mot/routes')}
              className="hover:text-blue-600 transition-colors"
            >
              Route Management
            </button>
            <ChevronRight className="w-4 h-4" />
            <button 
              onClick={() => router.push('/mot/routes')}
              className="hover:text-blue-600 transition-colors"
            >
              Route Groups
            </button>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">Add New Route Group</span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleSaveDraft}
              disabled={isSavingDraft || isLoading}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSavingDraft ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              Save Draft
            </button>
            <button
              onClick={handleCreateRouteGroup}
              disabled={isLoading || isSavingDraft}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Rocket className="w-4 h-4" />
              )}
              Create Route Group
            </button>
            <button
              onClick={handleCancel}
              disabled={isLoading || isSavingDraft}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className={`border rounded-lg p-4 ${
            error.includes('successfully') 
              ? 'bg-green-50 border-green-200 text-green-700' 
              : 'bg-red-50 border-red-200 text-red-700'
          }`}>
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm">{error}</span>
              <button
                onClick={() => setError(null)}
                className="ml-auto hover:opacity-70"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* 2. Route Group Info Section */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Route Group Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Group Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleGroupInfoChange('name', e.target.value)}
                placeholder="e.g., Colombo-Kandy Express"
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  validationErrors.groupName ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {validationErrors.groupName && (
                <p className="text-red-600 text-xs mt-1">{validationErrors.groupName}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleGroupInfoChange('description', e.target.value)}
                placeholder="Brief description of this route group..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* 3. Routes Section - Tabbed Interface */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          {/* Tab Headers */}
          <div className="border-b border-gray-200">
            <div className="flex gap-1 p-1">
              <button
                onClick={() => setActiveTab('outbound')}
                className={`px-4 py-3 text-sm font-medium rounded-lg transition-colors flex items-center gap-2 ${
                  activeTab === 'outbound'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <MapPin className="w-4 h-4" />
                Outbound Route
                {formData.outboundRoute.startStopName && formData.outboundRoute.endStopName && (
                  <span className="text-xs text-gray-500">
                    {formData.outboundRoute.startStopName} → {formData.outboundRoute.endStopName}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab('inbound')}
                className={`px-4 py-3 text-sm font-medium rounded-lg transition-colors flex items-center gap-2 ${
                  activeTab === 'inbound'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <MapPin className="w-4 h-4" />
                Inbound Route
                {formData.inboundRoute.startStopName && formData.inboundRoute.endStopName && (
                  <span className="text-xs text-gray-500">
                    {formData.inboundRoute.startStopName} → {formData.inboundRoute.endStopName}
                  </span>
                )}
              </button>
              {activeTab === 'inbound' && formData.outboundRoute.startStopId && (
                <button
                  onClick={handleAutoGenerateInbound}
                  className="ml-auto px-3 py-2 text-xs bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors flex items-center gap-1"
                >
                  <Copy className="w-3 h-3" />
                  Auto-generate from Outbound
                </button>
              )}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            <div className="space-y-6">
              {/* Route Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Route Name
                  </label>
                  <input
                    type="text"
                    value={getCurrentRoute().name}
                    onChange={(e) => handleRouteChange(getCurrentRouteKey(), 'name', e.target.value)}
                    placeholder={`${formData.name}-${activeTab === 'outbound' ? 'Outbound' : 'Inbound'}`}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Direction
                  </label>
                  <input
                    type="text"
                    value={getCurrentRoute().direction}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Route Description
                </label>
                <textarea
                  value={getCurrentRoute().description}
                  onChange={(e) => handleRouteChange(getCurrentRouteKey(), 'description', e.target.value)}
                  placeholder="Description for this route..."
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Start and End Stops */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Stop *
                  </label>
                  <div className="relative">
                    <button
                      onClick={() => {
                        setStopSearchField('start');
                        setIsStopSearchOpen(true);
                      }}
                      className={`w-full px-3 py-2 border rounded-lg text-left focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        validationErrors[`${activeTab}Start`] ? 'border-red-300' : 'border-gray-300'
                      }`}
                    >
                      {getCurrentRoute().startStopName || 'Select start stop...'}
                    </button>
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  </div>
                  {validationErrors[`${activeTab}Start`] && (
                    <p className="text-red-600 text-xs mt-1">{validationErrors[`${activeTab}Start`]}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Stop *
                  </label>
                  <div className="relative">
                    <button
                      onClick={() => {
                        setStopSearchField('end');
                        setIsStopSearchOpen(true);
                      }}
                      className={`w-full px-3 py-2 border rounded-lg text-left focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        validationErrors[`${activeTab}End`] ? 'border-red-300' : 'border-gray-300'
                      }`}
                    >
                      {getCurrentRoute().endStopName || 'Select end stop...'}
                    </button>
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  </div>
                  {validationErrors[`${activeTab}End`] && (
                    <p className="text-red-600 text-xs mt-1">{validationErrors[`${activeTab}End`]}</p>
                  )}
                </div>
              </div>

              {/* Distance and Duration */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Distance (km)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    value={getCurrentRoute().distanceKm}
                    onChange={(e) => handleRouteChange(getCurrentRouteKey(), 'distanceKm', parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Timer className="w-4 h-4" />
                    Estimated Duration (minutes)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={getCurrentRoute().estimatedDurationMinutes}
                    onChange={(e) => handleRouteChange(getCurrentRouteKey(), 'estimatedDurationMinutes', parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Intermediate Stops */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Intermediate Stops
                  </label>
                  <button
                    onClick={() => {
                      setStopSearchField('intermediate');
                      setIsStopSearchOpen(true);
                    }}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add Stop
                  </button>
                </div>

                <div className="space-y-2">
                  {getCurrentRoute().routeStops.map((stop, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                      <GripVertical className="w-4 h-4 text-gray-400 cursor-move" />
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{stop.stopName}</div>
                        <div className="text-sm text-gray-500">Stop #{stop.stopOrder}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          step="0.1"
                          min="0"
                          value={stop.distanceFromStartKm}
                          onChange={(e) => {
                            const updatedStops = [...getCurrentRoute().routeStops];
                            updatedStops[index] = {
                              ...updatedStops[index],
                              distanceFromStartKm: parseFloat(e.target.value) || 0
                            };
                            handleRouteChange(getCurrentRouteKey(), 'routeStops', updatedStops);
                          }}
                          className="w-20 px-2 py-1 text-sm border border-gray-300 rounded"
                        />
                        <span className="text-xs text-gray-500">km</span>
                      </div>
                      <button
                        onClick={() => handleRemoveIntermediateStop(index)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  
                  {getCurrentRoute().routeStops.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <MapPin className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No intermediate stops added yet</p>
                      <p className="text-xs">Click "Add Stop" to include stops along the route</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Live Preview / Map Integration - TODO */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <MapIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Live Map Preview</h3>
            <p className="text-gray-600 mb-4">
              🔌 <strong>API Integration Point:</strong> Interactive map component will be implemented here
            </p>
            <div className="text-sm text-gray-500 space-y-1">
              <p>• Google Maps, Leaflet, or Mapbox integration</p>
              <p>• Real-time route visualization</p>
              <p>• Drag-and-drop stop reordering</p>
              <p>• Distance and duration calculation</p>
            </div>
          </div>
        </div>

        {/* Stop Search Modal */}
        {isStopSearchOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full max-w-md mx-4 max-h-96 overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Select Stop</h3>
                  <button
                    onClick={() => setIsStopSearchOpen(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="mt-3 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search stops..."
                    value={stopSearchTerm}
                    onChange={(e) => setStopSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    autoFocus
                  />
                </div>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {filteredStops.length === 0 ? (
                  <div className="p-4 text-center text-gray-500">
                    <p>No stops found</p>
                    <p className="text-xs mt-1">Try a different search term</p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-200">
                    {filteredStops.map((stop) => (
                      <button
                        key={stop.id}
                        onClick={() => handleStopSelect(stop)}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                      >
                        <div className="font-medium text-gray-900">{stop.name}</div>
                        <div className="text-sm text-gray-500">
                          {stop.location?.city}, {stop.location?.state}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}