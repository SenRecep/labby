import EmailService from "../services/email.service.js";
import verificationCodeRepository from "../repositories/verificationCode.repository.js";
import userRepository from "../../auth/repositories/user.repository.js";
import handlebars from "handlebars";

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
    userRepository.updatePassword(user.id,password);
}

const createHtmlTemplate=(code)=>{
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