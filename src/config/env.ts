import { EnvConfig } from "@/types/env";
import "dotenv/config";

const env: EnvConfig = {
  PORT: parseInt(process.env.PORT || "8000"),
  HOST: process.env.HOST || "localhost",
  JWT_SECRET: process.env.JWT_SECRET || "MonS3cr3tTropBienGardé123:!",
  REFRESH_SECRET:
    process.env.REFRESH_SECRET || "MonS3cr3tTropBienGardé123IlEstR3fr3sh§:!",
  NODE_ENV:
    (process.env.NODE_ENV as "development" | "production" | "test") ||
    "development",
  DATABASE_URL:
    process.env.DATABASE_URL ||
    "postgres://postgres:admin@localhost:5432/pokemon",
  CLIENT_URL: process.env.CLIENT_URL || "http://localhost:3000",
};

export default env;
