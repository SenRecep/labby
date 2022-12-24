import nodemailer from "nodemailer";

class MailService{
    constructor(){
        let mailTransporter=nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:process.env.MAIL_ADDRESS,
                pass:process.env.MAIL_PASS
            }
        })
    }

      SendMail(to,subject,message){
        let details={
            from:"labby.auth@gmail.com",
            to:to,
            subject:subject,
            text:message
        }
        
        mailTransporter.sendMail(details,(err)=>{
            if(err){
            console.log(err);
            }
            else{
                console.log("Mail sent to: "+details.to+" successfully.");
            }
        })
    }
}

const instance = new MailService();

export default instance;

export { MailService };


//L@bbyApp45
