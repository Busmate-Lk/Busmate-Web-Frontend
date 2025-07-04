import { Clock, Plus } from "lucide-react";

interface TimeSlot {
  departure: string;
  arrival: string;
}

interface TimeScheduleSectionProps {
  timeSlots: TimeSlot[];
  onAddTimeSlot: () => void;
  onUpdateTimeSlot: (index: number, field: string, value: string) => void;
}

export function TimeScheduleSection({
  timeSlots,
  onAddTimeSlot,
  onUpdateTimeSlot,
}: TimeScheduleSectionProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          ⏰ Time Schedule
        </h3>
      </div>
      <div className="p-6 space-y-4">
        {timeSlots.map((slot, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg"
          >
            <div className="space-y-2">
              <label
                htmlFor={`departure${index}`}
                className="block text-sm font-medium text-gray-700"
              >
                Departure Time *
              </label>
              <div className="relative">
                <input
                  id={`departure${index}`}
                  type="text"
                  placeholder="--:-- --"
                  value={slot.departure}
                  onChange={(e) =>
                    onUpdateTimeSlot(index, "departure", e.target.value)
                  }
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors bg-white text-gray-900 placeholder-gray-500"
                />
                <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              </div>
            </div>
            <div className="space-y-2">
              <label
                htmlFor={`arrival${index}`}
                className="block text-sm font-medium text-gray-700"
              >
                Arrival Time *
              </label>
              <div className="relative">
                <input
                  id={`arrival${index}`}
                  type="text"
                  placeholder="--:-- --"
                  value={slot.arrival}
                  onChange={(e) =>
                    onUpdateTimeSlot(index, "arrival", e.target.value)
                  }
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors bg-white text-gray-900 placeholder-gray-500"
                />
                <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              </div>
            </div>
          </div>
        ))}
        <button
          className="flex items-center justify-center gap-2 w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
          onClick={onAddTimeSlot}
        >
          <Plus className="h-4 w-4" />
          Add Another Time Slot
        </button>
      </div>
    </div>
  );
}
