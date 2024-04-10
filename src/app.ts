import express, { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

import router from "@/infrastructure/web/routes";
import env from "@/config/env";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

const app = express();
const { PORT, HOST } = env;

// swagger docs
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Express-TS-API",
    version: "1.0.0",
    description: "Express and Typescript API",
  },
  servers: [
    {
      url: `http://${HOST}:${PORT}`,
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearer: "JWT",
      },
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ["src/infrastructure/web/routes/*.ts"],
};
const swaggerSpec = swaggerJsDoc(options);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 */

app.use(router);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.listen(PORT, HOST, () => {
  console.log(`Server is running on port http://${HOST}:${PORT}`);
});
