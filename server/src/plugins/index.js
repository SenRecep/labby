import { useMongoDB } from "./mongodb.plugin.js";
import cors from "cors";
import { json } from "express";
import { useRoutes } from "../routes/index.js";
import { errorHandlerMiddleware } from "../middlewares/errorHandler.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { notFoundMiddleware } from "../middlewares/notfound.middleware.js";

const usePlugins = (app) => {
  app.use(cors());
  app.use(json());

  app.use(authMiddleware);
  useRoutes(app);
  app.use(errorHandlerMiddleware);
  app.use(notFoundMiddleware);
};

export { useMongoDB, usePlugins };
