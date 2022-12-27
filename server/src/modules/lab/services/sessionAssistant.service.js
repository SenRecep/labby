import sessionAssistantRepository from "../repositories/sessionAssistant.repository.js";
import {SessionAssistantViewDto} from '../dtos/sessionAssistantView.dto.js';

class sessionAssistantService {
  async getAll(user) {
    const sessionAssistant = await sessionAssistantRepository.getAll(user);
    const model = sessionAssistant.map((se) => new SessionAssistantViewDto(se));
    return model;
  }
  async getById(id) {
    const user = await sessionAssistantRepository.getById(id);
    return new SessionAssistantViewDto(session);
  }
  async postAssistant(id) {
    const user = await sessionAssistantRepository.postAssistant(id);
    return new SessionAssistantViewDto(user);
  }
}

const instance = new sessionAssistantService();

export default instance;

export { sessionAssistantService };
