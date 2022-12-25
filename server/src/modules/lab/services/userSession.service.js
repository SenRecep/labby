import userSessionRepository from "../repositories/userSessions.repository.js";
import {UserSessionViewDto} from '../dtos/userSessionView.dto.js';

class userSessionService {
  async getAllUserSessions() {
    const session = await userSessionRepository.getAllUserSessions();
    const model = session.map((se) => new UserSessionViewDto(se));
    return model;
  }
  async getAllUserSessionsByDate(id) {
    const session = await userSessionRepository.getAllUserSessionsByDate(id);
    return new UserSessionViewDto(session);
  }
  async getAllUsersInLab(id) {
    const session = await userSessionRepository.getAllUsersInLab(id);
    const model = session.map((se) => new UserSessionViewDto(se));
    return model;
  }
  async createUserSession(userId) {
    const created = await userSessionRepository.createUserSession(userId);
    return new UserSessionViewDto(created);
  }
  async addExitTime(date) {
    const created = await userSessionRepository.addExitTime(date);
    return new UserSessionViewDto(created);
  }
  async numberOfUsersInLab(id) {
    const session = await userSessionRepository.numberOfUsersInLab(id);
    return session;
  }
}

const instance = new userSessionService();

export default instance;

export { userSessionService };
