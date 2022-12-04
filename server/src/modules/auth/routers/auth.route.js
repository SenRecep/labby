import express from "express";
import { validationResponseMiddleware } from "../../../middlewares/validationResponse.middleware.js";
import {deleteByIdRequest, getAllRequest,getByIdRequest,postRequest, updatePasswordByIdRequest} from "../controllers/auth.controller.js";
const router = express.Router();
import {userValidator} from "../validators/userValidator.js";

router.route("/")
.get(getAllRequest)
.post(userValidator,validationResponseMiddleware,postRequest)
.put(updatePasswordByIdRequest);

router.route("/:id")
.get(getByIdRequest)
.delete(deleteByIdRequest);

export default router;
