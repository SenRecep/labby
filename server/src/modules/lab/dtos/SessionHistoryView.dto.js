import UserViewDto from "../../auth/dtos/userView.dto.js";

export class SessionAssistant {
  constructor(sessionAssistant) {
    this.dutyTime = sessionAssistant.changeTime;
    this.user = new UserViewDto(sessionAssistant.user);
  }
}

export class SessionHistoryViewDto {
  constructor(session) {
    this.id = session.id;
    this.openTime = session.openTime;
    this.closeTime = session.closeTime;
    this.assistant = session.assistants.at(-1);
    if (session.assistants.length == 1)
      this.assistant.changeTime = session.openTime;
    if (session.assistants.length > 1)
      this.assistant.changeTime = session.assistants.at(-2).changeTime;

    this.assistant = new SessionAssistant(this.assistant);
    this.entries = session.userSessions.length;
    this.visitors = session.visitors;
  }
}
