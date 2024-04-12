import { Response } from "express";
/**
 * Interface for error
 * @interface IError
 * @property {string} field - The field of the error
 * @property {string} message - The message of the error
 */
interface IError {
  field: string;
  message: string;
}

/**
 * Interface for normalized response
 * @interface INormalized
 * @property {number} statusCode - The status code of the response
 * @property {string} message - The message of the response
 * @property {string[] | object | null | IError[]} data - The data of the response
 */
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
