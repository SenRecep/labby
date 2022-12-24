import { useMongoDB } from "./mongodb.plugin.js";
import morgan from "morgan";
import cors from "cors";
import { json } from "express";
import { useRoutes } from "../routes/index.js";
import { errorHandlerMiddleware } from "../middlewares/errorHandler.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { notFoundMiddleware } from "../middlewares/notfound.middleware.js";
import morganConfig from "./morgan.plugin.js";


const usePlugins = (app) => {
  app.use(cors());
  app.use(json());
  
  app.use(morgan(morganConfig));

  app.use(authMiddleware);
  useRoutes(app);
  app.use(errorHandlerMiddleware);
  app.use(notFoundMiddleware);
};

export { useMongoDB, usePlugins };
