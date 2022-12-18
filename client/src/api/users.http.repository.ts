import axios from "@/helpers/labby.axios";
import { User } from "@/types/User.interface";
import { HttpRepositoryBase } from "./HttpRepositoryBase";

export class UsersHttpRepository extends HttpRepositoryBase {
  async getUsersAsync() {
    const response = await this.send(axios.get("/users"));
    return response as User[];
  }
}

const instance = new UsersHttpRepository();

export default instance;
