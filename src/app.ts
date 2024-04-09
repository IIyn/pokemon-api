import express, { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

import env from "@/config/env";
import router from "@/infrastructure/web/routes/PokemonsRoutes";

const app = express();
const { PORT, HOST } = env;

app.use(router);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.listen(PORT, HOST, () => {
  console.log(`Server is running on port http://${HOST}:${PORT}`);
});
