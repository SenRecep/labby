import express from "express";
import { validationResponseMiddleware } from "../../../middlewares/validationResponse.middleware.js";
import {deleteByIdRequest, getAllRequest,getByIdRequest,postRequest, updatePasswordByIdRequest,signIn} from "../controllers/auth.controller.js";
const router = express.Router();
import {userValidator} from "../validators/userValidator.js";

router.route("/")
.get(getAllRequest)
.post(userValidator,validationResponseMiddleware,postRequest)
.put(updatePasswordByIdRequest);

router.route("/:id")
.get(getByIdRequest)
.delete(deleteByIdRequest);

router.route("/sig")
.post(signIn);

export default router;
