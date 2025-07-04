interface ValidityPeriodFormProps {
  validFrom: string;
  validUntil: string;
  onValidFromChange: (value: string) => void;
  onValidUntilChange: (value: string) => void;
}

export function ValidityPeriodForm({
  validFrom,
  validUntil,
  onValidFromChange,
  onValidUntilChange,
}: ValidityPeriodFormProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          📅 Validity Period
        </h3>
      </div>
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label
              htmlFor="validFrom"
              className="block text-sm font-medium text-gray-700"
            >
              Valid From *
            </label>
            <input
              id="validFrom"
              type="date"
              value={validFrom}
              onChange={(e) => onValidFromChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors bg-white text-gray-900"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="validUntil"
              className="block text-sm font-medium text-gray-700"
            >
              Valid Until *
            </label>
            <input
              id="validUntil"
              type="date"
              value={validUntil}
              onChange={(e) => onValidUntilChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors bg-white text-gray-900"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
