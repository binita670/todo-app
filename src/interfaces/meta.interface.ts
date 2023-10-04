export interface Pagination {
    total: number;
    page: number;
    limit: number;
    totalPage: number;
}

export interface ApiMetaData {
    api: {
        version: number
    },
    pagination?: Pagination 
}