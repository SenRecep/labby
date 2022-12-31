import authRoute from "../modules/auth/routers/auth.route.js";
import userRoute from "../modules/auth/routers/user.route.js";
import adminRoute from "../modules/admin/routers/admin.route.js";
import sessionRoute from "../modules/lab/routers/session.route.js";
import userSessionRoute from "../modules/lab/routers/userSession.route.js";
import sessionAssistantRoute from "../modules/lab/routers/sessionAssistant.route.js";
import forgotPasswordRoute from "../modules/email/routers/password.route.js";
import {
  requiredAuthMiddleware,
  requiredRoleMiddleware,
} from "../middlewares/auth.middleware.js";
import { RoleInfo } from "../constants/roleInfo.js";

export const useRoutes = (app) => {
  app.use("/api/auth", authRoute);
  app.use("/api/users", userRoute);
  app.use(
    "/api/admin",
    requiredAuthMiddleware,
    requiredRoleMiddleware([RoleInfo.admin]),
    adminRoute
  );
  app.use("/api/session", requiredAuthMiddleware, sessionRoute);
  app.use("/api/usersession", requiredAuthMiddleware, userSessionRoute);
  app.use(
    "/api/sessionassistant",
    requiredAuthMiddleware,
    requiredRoleMiddleware([RoleInfo.assistant]),
    sessionAssistantRoute
  );
  app.use("/api/forgotpassword", forgotPasswordRoute);
};
