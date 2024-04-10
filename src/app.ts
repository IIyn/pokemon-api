import express, { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

import router from "@/infrastructure/web/routes";
import env from "@/config/env";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import { swaggerDefinition } from "./swagger";

const app = express();
const { PORT, HOST, NODE_ENV } = env;

const options = {
  swaggerDefinition: swaggerDefinition,
  apis: ["src/infrastructure/web/routes/*.ts"],
};
const swaggerSpec = swaggerJsDoc(options);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(router);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

const server = app.listen(PORT, HOST, () => {
  if (NODE_ENV !== "test") {
    console.log(`Server is running on http://${HOST}:${PORT}`);
  }
});

export { app, server };
