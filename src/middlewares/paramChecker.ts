import { NextFunction, Request, Response } from "express";
import { response } from "@/utils/response";

export const paramChecker = (
  param: string,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { [param]: value } = req.params;
  if (!value) {
    return response(res, {
      statusCode: 400,
      message: "Bad request",
    });
  } else if (isNaN(parseInt(value))) {
    return response(res, {
      statusCode: 400,
      message: "Bad request",
    });
  }
  next();
};