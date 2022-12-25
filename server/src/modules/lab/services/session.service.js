import sessionRepository from "../repositories/session.repository.js";
import {SessionViewDto} from '../dtos/sessionView.dto.js'
class sessionService {
  async getAll(date) {
    const session = await sessionRepository.getAll(date);
    const model = session.map((se) => new SessionViewDto(se));
    return model;
  }
  async getByDate() {
    const session = await sessionRepository.getByDate();
    const model= new SessionViewDto(session)
    return model;
  }
  async getById(id) {
    const session = await sessionRepository.getById(id);
    return session;
  }
  async createSession(id) {
    const created = await sessionRepository.createSession(id);
    return new SessionViewDto(created);
  }
  async addCloseTime(date) {
    const created = await sessionRepository.addCloseTime(date);
    return new SessionViewDto(created);
  }
  async getOpenOrClose() {
    const resolve = await sessionRepository.getOpenOrClose();
    return resolve;
  }
}

const instance = new sessionService();

export default instance;

export { sessionService };
