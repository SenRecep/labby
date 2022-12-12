import Session from "../models/Session.schema.js";
import sessionAssistant from "../models/SessionAssistant.schema.js";

class sessionAssistantRepository {
  async createAssistant(userId) {
    const saved = await sessionAssistant.create({
      user: userId,
    });
    return saved;
  }
  getAll(userId) {
    return sessionAssistant.find({ user: userId }).populate("user");
  }
  getById(id) {
    return User.findById(id);
  }
}

const instance = new sessionAssistantRepository();

export default instance;

export { instance };
