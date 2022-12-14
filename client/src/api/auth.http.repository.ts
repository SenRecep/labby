import axios from "@/helpers/labby.axios";
import { User } from "@/types/User.interface";
import { HttpRepositoryBase } from "./HttpRepositoryBase";

interface SignInModel {
  email: string;
  password: string;
}

interface SignUpModel {
  email: string;
  password: string;
  name: string;
  surname: string;
  studentNumber: string;
}

export class AuthHttpRepository extends HttpRepositoryBase {
  async signIn(model: SignInModel, callback: (data: any) => void) {
    return this.send(axios.post("/auth", model), callback);
  }
  async signUp(model: SignUpModel, callback: (data: any) => void) {
    return this.send(axios.post("/users", model), callback);
  }
}

const instance = new AuthHttpRepository();

export default instance;
