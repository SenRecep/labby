import { SessionAssistantViewDto } from "./sessionAssistantView.dto.js";

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

    this.assistant = new SessionAssistantViewDto(this.assistant);
    this.entries = session.userSessions.length;
    this.visitors = session.visitors;
  }
}
