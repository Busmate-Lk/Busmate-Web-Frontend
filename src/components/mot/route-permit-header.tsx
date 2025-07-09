"use client";

interface PermitInfo {
  busRouteNo: string;
  routeName: string;
  operator: string;
  status: string;
  permitId: string;
  issueDate: string;
  expiryDate: string;
  authorizedBuses: string;
  permitType: string;
  region: string;
  depot: string;
}

interface RoutePermitHeaderProps {
  permitInfo: PermitInfo;
  onEdit: () => void;
  onBack?: () => void; // Add optional back handler
}

export function RoutePermitHeader({
  permitInfo,
  onEdit,
  onBack,
}: RoutePermitHeaderProps) {
  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          {onBack && (
            <button
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
              onClick={onBack}
            >
              ← Back to the Permit Management
            </button>
          )}
        </div>
        <button
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          onClick={onEdit}
        >
          Edit Permit
        </button>
      </div>

      {/* Basic Info */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <p className="text-sm text-gray-600 mb-1">Bus Route No.</p>
              <p className="font-semibold text-lg">{permitInfo.busRouteNo}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Route Name</p>
              <p className="font-semibold text-lg">{permitInfo.routeName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Operator</p>
              <p className="font-semibold text-lg">{permitInfo.operator}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Permit Status</p>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {permitInfo.status}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
