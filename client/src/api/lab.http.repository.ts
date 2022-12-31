import axios from "@/helpers/labby.axios";
import { HttpRepositoryBase } from "./HttpRepositoryBase";
import { User } from "@/types/User.interface";

export interface LabStatus {
  status: string;
  count: number;
  intensity: string;
  assistant?: User;
}

export class LabHttpRepository extends HttpRepositoryBase {
  get(callback: ((data: any) => void) | undefined = undefined) {
    return this.send(axios.get("/session/lab"), callback);
  }
  open(
    assistant?: User,
    callback: ((data: any) => void) | undefined = undefined
  ) {
    return this.send(
      axios.post("/session", {
        assistant: assistant?.id,
      }),
      callback
    );
  }
  close(callback: ((data: any) => void) | undefined = undefined) {
    return this.send(axios.put("/session"), callback);
  }
}

const instance = new LabHttpRepository();

export default instance;
