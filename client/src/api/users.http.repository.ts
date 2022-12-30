import axios from "@/helpers/labby.axios";
import { User } from "@/types/User.interface";
import { HttpRepositoryBase } from "./HttpRepositoryBase";
import { useAuthStore } from "../stores/auth.store";

export class UsersHttpRepository extends HttpRepositoryBase {
  async getUsersAsync() {
    const response = await this.send(axios.get("/users"));
    return response as User[];
  }
  async updateToken(token: any) {
    const authStore = useAuthStore();
    if (!authStore.isAuthenticated) return;
    const response = await this.send(
      axios.patch("/users", {
        token: token,
        userId: authStore.user?.id,
      })
    );
    return response as User;
  }
  getHistory(callback: ((data: any) => void) | undefined = undefined) {
    return this.send(axios.get(`/usersession/userhistory`), callback);
  }
}

const instance = new UsersHttpRepository();

export default instance;
