import { ApiError } from "../../../common/apiError.js";
import HttpStatusCodes from "http-status-codes";
import VerificationCode from "../models/VerificationCode.schema.js";
import userRepository from "../../auth/repositories/user.repository.js";
import {GenerateCode} from "../transactions/codeGenerator.js";
import moment from "moment";


class VerificationCodeRepository {
    async CreateCode(email){
        const user=await userRepository.getByEmail(email);
        if(!user)
        throw new ApiError("User not found",HttpStatusCodes.NOT_FOUND,'VerificationCodeRepository')
        const now=new Date();
        const expired=moment(now).add(30, 'm').toDate();
        const verificationCode= await VerificationCode.create({code: GenerateCode(), user:user, expiredTime:expired,isUsed:false});
        return verificationCode;
    }

    async VerifyCode(email,code){
        const user=await userRepository.getByEmail(email);
        if(!user)
            throw new ApiError("User not found",HttpStatusCodes.NOT_FOUND,'VerificationCodeRepository')

        const found = await VerificationCode.findOne({code:code,user:user.id,isUsed:false});
        if(!found)
            throw new ApiError("Code is invalid",HttpStatusCodes.BAD_REQUEST,'VerificationCodeRepository')
        if(found.expiredTime<new Date())
             throw new ApiError("Expired Code",HttpStatusCodes.BAD_REQUEST,'VerificationCodeRepository')
        return true;
    }

     DisableCode(code,userId){
        return VerificationCode.findOneAndUpdate({code:code,user:userId},{isUsed:true});
    }
  
}

const instance = new VerificationCodeRepository();

export default instance;

export { instance };
