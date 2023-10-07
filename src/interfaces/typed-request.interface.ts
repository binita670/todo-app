import { Request } from "express";

export interface TypedRequest<
  BodyType,
  ParamType extends Record<string, string> = {},
> extends Request {
  body: BodyType;
  params: ParamType;
}
