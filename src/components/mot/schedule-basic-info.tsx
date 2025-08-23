"use client";

interface ScheduleBasicInfoProps {
  schedule: {
    
    routeId: string;
    routeName:string
    status: string;

  };
}

export function ScheduleBasicInfo({ schedule }: ScheduleBasicInfoProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* <div>
            <p className="text-sm text-gray-600 mb-1">Schedule ID</p>
            <p className="font-semibold text-lg">{schedule.id}</p>
          </div> */}
          <div>
            <p className="text-sm text-gray-600 mb-1">Route ID</p>
            <p className="font-semibold text-lg text-blue-600">{schedule.routeId}</p>
          </div>
          {/* <div>
            <p className="text-sm text-gray-600 mb-1">Bus Number</p>
            <p className="font-semibold text-lg">{schedule.busNo}</p>
          </div> */}
          <div>
            <p className="text-sm text-gray-600 mb-1">Route Name</p>
            <p className="font-semibold text-lg text-blue-600">{schedule.routeName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Status</p>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                schedule.status
              )}`}
            >
              {schedule.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
