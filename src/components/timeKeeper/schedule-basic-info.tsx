interface ScheduleBasicInfoProps {
  schedule: {
    id: string;
    busNo: string;
    status: string;
    validFrom: string;
    validUntil: string;
    permitNo: string;
    operatorName: string;
    conductor: string;
  };
}

export function ScheduleBasicInfo({ schedule }: ScheduleBasicInfoProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-emerald-100 text-emerald-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            Schedule Information
          </h3>
          <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(schedule.status)}`}>
            {schedule.status}
          </span>
        </div>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm font-medium text-gray-500">Schedule ID</p>
            <p className="text-lg font-semibold text-gray-900">{schedule.id}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Bus Number</p>
            <p className="text-lg font-semibold text-gray-900">{schedule.busNo}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Operator</p>
            <p className="text-lg font-semibold text-gray-900">{schedule.operatorName}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Valid From</p>
            <p className="text-lg font-semibold text-gray-900">{schedule.validFrom}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Valid Until</p>
            <p className="text-lg font-semibold text-gray-900">{schedule.validUntil}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Conductor</p>
            <p className="text-lg font-semibold text-gray-900">{schedule.conductor}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
