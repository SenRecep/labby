import { useMongoDB } from "./mongodb.plugin.js";
import cors from "cors";
import { json } from "express";
import { useRoutes } from "../routes/index.js";

const usePlugins = (app) => {
  app.use(cors());
  app.use(json());

  useRoutes(app);
};

export { useMongoDB, usePlugins };
