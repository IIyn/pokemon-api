import { Request, Response, NextFunction } from "express";
import { response } from "@/utils/response";
import { AuthService } from "@/domain/services/AuthService";
import bcrypt from "bcrypt";

const authService = new AuthService();

/**
 * Hash the password
 * @param password
 */
const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

/**
 * Register a user. The password is hashed before being stored
 * @param username
 * @param password
 */
const registerUser = async (username: string, password: string) => {
  authService.createUser({
    username,
    password: await hashPassword(password),
  });
};

/**
 * Autehnticate the user, if the user does not exist, create it. This controller works for both registering and logging in
 * @param req
 * @param res
 */
export const authenticate = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const userExists = await authService.verifyUser(username, password);
    if (!userExists) {
      registerUser(username, password);
    }

    const userCreated = await authService.getUserByUsername(username);
    const accessToken = authService.issueAccessToken(userCreated?.id!);
    authService.issueRefreshToken(userCreated?.id!);
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

/**
 * Logout the user
 * @param req
 * @param res
 */
export const logout = (res: Response) => {
  res.clearCookie("accessToken");
  response(res, {
    statusCode: 200,
    message: "OK",
  });
};
