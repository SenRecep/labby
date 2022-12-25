import nodemailer from "nodemailer";

class MailService{
      SendMail(to,subject,message){
        this.InitCredentials();
        let details={
            from:"labby.auth@gmail.com",
            to:to,
            subject:subject,
            text:message
        }

        
        
        this.mailTransporter.sendMail(details,(err)=>{
            if(err){
            console.log(err);
            }
            else{
                console.log("Mail sent to: "+details.to+" successfully.");
            }
        })
    }

    SendMailWithTemplates(to,subject,html){
        this.InitCredentials();
        let details={
            from:"labby.auth@gmail.com",
            to:to,
            subject:subject,
            html:html
        }
        
        this.mailTransporter.sendMail(details,(err)=>{
            if(err){
            console.log(err);
            }
            else{
                console.log("Mail sent to: "+details.to+" successfully.");
            }
        })
    }

    InitCredentials(){
        this.mailTransporter=nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:process.env.MAIL_ADDRESS,
                pass:process.env.MAIL_PASS
            }
        })
    }

}

const instance = new MailService();

export default instance;

export { MailService };