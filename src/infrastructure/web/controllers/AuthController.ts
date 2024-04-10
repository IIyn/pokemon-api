import { Request, Response, NextFunction } from "express";
import { response } from "@/utils/response";
import { AuthService } from "@/domain/services/AuthService";
import jwt from "jsonwebtoken";
import env from "@/config/env";
import { User } from "@/domain/entities/User";
import { randomUUID } from "crypto";

const { JWT_SECRET, REFRESH_SECRET } = env;

const authService = new AuthService();

const generateTokens = (username: string) => {
  const accessToken = jwt.sign({ username }, JWT_SECRET, {
    expiresIn: "2mins",
  });

  const refreshToken = jwt.sign({ username }, REFRESH_SECRET, {
    expiresIn: "3h",
  });

  return { accessToken, refreshToken };
};

export const register = (req: Request, res: Response) => {
  console.log("register");
  try {
    const { username, password } = req.body;
    const { accessToken, refreshToken } = generateTokens(username);
    const user: User = {
      id: randomUUID(),
      username,
      password,
      refreshToken,
    };

    authService.createUser(user);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
    });
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
    });

    response(res, {
      statusCode: 200,
      message: "OK",
    });
  } catch (error) {
    response(res, {
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
};

export const login = (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    if (authService.verifyUser(username, password)) {
      const { accessToken, refreshToken } = generateTokens(username);

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
      });
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
      });
      response(res, {
        statusCode: 200,
        message: "OK",
      });
    } else {
      response(res, {
        statusCode: 401,
        message: "Unauthorized",
      });
    }
  } catch (error) {
    response(res, {
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  response(res, {
    statusCode: 200,
    message: "OK",
  });
};
