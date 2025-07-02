interface DaysOfOperationSelectorProps {
  selectedDays: {
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    sunday: boolean;
  };
  onDayChange: (day: string, checked: boolean) => void;
}

export function DaysOfOperationSelector({
  selectedDays,
  onDayChange,
}: DaysOfOperationSelectorProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          📋 Days of Operation
        </h3>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {Object.entries(selectedDays).map(([day, checked]) => (
            <div key={day} className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={day}
                checked={checked}
                onChange={(e) => onDayChange(day, e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor={day}
                className="text-sm font-medium text-gray-700 capitalize"
              >
                {day}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
