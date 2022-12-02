import authRepository from "../repositories/auth.repository.js";

class UserService {
  getAll() {
    return authRepository.getAll();
  }
  getById(id) {
    return authRepository.getById(id);
  }
  createUser(user) {
    return authRepository.create(user);
  }
  deleteUser(id) {
    return authRepository.deleteById(id);
  }
  updatePassword(user){
    return authRepository.updateById(user);
  }
}

const instance = new UserService();

export default instance;

export { UserService };
