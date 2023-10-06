import { meta } from "../constants";
import { ResponseFormatInterface } from "../interfaces/response.interface";

export const responseFormat = (response: Record<string,any>[] | Record<string,any>) : ResponseFormatInterface => {
        return {
            meta: meta,
            data: response
        };
    }
