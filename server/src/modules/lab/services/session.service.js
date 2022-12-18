import sessionRepository from "../repositories/session.repository.js";

class sessionService {
  async getAll(date) {
    const session = await sessionRepository.getAll(date);
    return session;
  }
  async getByDate() {
    const session = await sessionRepository.getDate();
    return session;
  }
  async getById(id) {
    const session = await sessionRepository.getById(id);
    return session;
  }
  async getByAssistantId(id) {
    const session = await sessionRepository.getByAssistantId(id);
    return session;
  }
  async createSession(id) {
    const created = await sessionRepository.createSession(id);
    return created;
  }
  async addCloseTime(date) {
    const created = await sessionRepository.addCloseTime(date);
    return created;
  }
  async getOpenOrClose() {
    const created = await sessionRepository.getOpenOrClose();
    return created;
  }
}

const instance = new sessionService();

export default instance;

export { sessionService };
