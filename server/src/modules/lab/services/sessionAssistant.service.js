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
}

const instance = new sessionAssistantService();

export default instance;

export { sessionAssistantService };
