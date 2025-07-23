export interface BusStopResponse {
  id: string;
  name: string;
  description: string;
  location: {
    latitude: number;
    longitude: number;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  isAccessible: true;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
}
