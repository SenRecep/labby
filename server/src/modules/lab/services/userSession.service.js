import userSessionRepository from "../repositories/userSessions.repository.js";

class userSessionService {
  async getAllUserSessions(id) {
    const session = await userSessionRepository.getAllUserSessions(id);
    return session;
  }
  async getAllUserSessionsByDate(id) {
    const session = await userSessionRepository.getAllUserSessionsByDate(id);
    return session;
  }
  async getAllUsersInLab(id) {
    const session = await userSessionRepository.getAllUsersInLab(id);
    return session;
  }
  async createUserSession(userId) {
    const created = await userSessionRepository.createUserSession(userId);
    return created;
  }
  async addExitTime(date) {
    const created = await userSessionRepository.addExitTime(date);
    return created;
  }
  async numberOfUsersInLab(id) {
    const session = await userSessionRepository.numberOfUsersInLab(id);
    return session;
  }
}

const instance = new userSessionService();

export default instance;

export { userSessionService };
