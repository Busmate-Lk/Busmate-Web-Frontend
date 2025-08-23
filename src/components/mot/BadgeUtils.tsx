export const getTargetGroupBadge = (groups: string[]) => {
  const group = groups[0]
  const badgeClasses = {
    "Bus Operators": "bg-blue-100 text-blue-800",
    "Drivers": "bg-purple-100 text-purple-800",
    "All Users": "bg-gray-100 text-gray-800",
    "Fleet Operators": "bg-green-100 text-green-800",
    "Conductors": "bg-orange-100 text-orange-800",
    "Passengers": "bg-indigo-100 text-indigo-800",
  }
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badgeClasses[group as keyof typeof badgeClasses] || "bg-gray-100 text-gray-800"}`}>
      {group}
    </span>
  )
}

export const getPriorityBadge = (priority: string) => {
  const badgeClasses = {
    "High": "bg-red-100 text-red-800",
    "Medium": "bg-yellow-100 text-yellow-800",
    "Low": "bg-green-100 text-green-800",
  }
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badgeClasses[priority as keyof typeof badgeClasses] || "bg-gray-100 text-gray-800"}`}>
      {priority}
    </span>
  )
}

export const getStatusBadge = (status: string) => {
  const badgeClasses = {
    "Sent": "bg-green-100 text-green-800",
    "Pending": "bg-yellow-100 text-yellow-800",
  }
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badgeClasses[status as keyof typeof badgeClasses] || "bg-gray-100 text-gray-800"}`}>
      {status}
    </span>
  )
}

export const getCategoryBadge = (category: string) => {
  const badgeClasses = {
    "Emergency": "bg-red-100 text-red-800",
    "Route Update": "bg-blue-100 text-blue-800",
    "Policy": "bg-purple-100 text-purple-800",
    "Maintenance": "bg-orange-100 text-orange-800",
    "Training": "bg-indigo-100 text-indigo-800",
    "Technology": "bg-cyan-100 text-cyan-800",
    "General": "bg-gray-100 text-gray-800",
  }
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badgeClasses[category as keyof typeof badgeClasses] || "bg-gray-100 text-gray-800"}`}>
      {category}
    </span>
  )
}