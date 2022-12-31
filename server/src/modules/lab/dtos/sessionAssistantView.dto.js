import UserViewDto from "../../auth/dtos/userView.dto.js";

export class SessionAssistantViewDto {
  constructor(sessionAssistant) {
    this.dutyTime = sessionAssistant.changeTime;
    this.user = new UserViewDto(sessionAssistant.user);
  }
}
