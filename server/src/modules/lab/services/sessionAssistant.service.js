import sessionAssistantRepository from "../repositories/sessionAssistant.repository.js";
import { SessionAssistantViewDto } from "../dtos/sessionAssistantView.dto.js";

class SessionAssistantService {
  async changeAssistant(assistantId) {
    const user = await sessionAssistantRepository.changeAssistant(assistantId);
    return new SessionAssistantViewDto(user);
  }
}

const instance = new SessionAssistantService();

export default instance;

export { SessionAssistantService };
