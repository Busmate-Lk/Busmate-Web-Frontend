"use client";

interface TimelineStep {
  status: string;
  date: string;
  completed: boolean;
}

interface PermitProcessingTimelineProps {
  timelineSteps: TimelineStep[];
}

export function PermitProcessingTimeline({
  timelineSteps,
}: PermitProcessingTimelineProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">
          📋 Permit Processing Timeline
        </h3>
      </div>
      <div className="p-6">
        <div className="relative">
          <div className="flex items-center justify-between">
            {timelineSteps.map((step, index) => (
              <div key={index} className="flex flex-col items-center relative">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                    step.completed
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-gray-200 text-gray-600 border-gray-300"
                  }`}
                >
                  {step.completed ? "✓" : index + 1}
                </div>
                <p className="mt-2 text-sm font-medium text-center">
                  {step.status}
                </p>
                <p className="text-xs text-gray-500">{step.date}</p>

                {/* Connection line */}
                {index < timelineSteps.length - 1 && (
                  <div
                    className={`absolute top-6 left-6 w-full h-0.5 ${
                      step.completed ? "bg-blue-600" : "bg-gray-300"
                    }`}
                    style={{ width: "calc(100vw / 3 - 3rem)" }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
