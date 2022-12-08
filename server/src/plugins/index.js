import { useMongoDB } from "./mongodb.plugin.js";
import cors from "cors";
import { json } from "express";
import { useRoutes } from "../routes/index.js";
import { errorHandlerMiddleware } from "../middlewares/errorHandler.middleware.js";

const usePlugins = (app) => {
  app.use(cors());
  app.use(json());
  useRoutes(app);
  app.use(errorHandlerMiddleware);
};

export { useMongoDB, usePlugins };
