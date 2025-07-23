export type Stop = {
  id: number;
  name: string;
  latitude: string;
  longitude: string;
  time: string;
};

// In a real app, this would be an API call
export const mockPermitData = {
  operatorName: "Ceylon Transport Board",
  operatorType: "government",
  contactNo: "+94 11 234 5678",
  nic: "123456789V",
  email: "ctb@transport.gov.lk",
  routeName: "Colombo - Kandy Express",
  upStartPoint: "Colombo Fort",
  upEndPoint: "Kandy Central",
  upStartLat: "6.9271",
  upStartLng: "79.8612",
  upEndLat: "7.2906",
  upEndLng: "80.6337",
  downStartPoint: "Kandy Central",
  downEndPoint: "Colombo Fort",
  downStartLat: "7.2906",
  downStartLng: "80.6337",
  downEndLat: "6.9271",
  downEndLng: "79.8612",
  totalDistance: "115.5",
  totalDuration: "03:30",
};

export const mockStops: Stop[] = [
  {
    id: 1,
    name: "Colombo Fort",
    latitude: "6.9271",
    longitude: "79.8612",
    time: "06:00 AM",
  },
  {
    id: 2,
    name: "Kandy Central",
    latitude: "7.2906",
    longitude: "80.6337",
    time: "09:30 AM",
  },
];