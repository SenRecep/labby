import authRepository from "../repositories/auth.repository.js";

class UserService {
  getAll() {
    return authRepository.getAll();
  }
  getById(id) {
    return authRepository.getById(id);
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
    return authRepository.findOne({ email, password });
  }
}

const instance = new UserService();

export default instance;

export { UserService };
