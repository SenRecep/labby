import SessionAssistant from "../models/SessionAssistant.schema.js";

class sessionAssistantRepository {
  getAll(userId) {
    return SessionAssistant.find({ user: userId }).populate("user");
  }
  getById(id) {
    return User.findById(id);
  }
}

const instance = new sessionAssistantRepository();

export default instance;

export { instance };
