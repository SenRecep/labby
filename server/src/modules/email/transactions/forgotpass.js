import EmailService from "../services/email.service.js";
import verificationCodeRepository from "../repositories/verificationCode.repository.js";
import userRepository from "../../auth/repositories/user.repository.js";
import handlebars from "handlebars";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

export const sendVerificationCode=async(email)=>{
   const verificationCode= await verificationCodeRepository.CreateCode(email);
   const htmlTemplate=createHtmlTemplate(verificationCode.code); 
   EmailService.SendMailWithTemplates(email,'Renew your password!',htmlTemplate);
}

export const verifyCode=async(email,code)=>{
    const isCodeValid=await verificationCodeRepository.VerifyCode(email,code);
    return isCodeValid;
}

export const changePassword=async(email,code,password)=>{
    await verifyCode(email,code);
    const user=await userRepository.getByEmail(email);
    await userRepository.updatePassword({id:user.id,password});
    await verificationCodeRepository.DisableCode(code,user.id);
}

const createHtmlTemplate=(code)=>{
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const filePath = path.join(__dirname, '../templates/forgotPassword.html');
    const source = fs.readFileSync(filePath, 'utf-8').toString();
    const template = handlebars.compile(source);
    const replacements = {
      code: code
    };
    const htmlToSend = template(replacements);
    return htmlToSend;
}

export default {sendVerificationCode,verifyCode,changePassword};
