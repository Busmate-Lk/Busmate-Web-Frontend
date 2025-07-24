export interface BusStopRequest{
    id?: string;
    name:string;
    description: string,
    location: {
      latitude: number,
      longitude: number,
      address: string,
      city: string,
      state: string,
      zipCode: string,
      country: string
    },
    isAccessible: true

}