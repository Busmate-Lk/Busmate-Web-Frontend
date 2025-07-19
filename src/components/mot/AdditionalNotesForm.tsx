interface AdditionalNotesFormProps {
  notes: string
  onNotesChange: (value: string) => void
}

export default function AdditionalNotesForm({ notes, onNotesChange }: AdditionalNotesFormProps) {
  return (
    <div className="bg-white rounded-lg shadow border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Additional Notes</h3>
      </div>
      <div className="p-6">
        <textarea
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter any additional information about the bus..."
          value={notes}
          onChange={(e) => onNotesChange(e.target.value)}
          rows={4}
        />
      </div>
    </div>
  )
}