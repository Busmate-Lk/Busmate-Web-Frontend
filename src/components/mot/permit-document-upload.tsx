"use client";

export function PermitDocumentUpload() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="p-6 pb-0">
        <h3 className="text-lg font-semibold text-gray-900">
          Required Documents
        </h3>
      </div>
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label
              htmlFor="vehicleRegistration"
              className="text-sm font-medium text-gray-700"
            >
              Vehicle Registration Certificate *
            </label>
            <input
              id="vehicleRegistration"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed bg-white text-gray-900"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="insuranceCertificate"
              className="text-sm font-medium text-gray-700"
            >
              Insurance Certificate *
            </label>
            <input
              id="insuranceCertificate"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed bg-white text-gray-900"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="driverLicense"
              className="text-sm font-medium text-gray-700"
            >
              Driver's License *
            </label>
            <input
              id="driverLicense"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed bg-white text-gray-900"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="routePlan"
              className="text-sm font-medium text-gray-700"
            >
              Route Plan
            </label>
            <input
              id="routePlan"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed bg-white text-gray-900"
            />
          </div>
        </div>
        <div className="text-sm text-gray-600">
          <p>
            * Required documents. Accepted formats: PDF, JPG, JPEG, PNG (Max
            size: 5MB each)
          </p>
        </div>
      </div>
    </div>
  );
}
