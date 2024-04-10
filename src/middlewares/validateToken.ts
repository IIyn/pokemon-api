import { NextFunction, Request, Response } from "express";
import { response } from "@/utils/response";
import { AuthService } from "@/domain/services/AuthService";
import jwt from "jsonwebtoken";
import env from "@/config/env";
import { JwtPayload, Decoded } from "@/types/jwt";

const { JWT_SECRET, REFRESH_SECRET } = env;

/**
 * Verifies that the token is valid
 */
export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("verifyToken", req.cookies);
  try {
    const { accessToken, refreshToken } = req.cookies;
    if (!accessToken || !refreshToken) {
      console.log("no token");
      return response(res, {
        statusCode: 401,
        message: "Unauthorized",
      });
    }
    jwt.verify(accessToken, JWT_SECRET);
    console.log("accessToken verified");

    // check if accessToken is expired
    const decoded: Decoded = jwt.decode(accessToken) as Decoded;
    console.log("decoded", decoded);
    if (decoded && Date.now() >= decoded.exp * 1000) {
      jwt.verify(refreshToken, REFRESH_SECRET);
      console.log("refresh verified");

      // check if refreshToken is expired
      const decodedRefresh: Decoded = jwt.decode(refreshToken) as Decoded;
      console.log("refreshTokenDecoded", decodedRefresh);
      if (decodedRefresh && Date.now() >= decodedRefresh.exp * 1000) {
        console.log("refresh token expired");
        return response(res, {
          statusCode: 401,
          message: "Unauthorized",
        });
      }

      // generate new accessToken
      const newAccessToken = jwt.sign(
        { username: decoded.username },
        JWT_SECRET,
        {
          expiresIn: "2mins",
        }
      );
      res.cookie("accessToken", newAccessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
      });

      // generate new refreshToken
      const newRefreshToken = jwt.sign(
        { username: decoded.username },
        REFRESH_SECRET,
        {
          expiresIn: "3h",
        }
      );

      // update refreshToken in the database
      const authService = new AuthService();
      const user = authService.getUserByUsername(decoded.username);
      if (user) {
        const updatedUser = { ...user, refreshToken: newRefreshToken };
        authService.updateUser(updatedUser);
      }

      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
      });
    }
  } catch (error) {
    return response(res, {
      statusCode: 401,
      message: "Unauthorized",
    });
  }
  next();
};
