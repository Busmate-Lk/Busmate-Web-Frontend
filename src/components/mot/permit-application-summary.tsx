"use client";

export function PermitApplicationSummary() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="p-6 pb-0">
        <h3 className="text-lg font-semibold text-gray-900">
          Application Summary
        </h3>
      </div>
      <div className="p-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">
            Review Your Application
          </h4>
          <p className="text-sm text-blue-800">
            Please review all the information you've entered before submitting
            your route permit application. Once submitted, you'll receive a
            confirmation email and can track the status of your application in
            the permit management dashboard.
          </p>
        </div>
      </div>
    </div>
  );
}
