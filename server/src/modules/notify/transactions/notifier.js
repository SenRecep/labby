import { NotificationService } from "../services/notify.servicejs";
import userService from "../../auth/services/user.service.js"
import userSessionService from "../../lab/services/userSession.service.js"


export const pushAll = (message) => {
    userService.getAll().then(users=>{
        NotificationService.SendNotification(users,message);
    })
  };

  export const pushLabNow=(message)=>{
    userSessionService.getAllUsersInLab().then(users=>{
        NotificationService.SendNotification(users,message);
    })
  }

  export const pushLabToday=(message)=>{
    userSessionService.getAllUserSessionsByDate().then(users=>{
        NotificationService.SendNotification(users,message);
    })
  }