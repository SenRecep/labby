import axios from "@/helpers/labby.axios";
import { HttpRepositoryBase } from "./HttpRepositoryBase";

export interface LabStatus {
  status: string;
  count: number;
  intensity: string;
}

export class LabHttpRepository extends HttpRepositoryBase {
  async get(callback: (data: any) => void) {
    return this.send(axios.get("/session/lab"), callback);
  }
}

const instance = new LabHttpRepository();

export default instance;
