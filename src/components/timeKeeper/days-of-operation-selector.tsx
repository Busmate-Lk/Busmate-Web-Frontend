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
  const days = [
    { key: "monday", label: "Monday", shortLabel: "Mon" },
    { key: "tuesday", label: "Tuesday", shortLabel: "Tue" },
    { key: "wednesday", label: "Wednesday", shortLabel: "Wed" },
    { key: "thursday", label: "Thursday", shortLabel: "Thu" },
    { key: "friday", label: "Friday", shortLabel: "Fri" },
    { key: "saturday", label: "Saturday", shortLabel: "Sat" },
    { key: "sunday", label: "Sunday", shortLabel: "Sun" },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          📆 Days of Operation
        </h3>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {days.map((day) => (
            <label
              key={day.key}
              className={`flex flex-col items-center p-3 border rounded-lg cursor-pointer transition-all ${
                selectedDays[day.key as keyof typeof selectedDays]
                  ? "bg-blue-50 border-blue-300 text-blue-700"
                  : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              <input
                type="checkbox"
                checked={selectedDays[day.key as keyof typeof selectedDays]}
                onChange={(e) => onDayChange(day.key, e.target.checked)}
                className="sr-only"
              />
              <span className="text-sm font-medium">{day.shortLabel}</span>
              <span className="text-xs mt-1">{day.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
