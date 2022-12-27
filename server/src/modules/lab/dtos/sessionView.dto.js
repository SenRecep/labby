import { SessionAssistantViewDto } from "./sessionAssistantView.dto.js";
import { UserSessionViewDto } from "./userSessionView.dto.js";

export class SessionViewDto{
    check(prop){
        return prop && Array.isArray(prop)&& prop.length>0 && Object.keys(prop[0]).length>0
    }
    constructor(session){
        this.id=session._id
        this.openTime=session.openTime;
        this.closeTime=session.closeTime;
        if(this.check(session.userSessions))
            this.users=session.userSessions.map(us=>(new UserSessionViewDto(us)));
            console.log(session.assistants);
        if(this.check(session.assistants))
            this.assistants=session.assistants.map(a=>(new SessionAssistantViewDto(a)));
    }
}