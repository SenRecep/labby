import adminRepository from "../repositories/admin.repository.js";
import UserViewDto from "../../auth/dtos/userView.dto.js";

class AdminService {
  async createAssistant(user) {
    const created = await adminRepository.createAssistant(user);
    return new UserViewDto(created);
  }
}

const instance = new AdminService();

export default instance;

export { AdminService };
