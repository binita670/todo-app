import { Request } from "express";

export interface TypedQuery<QueryType extends Record<string, any>> extends Request {
    query: QueryType
}