import axios from "@/helpers/labby.axios";
import { HttpRepositoryBase } from "./HttpRepositoryBase";

interface EmailModel {
  email: string;
}

interface VerificationModel extends EmailModel {
  code: string;
}

interface PasswordModel extends VerificationModel {
  password: string;
}

export class ForgotPasswordHttpRepository extends HttpRepositoryBase {
  async sendEmail(model: EmailModel, callback: (data: any) => void) {
    return this.send(axios.post("/forgotpassword/email", model), callback);
  }
  async sendCode(model: VerificationModel, callback: (data: any) => void) {
    return this.send(axios.post("/forgotpassword/code", model), callback);
  }
  async sendPassword(model: PasswordModel, callback: (data: any) => void) {
    return this.send(axios.put("/forgotpassword/password", model), callback);
  }
}

const instance = new ForgotPasswordHttpRepository();

export default instance;
