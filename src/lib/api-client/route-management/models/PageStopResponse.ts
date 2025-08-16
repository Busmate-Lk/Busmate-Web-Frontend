/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Pageablenull } from './Pageablenull';
import type { Sortnull } from './Sortnull';
import type { StopResponse } from './StopResponse';
export type PageStopResponse = {
    totalPages?: number;
    totalElements?: number;
    size?: number;
    content?: Array<StopResponse>;
    number?: number;
    sort?: Sortnull;
    first?: boolean;
    last?: boolean;
    numberOfElements?: number;
    pageable?: Pageablenull;
    empty?: boolean;
};

