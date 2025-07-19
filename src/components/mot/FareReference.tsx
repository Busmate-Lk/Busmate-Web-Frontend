interface FareRef {
  route: string
  type: string
  fare: string
}

interface FormData {
  busType: string
  facilityType: string
  route: string
  [key: string]: string
}

interface FareReferenceProps {
  formData: FormData
  currentFareReference: FareRef[]
}

export default function FareReference({ currentFareReference, formData }: FareReferenceProps) {
  // Filter fare references based on current form data
  const getRelevantFares = () => {
    if (!formData.busType && !formData.route) {
      return currentFareReference
    }

    return currentFareReference.filter(ref => {
      const matchesRoute = !formData.route || ref.route.toLowerCase().includes(formData.route.toLowerCase())
      const matchesBusType = !formData.busType || ref.type.toLowerCase().includes(formData.busType.toLowerCase())
      return matchesRoute || matchesBusType
    })
  }

  const relevantFares = getRelevantFares()

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {formData.route || formData.busType ? 'Relevant Fare References' : 'Current Fare Reference'}
        </h3>
        
        {/* Show current form context */}
        {(formData.route || formData.busType) && (
          <div className="mb-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-xs text-blue-600 font-medium">Filtering for:</p>
            {formData.route && <p className="text-sm text-blue-800">Route: {formData.route}</p>}
            {formData.busType && <p className="text-sm text-blue-800">Bus Type: {formData.busType}</p>}
          </div>
        )}

        <div className="space-y-3">
          {relevantFares.length > 0 ? (
            relevantFares.map((ref, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-sm text-gray-900">{ref.route}</p>
                    <p className="text-xs text-gray-500">{ref.type}</p>
                  </div>
                  <p className="text-sm font-semibold text-blue-600">{ref.fare}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 text-sm">
                {formData.route || formData.busType 
                  ? 'No matching fare references found' 
                  : 'No fare reference data available'
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}