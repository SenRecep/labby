import sessionQueryRepository from "./sessionQuery.repository.js";
import userSessionRepository from "./userSessions.repository.js";
import sessionAssistantRepository from "./sessionAssistant.repository.js";
import { LabInfo } from "../../../constants/labInfo.js";
import UserViewDto from "../../auth/dtos/userView.dto.js";

class labStatusRepository {
  getOpenOrClose(session) {
    return session.closeTime == null && session.openTime
      ? LabInfo.status.open
      : LabInfo.status.close;
  }

  getNumberOfUsersInLab(users) {
    return users.length;
  }

  getIntensity(users) {
    const rate = (users.length / LabInfo.capacity) * 100;
    return `%${rate.toFixed(0)}`;
  }

  async getLabStatus() {
    const session = await sessionQueryRepository.getToday();
    const users = await userSessionRepository.getAllUsersInLab(session);
    const assistant = await sessionAssistantRepository.getAssistant(session);
    return {
      status: this.getOpenOrClose(session),
      count: this.getNumberOfUsersInLab(users),
      intensity: this.getIntensity(users),
      assistant: new UserViewDto(assistant),
    };
  }
}

const instance = new labStatusRepository();

export default instance;

export { instance };
