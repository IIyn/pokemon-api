import jwt from "jsonwebtoken";

export interface JwtPayload extends jwt.JwtPayload {
  username: string;
}

export interface Decoded extends JwtPayload {
  exp: number;
}

export type Token = string | null | Decoded;
