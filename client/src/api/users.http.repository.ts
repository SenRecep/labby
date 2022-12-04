import axios from "@/helpers/labby.axios";
import { User } from "@/types/User.type";

export class UsersHttpRepository {
  async getUsersAsync() {
    const response = await axios
      .get("/auth")
      .then((x) => x.data)
      .catch((error) => error);
    return response as User[];
  }
}

const instance = new UsersHttpRepository();

export default instance;
