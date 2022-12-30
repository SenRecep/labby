import axios from "@/helpers/labby.axios";
import { HttpRepositoryBase } from "./HttpRepositoryBase";
import { User } from "@/types/User.interface";

export interface SessionAssistant {
  dutyTime: string;
  user: User;
}

export interface SessionHistory {
  id: string;
  assistant: SessionAssistant;
  closeTime: string;
  openTime: string;
  visitors: number;
  entries: number;
}

export class SessionHttpRepository extends HttpRepositoryBase {
  get(callback: ((data: any) => void) | undefined = undefined) {
    return this.send(axios.get("/usersession"), callback);
  }
  checkIn(callback: ((data: any) => void) | undefined = undefined) {
    return this.send(axios.post("/usersession", {}), callback);
  }
  checkOut(callback: ((data: any) => void) | undefined = undefined) {
    return this.send(axios.put("/usersession"), callback);
  }
  getSessionHistory(callback: ((data: any) => void) | undefined = undefined) {
    return this.send(axios.get("/session/history"), callback);
  }
}

const instance = new SessionHttpRepository();

export default instance;
