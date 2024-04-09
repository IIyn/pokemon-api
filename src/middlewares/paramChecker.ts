import { NextFunction, Request, Response } from "express";
import { response } from "@src/utils/response";

export const idParamChecker = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  if (!id) {
    return response(res, {
      statusCode: 400,
      message: "Bad request",
    });
  } else if (isNaN(parseInt(id))) {
    return response(res, {
      statusCode: 400,
      message: "Bad request",
    });
  }
  next();
};

export const setParamChecker = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { set } = req.params;
  if (!set) {
    return response(res, {
      statusCode: 400,
      message: "Bad request",
    });
  } else if (isNaN(parseInt(set))) {
    return response(res, {
      statusCode: 400,
      message: "Bad request",
    });
  }
  next();
};
