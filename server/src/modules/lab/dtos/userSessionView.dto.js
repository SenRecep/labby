import UserViewDto from "../../auth/dtos/userView.dto.js";

export class UserSessionViewDto {
  constructor(userSession) {
    this.id = userSession.id;
    this.entryTime = userSession.entryTime;
    this.exitTime = userSession.exitTime;
    if (userSession.user) this.user = new UserViewDto(userSession.user);
  }
}
