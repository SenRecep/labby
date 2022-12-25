import {sendVerificationCode, verifyCode, changePassword} from "../transactions/forgotpass.js";
import { ServiceResponse } from "../../../common/serviceResponse.js";
import HttpStatusCodes from "http-status-codes";

export const sendVerificationCodeRequest = async (req, res, next) => {
    const email = req.body.email;
    try {
      const response = await sendVerificationCode(email);
      return res
        .status(HttpStatusCodes.CREATED)
        .json(ServiceResponse.successWithData(response, HttpStatusCodes.CREATED));
    } catch (error) {
      next(error);
    }
  };

  export const verificationCodeRequest = async (req, res, next) => {
    const {email,code} = req.body;
    try {
      const response = await verifyCode(email,code);
      return res
        .status(HttpStatusCodes.CREATED)
        .json(ServiceResponse.successWithData(response, HttpStatusCodes.CREATED));
    } catch (error) {
      next(error);
    }
  };

  export const changePasswordRequest= async (req, res, next) => {
    const {email,code,password} = req.body;
    try {
      const response = await changePassword(email,code,password);
      return res
        .status(HttpStatusCodes.CREATED)
        .json(ServiceResponse.successWithData(response, HttpStatusCodes.CREATED));
    } catch (error) {
      next(error);
    }
  };
export default {
    sendVerificationCodeRequest,
    verificationCodeRequest,
    changePasswordRequest
};

