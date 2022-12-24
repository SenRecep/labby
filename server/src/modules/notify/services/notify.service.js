import webPush from "../../../plugins/webpush.plugin.js";

class NotificationService{
  async SendNotification(users=[],message=""){
    users.forEach((userSession) => {
      webPush.sendNotification(userSession.user.registrationToken, message);
    });
  }

  async SendToOne(token,message=""){
    await  webPush.sendNotification(token, message).then(res=>{
      console.log(res);
    });
  }

}

const instance = new NotificationService();

export default instance;

export { NotificationService };
