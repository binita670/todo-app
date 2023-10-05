export interface Pagination {
    total: number;
    page: number;
    limit: number;
    totalPage: number;
    type?: string
}

export interface ApiMetaData {
    api: {
        version: number
    },
    pagination?: Pagination 
}