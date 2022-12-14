import userSessionRepository from "../repositories/userSessions.repository.js";

class userSessionService {
  async getAllUserSessions() {
    const session = await userSessionRepository.getAllUserSessions();
    return session;
  }
  async createUserSession(session) {
    const created = await userSessionRepository.createUserSession(session);
    return created;
  }
}

const instance = new userSessionService();

export default instance;

export { userSessionService };
