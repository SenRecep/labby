import EmailService from "../services/email.service.js";
import verificationCodeRepository from "../repositories/verificationCode.repository.js";
import userRepository from "../../auth/repositories/user.repository.js";
import { ApiError } from "../../../common/apiError.js";

export const sendVerificationCode=async(email)=>{
   const verificationCode= await verificationCodeRepository.CreateCode(email);
   EmailService.SendMail(email,"Renew your password!",verificationCode.code);
}

export const verifyCode=async(email,code)=>{
    const isCodeValid=await verificationCodeRepository.VerifyCode(email,code);
    return isCodeValid;
}

export const changePassword=async(email,code,password)=>{
    await verifyCode(email,code);
    const user=await userRepository.getByEmail(email);
    userRepository.updatePassword(user.id,password);
}