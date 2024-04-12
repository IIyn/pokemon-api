/**
 * JWT Payload
 * @interface JwtPayload
 * @property {string} userId - The id of the user
 * @property {number} exp - The expiration time of the token
 * @property {string} iat - The time the token was issued
 */
export type JwtPayload = {
  userId: string;
  exp: number;
  iat: number;
};
