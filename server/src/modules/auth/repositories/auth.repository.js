import User from "../models/User.schema.js";

class UserRepository {
  async create(user) {
    if ((await this.ifExistUser(user.email)) != null) {
      throw new Error("email has been already exist");
    }
    return User.create(user);
  }
  async ifExistUser(email) {
    const found = await this.getByEmail(email);
    return found;
  }
  getByEmail(email) {
    return User.findOne({ email: email });
  }
  getAll() {
    return User.find({});
  }
  getById(id) {
    return User.findById(id);
  }
  findOne({ email, password }) {
    return User.findOne({ email, password });
  }
  deleteById(id) {
    return User.findByIdAndDelete(id);
  }
  updateById(user) {
    return User.findByIdAndUpdate(
      user.id,
      { password: user.password },
      { new: true }
    );
  }
}

const instance = new UserRepository();

export default instance;

export { instance };
