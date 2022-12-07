import authRoute from "./modules/auth/routers/auth.route.js";
import adminRoute from "./modules/admin/routers/admin.route.js";

export const useRoute = (app) => {
  app.use("/api/auth", authRoute);
};

export const usRoute = (app) => {
  app.use("/admin", adminRoute);
};
