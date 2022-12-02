import express from "express";
import {deleteByIdRequest, getAllRequest,getByIdRequest,postRequest, updatePasswordByIdRequest} from "../controllers/auth.controller.js";
const router = express.Router();

router.route("/")
.get(getAllRequest)
.post(postRequest)
.put(updatePasswordByIdRequest);

router.route("/:id")
.get(getByIdRequest)
.delete(deleteByIdRequest);

export default router;
