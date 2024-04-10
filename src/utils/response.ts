import { Response } from "express";

interface IError {
  field: string;
  message: string;
}

interface INormalized {
  statusCode: number;
  message: string;
  data?: string[] | object | null | IError[];
}

/**
 * Normalize the response for all endpoints
 * @param res
 * @param normalized
 * @returns Response
 */
export const response = (res: Response, normalized: INormalized): Response => {
  res.setHeader("X-Powered-By", "Ilyn");
  return res.status(normalized.statusCode).json({
    message: normalized.message,
    data: normalized.data,
  });
};
