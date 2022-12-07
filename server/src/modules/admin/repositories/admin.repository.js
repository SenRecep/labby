import { RoleInfo } from "../../../constants/roleInfo.js";
import userRepository from "../../auth/repositories/user.repository.js";

class AdminRepository {
  createAssistant(user) {
    user.role = RoleInfo.assistant;
    return userRepository.create(user);
  }
}

const instance = new AdminRepository();

export default instance;

export { instance };
