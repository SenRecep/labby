import User from "../models/User.schema.js";

class UserRepository {
  create(user) {
    if(this.ifExistUser(user.email)) {
      throw new Error("email has been already exist");
    }
    return User.create(user);
  }
  async ifExistUser(email) {
    const found = await this.getByEmail(email);
    return found != null;
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
  deleteById(id) {
    return User.findByIdAndDelete(id);
  }
  updateById(user) {
    return User.findByIdAndUpdate(user.id, { password: user.password },{new:true});
  }
}

const instance = new UserRepository();

export default instance;

export { instance };
