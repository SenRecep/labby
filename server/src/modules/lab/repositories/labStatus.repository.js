import sessionQueryRepository from "./sessionQuery.repository.js";
import userSessionRepository from "./userSessions.repository.js";

class labStatusRepository {
  async getOpenOrClose() {
    const lab = await sessionQueryRepository.getThisDate();
    if (lab.closeTime == null && lab.openTime) {
      return "Open";
    } else {
      return "Close";
    }
  }

  async getNumberOfUsersInLab(){
    const number = (await userSessionRepository.getAllUsersInLab()).length;
    return number;
  }

  async getIntensity(){
    const number = (await userSessionRepository.getAllUsersInLab()).length;
    const rate = (number*100)/50;
    return `%${rate}`;
  }

  async getLabStatus(){

    return{status: await this.getOpenOrClose(),count:await this.getNumberOfUsersInLab(),intensity:await this.getIntensity()}
  }
}

const instance = new labStatusRepository();

export default instance;

export { instance };
