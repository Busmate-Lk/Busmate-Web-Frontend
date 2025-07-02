"use client";

interface OperatorData {
  operatorName: string;
  operatorType: string;
  contactNo: string;
  nic: string;
  email: string;
}

interface PermitOperatorInformationProps {
  data: OperatorData;
  errors?: Record<string, string>;
  touched?: Record<string, boolean>;
  onChange: (field: keyof OperatorData, value: string) => void;
  onBlur?: (field: string) => void;
}

export function PermitOperatorInformation({
  data,
  errors = {},
  touched = {},
  onChange,
  onBlur,
}: PermitOperatorInformationProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="p-6 pb-0">
        <h3 className="text-lg font-semibold text-gray-900">
          Operator Information
        </h3>
      </div>
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label
              htmlFor="operatorName"
              className="text-sm font-medium text-gray-700"
            >
              Operator Name *
            </label>
            <input
              id="operatorName"
              placeholder="Enter operator name"
              value={data.operatorName}
              onChange={(e) => onChange("operatorName", e.target.value)}
              onBlur={() => onBlur?.("operatorName")}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed bg-white text-gray-900 placeholder-gray-500 ${
                touched.operatorName && errors.operatorName ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {touched.operatorName && errors.operatorName && (
              <p className="text-sm text-red-600">{errors.operatorName}</p>
            )}
          </div>
          <div className="space-y-2">
            <label
              htmlFor="operatorType"
              className="text-sm font-medium text-gray-700"
            >
              Type *
            </label>
            <select
              id="operatorType"
              value={data.operatorType}
              onChange={(e) => onChange("operatorType", e.target.value)}
              onBlur={() => onBlur?.("operatorType")}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed bg-white text-gray-900 ${
                touched.operatorType && errors.operatorType ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select Type</option>
              <option value="SLTB">SLTB</option>
              <option value="private">Private</option>
             </select>
            {touched.operatorType && errors.operatorType && (
              <p className="text-sm text-red-600">{errors.operatorType}</p>
            )}
          </div>
          <div className="space-y-2">
            <label
              htmlFor="contactNo"
              className="text-sm font-medium text-gray-700"
            >
              Contact No. *
            </label>
            <input
              id="contactNo"
              placeholder="Enter contact number"
              value={data.contactNo}
              onChange={(e) => onChange("contactNo", e.target.value)}
              onBlur={() => onBlur?.("contactNo")}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed bg-white text-gray-900 placeholder-gray-500 ${
                touched.contactNo && errors.contactNo ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {touched.contactNo && errors.contactNo && (
              <p className="text-sm text-red-600">{errors.contactNo}</p>
            )}
          </div>
          <div className="space-y-2">
            <label htmlFor="nic" className="text-sm font-medium text-gray-700">
              NIC *
            </label>
            <input
              id="nic"
              placeholder="Enter NIC number"
              value={data.nic}
              onChange={(e) => onChange("nic", e.target.value)}
              onBlur={() => onBlur?.("nic")}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed bg-white text-gray-900 placeholder-gray-500 ${
                touched.nic && errors.nic ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {touched.nic && errors.nic && (
              <p className="text-sm text-red-600">{errors.nic}</p>
            )}
          </div>
          <div className="space-y-2 md:col-span-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email *
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter email address"
              value={data.email}
              onChange={(e) => onChange("email", e.target.value)}
              onBlur={() => onBlur?.("email")}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed bg-white text-gray-900 placeholder-gray-500 ${
                touched.email && errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {touched.email && errors.email && (
              <p className="text-sm text-red-600">{errors.email}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
