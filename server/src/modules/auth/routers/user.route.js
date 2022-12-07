import express from "express";
import { validationResponseMiddleware } from "../../../middlewares/validationResponse.middleware.js";
import controller from "../controllers/user.controller.js";
import { userValidator } from "../validators/userValidator.js";
const router = express.Router();

router
  .route("/")
  .get(controller.getAllRequest)
  .post(userValidator, validationResponseMiddleware, controller.postRequest)
  .put(controller.updatePasswordByIdRequest);

router
  .route("/:id")
  .get(controller.getByIdRequest)
  .delete(controller.deleteByIdRequest);

router.route("/role/:role").get(controller.getByRoleRequest);

export default router;
