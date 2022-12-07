import User from "../models/User.schema.js";
import bcrypt from "bcrypt";

class UserRepository {
  async create(user) {
    if ((await this.ifExistUser(user.email)) != null) {
      throw new Error("email has been already exist");
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(user.password, salt);
    user.password = hashPassword;
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
  async findOne({ email, password }) {
    const found = await this.ifExistUser(email);
    if (found === null) {
      throw new Error("not found");
    }

    if (await bcrypt.compare(password, found.password)) {
      return found;
    }
    throw new Error("invalid email or password");
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
