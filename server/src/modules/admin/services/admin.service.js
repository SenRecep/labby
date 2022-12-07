import UserViewDto from "../../auth/dtos/userView.dto.js";
import adminRepository from "../repositories/admin.repository.js";

class AdminService {
  async getAllUser() {
    const users = await adminRepository.getAllUser();
    const models = users.map((user) => new UserViewDto(user));
    return models;
  }

  async createAssistant(user) {
    try {
      return await adminRepository.createAssistant(user);
    } catch (error) {
      throw Error;
    }
  }

  async deleteUser(id){
    try {
        return await adminRepository.deleteUser(id);
    } catch (error) {
        throw Error;
    }
  }
}

const instance = new AdminService();

export default instance;

export { AdminService };
