/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Pageablenull } from './Pageablenull';
import type { RouteResponse } from './RouteResponse';
import type { Sortnull } from './Sortnull';
export type PageRouteResponse = {
    totalPages?: number;
    totalElements?: number;
    size?: number;
    content?: Array<RouteResponse>;
    number?: number;
    sort?: Sortnull;
    first?: boolean;
    last?: boolean;
    numberOfElements?: number;
    pageable?: Pageablenull;
    empty?: boolean;
};

