export default function AddBusStopNotes({ notes, handleInputChange }: {
  notes: string,
  handleInputChange: (field: string, value: string) => void
}) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="font-semibold mb-2 text-gray-900">Additional Notes</div>
      <textarea
        className="w-full border border-gray-300 rounded px-3 py-2 placeholder-gray-600"
        placeholder="Enter any additional information about the bus stop..."
        value={notes}
        onChange={(e) => handleInputChange("notes", e.target.value)}
        rows={4}
      />
    </div>
  )
}