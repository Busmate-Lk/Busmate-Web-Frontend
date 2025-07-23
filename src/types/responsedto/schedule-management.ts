export interface ScheduleManagementResponse {
  id:  String;
  name:  String;
  routeId:  String;
  routeName:  String;
  routeGroupId:  String;
  routeGroupName:  String;
  scheduleType:  String;
  effectiveStartDate: Date;
  effectiveEndDate: Date;
  status:  String;
  scheduleStops: [
    {
      stopId:  String;
      stopName:  String;
      location: {
        latitude: number;
        longitude: number;
        address:  String;
        city:  String;
        state:  String;
        zipCode:  String;
        country:  String;
      };
      stopOrder: number;
      arrivalTime: String;
      departureTime: String;
    }
  ];
  createdAt: Date;
  updatedAt: Date;
  createdBy:  String;
  updatedBy:  String;
}