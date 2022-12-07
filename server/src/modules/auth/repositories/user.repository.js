import User from "../models/User.schema.js";
import bcrypt from "bcrypt";

class UserRepository {
  async hashPassword(password) {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }
  async create(user) {
    const found = await this.ifExistUser(user.email);
    if (found != null) throw new Error("email has been already exist");
    user.password = await this.hashPassword(user.password);
    return User.create(user);
  }
  ifExistUser(email) {
    return this.getByEmail(email);
  }
  getByEmail(email) {
    return User.findOne({ email: email });
  }
  getAllByRole(role) {
    return User.find({ role });
  }
  getAll() {
    return User.find({});
  }
  getById(id) {
    return User.findById(id);
  }
  async getByEmailAndPassword(email, password) {
    const found = await this.ifExistUser(email);
    if (!found) throw new Error("Not found user");
    const isCompare = await bcrypt.compare(password, found.password);
    if (!isCompare) throw new Error("Invalid email or password");
    return found;
  }
  deleteById(id) {
    return User.findByIdAndDelete(id);
  }
  async updatePassword({ id, password }) {
    password = await this.hashPassword(password);
    return User.findByIdAndUpdate(id, { password }, { new: true });
  }
}

const instance = new UserRepository();

export default instance;

export { instance };
