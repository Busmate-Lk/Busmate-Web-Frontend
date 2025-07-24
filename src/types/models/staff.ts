export interface TimeKeeper {
  id: string;
  name: string;
  nic: string;
  dateOfBirth: string;
  contactNo: string;
  email: string;
  workingBusStation: string;
  createdAt: string;
  updatedAt: string;
  status: 'active' | 'inactive' | 'suspended';
}

export interface Operator {
  id: string;
  name: string;
  nic: string;
  dateOfBirth: string;
  contactNo: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  status: 'active' | 'inactive' | 'suspended';
  licenseNumber?: string;
  experienceYears?: number;
}

export interface StaffFormData {
  name: string;
  nic: string;
  dateOfBirth: string;
  contactNo: string;
  email: string;
  workingBusStation?: string; // Only for TimeKeeper
  licenseNumber?: string; // Only for Operator
  experienceYears?: number; // Only for Operator
}
