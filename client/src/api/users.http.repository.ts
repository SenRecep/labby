import axios from "@/helpers/labby.axios";
import { User } from "@/types/User.interface";

export class UsersHttpRepository {
  async getUsersAsync() {
    const response = await axios
      .get("/users")
      .then((x) => x.data)
      .catch((error) => error);
    return response as User[];
  }
}

const instance = new UsersHttpRepository();

export default instance;
