import UserViewDto from "../dtos/userView.dto.js";
import userRepository from "../repositories/user.repository.js";

class UserService {
  async getAll() {
    const users = await userRepository.getAll();
    const models = users.map((user) => new UserViewDto(user));
    return models;
  }
  async getAllByRole(role) {
    const users = await userRepository.getAllByRole(role);
    const models = users.map((user) => new UserViewDto(user));
    return models;
  }
  async getById(id) {
    const user = await userRepository.getById(id);
    return new UserViewDto(user);
  }
  async createUser(user) {
    const created = await userRepository.create(user);
    return new UserViewDto(created);
  }
  deleteUser(id) {
    return userRepository.deleteById(id);
  }
  async updatePassword(user) {
    const updated = await userRepository.updatePassword(user);
    return new UserViewDto(updated);
  }
  async updateToken(user) {
    const updated = await userRepository.updateToken(user);
    return new UserViewDto(updated);
  }
}

const instance = new UserService();

export default instance;

export { UserService };
