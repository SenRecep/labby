import authRoute from "./modules/auth/routers/auth.route.js";

export const useRoute = (app) => {
  app.use("/api/auth", authRoute);
};
