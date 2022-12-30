import axios from "@/helpers/labby.axios";
import { HttpRepositoryBase } from "./HttpRepositoryBase";
import { Roles } from "@/constants/roles.constant";
import { User } from "@/types/User.interface";

export interface UserSession {
  id: string;
  entryTime: Date;
  exitTime: Date;
  user: User;
}

export class AssistantsHttpRepository extends HttpRepositoryBase {
  getAll(callback: ((data: any) => void) | undefined = undefined) {
    return this.send(axios.get(`/users/role/${Roles.assistant}`), callback);
  }
  change(
    assistants: unknown,
    callback: ((data: any) => void) | undefined = undefined
  ) {
    return this.send(axios.post(`/sessionAssistant`, { assistants }), callback);
  }
  getUsersInLab(callback: ((data: any) => void) | undefined = undefined) {
    return this.send(axios.get(`/usersession/inlab`), callback);
  }
  getUsersToday(callback: ((data: any) => void) | undefined = undefined) {
    return this.send(axios.get(`/usersession/date`), callback);
  }
}

const instance = new AssistantsHttpRepository();

export default instance;
