import userSessionRepository from "../repositories/userSessions.repository.js";
import { UserSessionViewDto } from "../dtos/userSessionView.dto.js";

class UserSessionService {
  async getAllUserSessionsByDate() {
    const session = await userSessionRepository.getAllUserSessionsByDate();
    const model = session.map((se) => new UserSessionViewDto(se));
    return model;
  }
  async getAllUsersInLab() {
    const session = await userSessionRepository.getAllUsersInLab();
    const model = session.map((se) => new UserSessionViewDto(se));
    return model;
  }
  async createUserSession(userId) {
    const created = await userSessionRepository.createUserSession(userId);
    return new UserSessionViewDto(created);
  }
  async addExitTime(userId) {
    const created = await userSessionRepository.addExitTime(userId);
    return new UserSessionViewDto(created);
  }

  async isUserInLab(userId) {
    const result = await userSessionRepository.isUserInLab(userId);
    return result;
  }
  async getUserSessionsByUserId(userId) {
    const sessions = await userSessionRepository.getUserSessionsByUserId(
      userId
    );
    const model = sessions.map((se) => new UserSessionViewDto(se));
    return model;
  }
}

const instance = new UserSessionService();

export default instance;

export { UserSessionService };
