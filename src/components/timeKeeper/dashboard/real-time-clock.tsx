'use client';

import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

export function RealTimeClock() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
      <div className="flex items-center gap-3 mb-4">
        <Clock className="h-6 w-6 text-blue-800" />
        <h3 className="text-lg font-semibold text-gray-900">Current Time</h3>
      </div>

      <div className="text-center space-y-2">
        <div className="text-4xl font-mono font-bold text-blue-800 tracking-wider">
          {formatTime(currentTime)}
        </div>
        <div className="text-sm text-gray-600">{formatDate(currentTime)}</div>
      </div>
    </div>
  );
}
