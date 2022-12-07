import { roles } from "../../../constants/roleInfo.js";
import authRepository from "../../auth/repositories/auth.repository.js";

class AdminRepository {
  async createAssistant(user) {
    user.role = roles.assistant;
    return await authRepository.create(user);
  }
  getAllUser() {
    return authRepository.getAll();
  }
  deleteUser(id){
    return authRepository.deleteById(id);
  }
}

const instance = new AdminRepository();

export default instance;

export { instance };
