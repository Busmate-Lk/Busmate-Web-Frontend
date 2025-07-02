"use client";

interface RoutePermitActionsProps {
  onReject: () => void;
  onClose: () => void;
  onApprove: () => void;
}

export function RoutePermitActions({
  onReject,
  onClose,
  onApprove,
}: RoutePermitActionsProps) {
  const handleReject = () => {
    if (confirm("Are you sure you want to reject this permit?")) {
      onReject();
    }
  };

  return (
    <div className="flex justify-between pt-6 border-t">
      <button
        className="px-4 py-2 border border-red-300 text-red-700 rounded-md hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
        onClick={handleReject}
      >
        Reject Permit
      </button>
      <div className="flex gap-3">
        <button
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          onClick={onClose}
        >
          Close
        </button>
        <button
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
          onClick={onApprove}
        >
          ✓ Approve Permit
        </button>
      </div>
    </div>
  );
}
