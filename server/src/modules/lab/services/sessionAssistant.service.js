import sessionAssistantRepository from "../repositories/sessionAssistant.repository.js";

class sessionAssistantService {
  async getAll(user) {
    const sessionAssistant = await sessionAssistantRepository.getAll(user);
    return sessionAssistant;
  }
  async getById(id) {
    const user = await sessionAssistantRepository.getById(id);
    return user;
  }
  async createUser(user) {
    const created = await sessionAssistantRepository.createAssistant(user);
    return created;
  }
}

const instance = new sessionAssistantService();

export default instance;

export { sessionAssistantService };
