interface TablePaginationProps {
  currentPage: number
  totalItems: number
  itemsPerPage: number
  onPageChange: (page: number) => void
}

export default function TablePagination({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange
}: TablePaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startItem = (currentPage - 1) * itemsPerPage + 1
  const endItem = Math.min(currentPage * itemsPerPage, totalItems)

  return (
    <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
      <p className="text-sm text-gray-600">
        Showing {startItem} to {endItem} of {totalItems} results
      </p>
      <div className="flex items-center gap-2">
        <button 
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="px-3 py-1 border border-gray-300 rounded text-sm disabled:text-gray-400"
        >
          Previous
        </button>
        <button className="px-3 py-1 bg-blue-600 text-white border border-blue-600 rounded text-sm">
          {currentPage}
        </button>
        <button 
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="px-3 py-1 border border-gray-300 rounded text-sm disabled:text-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  )
}