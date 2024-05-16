/**
 * Interface for the environment variables.
 * @interface EnvConfig
 * @property {number} PORT - The port of the server
 * @property {string} HOST - The host of the server
 * @property {string} JWT_SECRET - The secret for the JWT
 * @property {string} REFRESH_SECRET - The secret for the refresh token
 * @property {"development" | "production" | "test"} NODE_ENV - The environment of the server
 */
export interface EnvConfig {
  PORT: number;
  HOST: string;
  JWT_SECRET: string;
  REFRESH_SECRET: string;
  NODE_ENV: "development" | "production" | "test";
  DATABASE_URL: string;
}
