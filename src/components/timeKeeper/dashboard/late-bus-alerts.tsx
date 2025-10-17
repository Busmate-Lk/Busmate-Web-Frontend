'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  AlertTriangle,
  Clock,
  MapPin,
  Bus,
  Volume2,
  VolumeX,
} from 'lucide-react';

interface LateBus {
  id: string;
  busNo: string;
  route: string;
  scheduledDeparture: string;
  currentDelay: number; // in minutes
  status: 'Late' | 'Very Late' | 'Critical';
  lastLocation?: string;
  priority: 'low' | 'medium' | 'high';
}

export function LateBusAlerts() {
  const router = useRouter();
  const [lateBuses, setLateBuses] = useState<LateBus[]>([]);
  const [isVisible, setIsVisible] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [lastAlertTime, setLastAlertTime] = useState<number>(0);

  // Function to play alert sound for critical delays
  const playAlertSound = useCallback(() => {
    if (!soundEnabled) return;

    const now = Date.now();
    // Prevent sound spam - only play once every 30 seconds
    if (now - lastAlertTime < 30000) return;

    // Create a simple alert tone
    try {
      const audioContext = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime + 0.2);

      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + 0.3
      );

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);

      setLastAlertTime(now);
    } catch (error) {
      console.log('Audio not supported');
    }
  }, [soundEnabled, lastAlertTime]);

  // Mock data for late buses - in real app, this would come from API
  useEffect(() => {
    const getCurrentTime = () => {
      const now = new Date();
      return now.getHours() * 60 + now.getMinutes(); // minutes since midnight
    };

    const parseTime = (timeStr: string) => {
      const [time, period] = timeStr.split(' ');
      const [hours, minutes] = time.split(':').map(Number);
      const hour24 =
        period === 'PM' && hours !== 12
          ? hours + 12
          : period === 'AM' && hours === 12
          ? 0
          : hours;
      return hour24 * 60 + minutes;
    };

    const generateRealisticLateBuses = (): LateBus[] => {
      const currentTimeMinutes = getCurrentTime();
      const buses = [
        {
          id: 'SCH002',
          busNo: 'NB-5678',
          route: 'Galle - Matara',
          scheduledDeparture: '07:15 AM',
          lastLocation: 'Unawatuna Junction',
          priority: 'medium' as const,
        },
        {
          id: 'SCH007',
          busNo: 'NB-3456',
          route: 'Matara - Colombo',
          scheduledDeparture: '08:45 AM',
          lastLocation: 'Welipenna',
          priority: 'low' as const,
        },
        {
          id: 'SCH012',
          busNo: 'NB-7890',
          route: 'Matara - Tangalle',
          scheduledDeparture: '09:30 AM',
          lastLocation: 'Dickwella',
          priority: 'high' as const,
        },
        {
          id: 'SCH018',
          busNo: 'NB-2468',
          route: 'Matara - Kandy',
          scheduledDeparture: '06:00 AM',
          lastLocation: 'Akuressa',
          priority: 'high' as const,
        },
      ];

      return buses
        .map((bus) => {
          const scheduledTime = parseTime(bus.scheduledDeparture);
          const delay = Math.max(0, currentTimeMinutes - scheduledTime);

          if (delay < 10) return null; // Not late enough to show

          const status: 'Late' | 'Very Late' | 'Critical' =
            delay > 40 ? 'Critical' : delay > 20 ? 'Very Late' : 'Late';

          return {
            ...bus,
            currentDelay: delay,
            status,
          };
        })
        .filter(Boolean) as LateBus[];
    };

    const initialBuses = generateRealisticLateBuses();
    setLateBuses(initialBuses);

    // Check for critical buses and play alert
    const criticalBuses = initialBuses.filter(
      (bus) => bus.status === 'Critical'
    );
    if (criticalBuses.length > 0) {
      playAlertSound();
    }

    // Update delays every minute
    const interval = setInterval(() => {
      setLateBuses((prevBuses) => {
        const updatedBuses = prevBuses.map((bus) => {
          const newDelay = bus.currentDelay + 1; // Add 1 minute
          const newStatus: 'Late' | 'Very Late' | 'Critical' =
            newDelay > 40 ? 'Critical' : newDelay > 20 ? 'Very Late' : 'Late';

          // Play alert when bus becomes critical
          if (bus.status !== 'Critical' && newStatus === 'Critical') {
            setTimeout(playAlertSound, 100);
          }

          return {
            ...bus,
            currentDelay: newDelay,
            status: newStatus,
          };
        });

        return updatedBuses;
      });
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [playAlertSound]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Late':
        return 'border-yellow-200 bg-yellow-50 text-yellow-800';
      case 'Very Late':
        return 'border-orange-200 bg-orange-50 text-orange-800';
      case 'Critical':
        return 'border-red-200 bg-red-50 text-red-800';
      default:
        return 'border-gray-200 bg-gray-50 text-gray-800';
    }
  };

  const getIconColor = (status: string) => {
    switch (status) {
      case 'Late':
        return 'text-yellow-600';
      case 'Very Late':
        return 'text-orange-600';
      case 'Critical':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const handleBusClick = (busId: string) => {
    router.push(`/timeKeeper/schedule-details/${busId}`);
  };

  if (!isVisible || lateBuses.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg border border-red-200 shadow-sm">
      <div className="px-6 py-4 bg-red-50 border-b border-red-200 rounded-t-lg">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-red-800 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Late Bus Alerts ({lateBuses.length})
          </h3>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`p-2 rounded-full transition-colors ${
                soundEnabled
                  ? 'bg-red-100 text-red-600 hover:bg-red-200'
                  : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
              }`}
              title={
                soundEnabled ? 'Disable sound alerts' : 'Enable sound alerts'
              }
            >
              {soundEnabled ? (
                <Volume2 className="h-4 w-4" />
              ) : (
                <VolumeX className="h-4 w-4" />
              )}
            </button>
            <button
              onClick={() => setIsVisible(false)}
              className="text-red-600 hover:text-red-800 text-sm font-medium"
            >
              Dismiss All
            </button>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-4 max-h-80 overflow-y-auto">
        {lateBuses.map((bus) => (
          <div
            key={bus.id}
            onClick={() => handleBusClick(bus.id)}
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${getStatusColor(
              bus.status
            )}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Bus className={`h-4 w-4 ${getIconColor(bus.status)}`} />
                  <span className="font-semibold">{bus.busNo}</span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      bus.status === 'Critical'
                        ? 'bg-red-100 text-red-800'
                        : bus.status === 'Very Late'
                        ? 'bg-orange-100 text-orange-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {bus.status}
                  </span>
                </div>

                <div className="space-y-1 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3 w-3 text-gray-500" />
                    <span className="text-gray-700">{bus.route}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="h-3 w-3 text-gray-500" />
                    <span className="text-gray-700">
                      Scheduled: {bus.scheduledDeparture} • Delayed by{' '}
                      {bus.currentDelay} min
                    </span>
                  </div>

                  {bus.lastLocation && (
                    <div className="text-gray-600">
                      Last seen: {bus.lastLocation}
                    </div>
                  )}
                </div>
              </div>

              <div className="text-right">
                <div
                  className={`text-2xl font-bold ${getIconColor(bus.status)}`}
                >
                  +{bus.currentDelay}
                </div>
                <div className="text-xs text-gray-500">minutes</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-lg">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">Auto-refresh every minute</div>
          <button
            onClick={() => router.push('/timeKeeper/schedule')}
            className="text-blue-800 hover:text-blue-900 text-sm font-medium"
          >
            View All Schedules
          </button>
        </div>
      </div>
    </div>
  );
}
