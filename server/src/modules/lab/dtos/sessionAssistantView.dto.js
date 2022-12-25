import UserViewDto from "../../auth/dtos/userView.dto.js";

export class SessionAssistantViewDto{
    constructor(sessionAssistant){
        this.id=sessionAssistant._id;
        this.changeTime=sessionAssistant.changeTime
        this.user=new UserViewDto(sessionAssistant.user)
    }
}