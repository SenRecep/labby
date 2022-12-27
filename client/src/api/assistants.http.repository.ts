import axios from "@/helpers/labby.axios";
import { HttpRepositoryBase } from "./HttpRepositoryBase";
import { Roles } from "@/constants/roles.constant";

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
}

const instance = new AssistantsHttpRepository();

export default instance;
