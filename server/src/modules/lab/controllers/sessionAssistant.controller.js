import sessionAssistantService from "../services/sessionAssistant.service.js";
import sessionAssistant from "../models/SessionAssistant.schema.js";
import { ServiceResponse } from "../../../common/serviceResponse.js";
import HttpStatusCodes from "http-status-codes";

export const getAllRequest = async (req, res) => {
  const data = await sessionAssistantService.getAll(req.user.id);
  return res
    .status(HttpStatusCodes.OK)
    .json(ServiceResponse.successWithData(data, HttpStatusCodes.OK));
};

export const postRequest = async (req, res, next) => {
  try {
    const response = await sessionAssistantService.createUser(req.user.id);
    return res
      .status(HttpStatusCodes.CREATED)
      .json(ServiceResponse.successWithData(response, HttpStatusCodes.CREATED));
  } catch (error) {
    next(error);
  }
};

export const getByIdRequest = async (req, res) => {
  const data = await sessionAssistantService.getById(req.params.id);
  return res
    .status(HttpStatusCodes.OK)
    .json(ServiceResponse.successWithData(data, HttpStatusCodes.OK));
};

export default {
  getAllRequest,
  postRequest,
  getByIdRequest,
};

//   export const get = async (req, res) => {
//   console.log(req.user);
//   try {
//     const getAssistant = await sessionAssistant.find({user:req.user.id});
//     console.log("adfjsbjk");
//       res.json(getAssistant);
//   } catch (error) {
//       console.log(error);
//       res.json("getAssistant");
//   }
// };
