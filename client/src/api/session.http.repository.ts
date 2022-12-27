import axios from "@/helpers/labby.axios";
import { HttpRepositoryBase } from "./HttpRepositoryBase";

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
}

const instance = new SessionHttpRepository();

export default instance;
