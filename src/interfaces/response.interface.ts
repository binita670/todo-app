import { ApiMetaData } from "./meta.interface";

export interface ResponseFormatInterface{
    meta: ApiMetaData,
    data: Record<string,any>[] | Record<string,any>
}