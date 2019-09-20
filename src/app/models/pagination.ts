export interface Pagination {
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
    totalItems: number;
    minAge: number;
    maxAge: number;
    gender: string;
    order: string;
    showlikers: boolean;
    showlikees: boolean;
}

export class PaginationResult<T> {
    result: T;
    pagination: Pagination;
}

