export interface BusDetailsByOperator {
    busId: string;
    busNumber: string;
    busType: string;
    capacity: number;
    status: 'active' | 'inactive' | 'maintenance';
    createdAt: string;
    updatedAt: string;
    type: string;
    routeName: string;
    permitExpiryDate: string;
    InsuranceExpiryDate: string;

}

export interface BusDetailsforTraking {
    busId: string;
    busNumber: string;
    busType: string;
    capacity: number;
    status: 'active' | 'inactive' | 'maintenance';
    driverName: string;
    conductorName: string;
    routeName: string;
    currentLocation: string;
    lastUpdated: string;
    type: string;
    permitExpiryDate: string;
    insuranceExpiryDate: string;
}


export interface BusDetailsByOperatorResponse {
    operatorId: string;
    operatorName: string;
    buses: BusDetailsByOperator[];
}

export interface BusTrackingResponse {
    busId: string;
    busNumber: string;
    currentLocation: string;
    lastUpdated: string;
    driverName: string;
    conductorName: string;
}

export interface BusData {
  id: string
  busNumber: string
  busName: string
  route: string
  driver: string
  conductor: string
  conductorPhone: string
  status: "Active" | "Maintenance" | "Inactive"
}

export interface RoutePermit {
    id: string
    permitId: string
    routeId: string
    routeName: string
    startPoint: string
    endPoint: string
    operator: string
    expiryDate: string
    isExpired: boolean
    intermediateStops?: string[]
}

export interface RouteData {
  id: string
  routeName: string
  startPoint: string
  endPoint: string
  stops: number
  scheduleStart: string
  scheduleEnd: string
  frequency: string
  assignedBus: string
  status: "Active" | "Inactive"
  scheduleDate: string
  validFrom: string
  validTo: string
}