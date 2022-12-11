import axios from "@/helpers/labby.axios";
import { User } from "@/types/User.interface";
import { HttpRepositoryBase } from "./HttpRepositoryBase";

interface SignInModel {
  email: string;
  password: string;
}

export class AuthHttpRepository extends HttpRepositoryBase {
  async signIn(model: SignInModel, callback: (data: any) => void) {
    return this.send(axios.post("/auth", model), callback);
  }
}

const instance = new AuthHttpRepository();

export default instance;
