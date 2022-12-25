import authRoute from "../modules/auth/routers/auth.route.js";
import userRoute from "../modules/auth/routers/user.route.js";
import adminRoute from "../modules/admin/routers/admin.route.js";
import sessionRoute from "../modules/lab/routers/session.route.js";
import userSessionRoute from "../modules/lab/routers/userSession.route.js";
import sessionAssistantRoute from "../modules/lab/routers/sessionAssistant.route.js";

export const useRoutes = (app) => {
  app.use("/api/auth", authRoute);
  app.use("/api/users", userRoute);
  app.use("/api/admin", adminRoute);
  app.use("/api/session",sessionRoute);
  app.use("/api/usersession",userSessionRoute);
  app.use("/api/sessionassistant",sessionAssistantRoute);
};
