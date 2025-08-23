interface ScheduleInformationCardProps {
  schedule: {
    departure: string;
    arrival: string;
    days: string;
  };
}

export function ScheduleInformationCard({ schedule }: ScheduleInformationCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          ⏰ Schedule Information
        </h3>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Departure Time</p>
              <p className="text-xl font-bold text-blue-800">{schedule.departure}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Arrival Time</p>
              <p className="text-xl font-bold text-emerald-600">{schedule.arrival}</p>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Operating Days</p>
            <p className="text-lg font-semibold text-gray-900">{schedule.days}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
