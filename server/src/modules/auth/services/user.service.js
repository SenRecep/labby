import UserViewDto from "../dtos/userView.dto.js";
import authRepository from "../repositories/auth.repository.js";

class UserService {
  async getAll() {
    const users = await authRepository.getAll();
    const models = users.map((user) => new UserViewDto(user));
    return models;
  }
 async getUsers(role){
  try {
    const users = await authRepository.getByRole(role);
    const models = users.map((user) => new UserViewDto(user));
    return models;
  } catch (error) {
    throw Error;
  }
    
  }
  async getById(id) {
    const user = await authRepository.getById(id);
    const model = new UserViewDto(user);
    return model;
  }
  async createUser(user) {
    try {
      return await authRepository.create(user);
    } catch (Error) {
      throw Error;
    }
  }
  deleteUser(id) {
    return authRepository.deleteById(id);
  }
  updatePassword(user) {
    return authRepository.updateById(user);
  }
  getUser({ email, password }) {
    try {
      console.log("asfdg");
      return authRepository.findOne({ email, password });
    } catch (error) {
      throw new Error(error);
    }
  }
}

const instance = new UserService();

export default instance;

export { UserService };
