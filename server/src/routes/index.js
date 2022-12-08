import authRoute from "../modules/auth/routers/auth.route.js";
import userRoute from "../modules/auth/routers/user.route.js";
import adminRoute from "../modules/admin/routers/admin.route.js";

export const useRoutes = (app) => {
  app.use("/api/auth", authRoute);
  app.use("/api/users", userRoute);
  app.use("/api/admin", adminRoute);
};