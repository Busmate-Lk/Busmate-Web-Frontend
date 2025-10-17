interface DaysOfOperationCardProps {
  daysDetails: {
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    sunday: boolean;
  };
}

export function DaysOfOperationCard({ daysDetails }: DaysOfOperationCardProps) {
  const days = [
    { key: "monday", label: "Monday", short: "Mon" },
    { key: "tuesday", label: "Tuesday", short: "Tue" },
    { key: "wednesday", label: "Wednesday", short: "Wed" },
    { key: "thursday", label: "Thursday", short: "Thu" },
    { key: "friday", label: "Friday", short: "Fri" },
    { key: "saturday", label: "Saturday", short: "Sat" },
    { key: "sunday", label: "Sunday", short: "Sun" },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          📅 Days of Operation
        </h3>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-7 gap-2">
          {days.map((day) => {
            const isActive = daysDetails[day.key as keyof typeof daysDetails];
            return (
              <div
                key={day.key}
                className={`text-center p-3 rounded-lg border ${
                  isActive
                    ? "bg-blue-50 border-blue-200 text-blue-700"
                    : "bg-slate-50 border-slate-200 text-slate-400"
                }`}
              >
                <div className="font-semibold text-sm">{day.short}</div>
                <div className="text-xs mt-1">{day.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
