import { BusDetailsByOperator, BusDetailsforTraking,RouteData } from "@/types/responsedto/busDetails-by-operator";
import { routeManagementClient, userManagementClient } from "../client";


interface GetBusParams {
    operatorId?: string;
    page?: number;
    size?: number;
    sortBy?: string;
    sortDir?: 'asc' | 'desc';
    search?: string;
    status?: 'pending' | 'active' | 'inactive' | 'cancelled';
    minCapacity?: number;
    maxCapacity?: number;
}


//bus details for fleet management by operator
export const getBusDetailsByOperator = async(params: GetBusParams = {}): Promise<RouteData[]> => {
    const response = await routeManagementClient.get('/api/buses', {
        params, // Axios will automatically convert this object to query parameters
    });
    return response.data;
};

//bus details for tracking by operator
export const getBusDetailsForTracking = async (params: GetBusParams = {}): Promise<BusDetailsforTraking[]> => {
    const response = await routeManagementClient.get('/api/buses', {
        params, // Axios will automatically convert this object to query parameters
    });
    return response.data;
};

//bus details for bus Seat view by operator
export const getBusDetailsForSeatView = async (operatorId: string): Promise<BusDetailsforTraking[]> => {
    const response = await routeManagementClient.get(`/api/bus-details/seat-view/${operatorId}`);
    return response.data;
};

//get conductor details and driver details 
export const getConductorAndDriverDetails = async (busId: string) => {
    const response = await userManagementClient.get(`/api/users/bus/${busId}`);
    return response.data;
};


//assign driver and conductor to bus
export const assignDriverConductorToBus = async (busId: string, conductorId: string, driverId: string) => {
    const response = await routeManagementClient.post(`/api/bus-details/assign-driver-conductor`, {
        busId,
        conductorId,
        driverId,
    });
    return response.data;
}



