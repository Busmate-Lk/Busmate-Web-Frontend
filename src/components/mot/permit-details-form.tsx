"use client";

import { Calendar } from "lucide-react";

interface PermitDetailsData {
  permitExpiry: string;
  permitFee: string;
  insurancePolicy: string;
  specialConditions: string;
}

interface PermitDetailsFormProps {
  data: PermitDetailsData;
  permitType: string;
  errors?: Record<string, string>;
  touched?: Record<string, boolean>;
  onChange: (field: keyof PermitDetailsData, value: string) => void;
  onPermitTypeChange: (value: string) => void;
  onBlur?: (field: string) => void;
}

export function PermitDetailsForm({
  data,
  permitType,
  errors = {},
  touched = {},
  onChange,
  onPermitTypeChange,
  onBlur,
}: PermitDetailsFormProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="p-6 pb-0">
        <h3 className="text-lg font-semibold text-gray-900">Permit Details</h3>
      </div>
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label
              htmlFor="permitExpiry"
              className="text-sm font-medium text-gray-700"
            >
              Permit Expiry Date *
            </label>
            <div className="relative">
              <input
                id="permitExpiry"
                placeholder="mm/dd/yyyy"
                value={data.permitExpiry}
                onChange={(e) => onChange("permitExpiry", e.target.value)}
                onBlur={() => onBlur?.("permitExpiry")}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed bg-white text-gray-900 placeholder-gray-500 ${
                  touched.permitExpiry && errors.permitExpiry ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            </div>
            {touched.permitExpiry && errors.permitExpiry && (
              <p className="text-sm text-red-600">{errors.permitExpiry}</p>
            )}
          </div>
          <div className="space-y-2">
            <label
              htmlFor="permitType"
              className="text-sm font-medium text-gray-700"
            >
              Permit Type *
            </label>
            <select
              id="permitType"
              value={permitType}
              onChange={(e) => onPermitTypeChange(e.target.value)}
              onBlur={() => onBlur?.("permitType")}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed bg-white text-gray-900 ${
                touched.permitType && errors.permitType ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select Permit Type</option>
              <option value="regular">Regular Service</option>
              <option value="express">Express Service</option>
              <option value="luxury">Luxury Service</option>
              <option value="school">School Service</option>
              <option value="office">Office Service</option>
            </select>
            {touched.permitType && errors.permitType && (
              <p className="text-sm text-red-600">{errors.permitType}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label
              htmlFor="permitFee"
              className="text-sm font-medium text-gray-700"
            >
              Permit Fee (LKR) *
            </label>
            <input
              id="permitFee"
              placeholder="0.00"
              type="number"
              step="0.01"
              value={data.permitFee}
              onChange={(e) => onChange("permitFee", e.target.value)}
              onBlur={() => onBlur?.("permitFee")}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed bg-white text-gray-900 placeholder-gray-500 ${
                touched.permitFee && errors.permitFee ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {touched.permitFee && errors.permitFee && (
              <p className="text-sm text-red-600">{errors.permitFee}</p>
            )}
          </div>
          <div className="space-y-2">
            <label
              htmlFor="insurancePolicy"
              className="text-sm font-medium text-gray-700"
            >
              Insurance Policy Number *
            </label>
            <input
              id="insurancePolicy"
              placeholder="Enter policy number"
              value={data.insurancePolicy}
              onChange={(e) => onChange("insurancePolicy", e.target.value)}
              onBlur={() => onBlur?.("insurancePolicy")}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed bg-white text-gray-900 placeholder-gray-500 ${
                touched.insurancePolicy && errors.insurancePolicy ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {touched.insurancePolicy && errors.insurancePolicy && (
              <p className="text-sm text-red-600">{errors.insurancePolicy}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="specialConditions"
            className="text-sm font-medium text-gray-700"
          >
            Special Conditions *
          </label>
          <textarea
            id="specialConditions"
            className={`w-full min-h-[100px] px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical disabled:opacity-50 disabled:cursor-not-allowed bg-white text-gray-900 placeholder-gray-500 ${
              touched.specialConditions && errors.specialConditions ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter any special conditions or requirements for this permit..."
            value={data.specialConditions}
            onChange={(e) => onChange("specialConditions", e.target.value)}
            onBlur={() => onBlur?.("specialConditions")}
          />
          {touched.specialConditions && errors.specialConditions && (
            <p className="text-sm text-red-600">{errors.specialConditions}</p>
          )}
        </div>
      </div>
    </div>
  );
}
