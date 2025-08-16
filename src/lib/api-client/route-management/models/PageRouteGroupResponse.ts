/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Pageablenull } from './Pageablenull';
import type { RouteGroupResponse } from './RouteGroupResponse';
import type { Sortnull } from './Sortnull';
export type PageRouteGroupResponse = {
    totalPages?: number;
    totalElements?: number;
    size?: number;
    content?: Array<RouteGroupResponse>;
    number?: number;
    sort?: Sortnull;
    first?: boolean;
    last?: boolean;
    numberOfElements?: number;
    pageable?: Pageablenull;
    empty?: boolean;
};

