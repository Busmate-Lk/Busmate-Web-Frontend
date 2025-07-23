export const permitInfo = {
    busRouteNo: "138",
    routeName: "Colombo - Kandy",
    operator: "CTB",
    status: "Active",
    permitId: "PRM-2024-001",
    issueDate: "Jan 15, 2024",
    expiryDate: "Jan 15, 2025",
    authorizedBuses: "12",
    permitType: "Regular Service",
    region: "Western Province",
    depot: "Colombo Central Depot",
  };

  export const timelineSteps = [
    { status: "Requested", date: "Jan 10, 2024", completed: true },
    { status: "Under Review", date: "Jan 12, 2024", completed: true },
    { status: "Approved", date: "Jan 15, 2024", completed: true },
  ];

 export const documents = [
    { name: "Route Plan.pdf", type: "pdf" },
    { name: "Vehicle Registration.jpg", type: "image" },
    { name: "Insurance Certificate.pdf", type: "pdf" },
    { name: "Driver License.jpg", type: "image" },
  ];

export const initialNotes = [
    {
      author: "Transport Officer - John Silva",
      date: "Jan 19, 2024",
      content:
        "Route inspection completed. All requirements met. Approved for operation.",
    },
    {
      author: "Safety Inspector - Maria Fernando",
      date: "Jan 16, 2024",
      content:
        "Safety compliance verified. All vehicles meet the required standards.",
    },
  ];