"use client";

interface PermitInfo {
  permitId: string;
  issueDate: string;
  expiryDate: string;
  authorizedBuses: string;
  permitType: string;
  region: string;
  depot: string;
}

interface PermitInformationPanelProps {
  permitInfo: PermitInfo;
}

export function PermitInformationPanel({
  permitInfo,
}: PermitInformationPanelProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">
          Permit Information
        </h3>
      </div>
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-600">Permit ID:</p>
            <p className="font-medium">{permitInfo.permitId}</p>
          </div>
          <div>
            <p className="text-gray-600">Issue Date:</p>
            <p className="font-medium">{permitInfo.issueDate}</p>
          </div>
          <div>
            <p className="text-gray-600">Expiry Date:</p>
            <p className="font-medium text-orange-600">
              {permitInfo.expiryDate}
            </p>
          </div>
          <div>
            <p className="text-gray-600">Authorized Buses:</p>
            <p className="font-medium">{permitInfo.authorizedBuses}</p>
          </div>
          <div>
            <p className="text-gray-600">Permit Type:</p>
            <p className="font-medium">{permitInfo.permitType}</p>
          </div>
          <div>
            <p className="text-gray-600">Region:</p>
            <p className="font-medium">{permitInfo.region}</p>
          </div>
          <div className="col-span-2">
            <p className="text-gray-600">Depot:</p>
            <p className="font-medium">{permitInfo.depot}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
