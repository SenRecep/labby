import sessionRepository from "../repositories/session.repository.js";
import { SessionViewDto } from "../dtos/sessionView.dto.js";
import { SessionHistoryViewDto } from "../dtos/SessionHistoryView.dto.js";
class SessionService {
  async getAll() {
    const data = await sessionRepository.getAll();
    const model = data.map((se) => new SessionViewDto(se));
    return model;
  }
  async getByDate() {
    const data = await sessionRepository.getByDate();
    const model = new SessionViewDto(data);
    return model;
  }
  async createSession(assistantId) {
    const data = await sessionRepository.createSession(assistantId);
    return new SessionViewDto(data);
  }
  async addCloseTime() {
    const data = await sessionRepository.addCloseTime();
    return new SessionViewDto(data);
  }
  async getLabHistory() {
    const data = await sessionRepository.getLabHistory();
    const model = data.map((s) => new SessionHistoryViewDto(s));
    return model;
  }
}

const instance = new SessionService();

export default instance;

export { SessionService };
