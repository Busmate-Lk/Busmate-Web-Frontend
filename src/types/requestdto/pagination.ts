export interface QueryParams {
  page?: number;
  size?: number;
  sortBy?: 'name' | 'createdAt' | 'updatedAt' | 'city' | 'state';
  sortDir?: 'asc' | 'desc';
  search?: string;
}
