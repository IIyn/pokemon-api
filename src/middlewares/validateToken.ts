import { NextFunction, Request, Response } from "express";
import { response } from "@/utils/response";
import { AuthService } from "@/domain/services/AuthService";
import { JwtPayload } from "@/types/jwt";
import jwt from "jsonwebtoken";
import env from "@/config/env";

const { JWT_SECRET } = env;
const authService = new AuthService();

/**
 * Re-generates the token if it is expired
 * @param req - The request
 * @param res - The response
 * @param next - The next function
 */
const reGenerateToken = (req: Request, res: Response, next: NextFunction) => {
  const { accessToken } = req.cookies;
  const decoded = jwt.decode(accessToken) as JwtPayload;
  const isExpired = decoded && decoded.exp * 1000 < Date.now();
  if (isExpired) {
    const newAcces = authService.refreshAccessToken(accessToken);
    res.cookie("accessToken", newAcces, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
    });
  }
  next();
};

/**
 * Verifies that the token is valid
 * @param req - The request
 * @param res - The response
 * @param next - The next function
 */
export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { accessToken } = req.cookies;
    if (!accessToken) {
      return response(res, {
        statusCode: 401,
        message: "Unauthorized",
      });
    }

    jwt.verify(accessToken, JWT_SECRET); // shall throw an error if the token is invalid or expired

    const newAcces = authService.refreshAccessToken(accessToken); // refresh tokens

    res.cookie("accessToken", newAcces, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
    });
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return reGenerateToken(req, res, next);
    } else {
      // clear the cookie if the token is invalid
      res.clearCookie("accessToken");
      return response(res, {
        statusCode: 401,
        message: "Unauthorized",
      });
    }
  }
  next();
};
