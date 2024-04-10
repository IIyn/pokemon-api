import { NextFunction, Request, Response } from "express";
import { response } from "@/utils/response";

/**
 * Verifies that the parameter is a number
 * @param param - The parameter to check
 */
const paramChecker = (
  param: "id" | "set",
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

/**
 * verifies that the id parameter is a number
 */
export const idChecker = (req: Request, res: Response, next: NextFunction) => {
  paramChecker("id", req, res, next);
};

/**
 * verifies that the set parameter is a number
 */
export const setChecker = (req: Request, res: Response, next: NextFunction) => {
  paramChecker("set", req, res, next);
};
