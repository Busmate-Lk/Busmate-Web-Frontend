import { FileText, AlertCircle } from "lucide-react"

interface AdditionalNotesFormProps {
  notes: string
  onNotesChange: (value: string) => void
  error?: string
  showValidation: boolean
}

export default function AdditionalNotesForm({ 
  notes, 
  onNotesChange, 
  error, 
  showValidation 
}: AdditionalNotesFormProps) {
  const maxLength = 500
  const remainingChars = maxLength - notes.length
  
  const getTextareaClassName = () => {
    const baseClass = "w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 resize-vertical"
    const hasError = showValidation && error
    
    if (hasError) {
      return `${baseClass} border-red-300 focus:ring-red-500 focus:border-red-500`
    }
    return `${baseClass} border-gray-300 focus:ring-blue-500 focus:border-blue-500`
  }

  const ErrorMessage = () => {
    if (!showValidation || !error) return null
    
    return (
      <div className="flex items-center gap-1 mt-1">
        <AlertCircle className="w-4 h-4 text-red-500" />
        <span className="text-sm text-red-600">{error}</span>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-600" />
          Additional Notes
        </h3>
      </div>
      <div className="p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Notes & Comments
          </label>
          <textarea
            name="notes"
            rows={4}
            className={getTextareaClassName()}
            placeholder="Enter any additional information about this bus (maintenance history, special requirements, route preferences, etc.)"
            value={notes}
            onChange={(e) => onNotesChange(e.target.value)}
            maxLength={maxLength}
          />
          <ErrorMessage />
          
          {/* Character Count */}
          <div className="flex justify-between items-center mt-2">
            <p className="text-xs text-gray-500">
              Optional field for additional information
            </p>
            <span className={`text-xs ${remainingChars < 50 ? 'text-orange-600' : 'text-gray-500'}`}>
              {remainingChars} characters remaining
            </span>
          </div>
        </div>

        {/* Notes Guidelines */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Suggested Information to Include:</h4>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>• Maintenance history and recurring issues</li>
            <li>• Special equipment or modifications</li>
            <li>• Route preferences or restrictions</li>
            <li>• Driver feedback or operational notes</li>
            <li>• Insurance details or warranty information</li>
          </ul>
        </div>
      </div>
    </div>
  )
}