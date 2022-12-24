import webPush from "web-push";

const vapidKeys = {
  publicKey: process.env.PUSH_PUBLIC || "BKnPdI0sqgpEBpqXLcO4OTb5lpUQ7O_-xB6KgWqf1Tgys4qjC7AshdAURJPbnB_p421dlmCSz-j_lJf9-zuqlHk",
  privateKey: process.env.PUSH_PRIVATE || "7tHUb8j-lAi8kP4sxtEfB1GrU-kt6JVvSXRjvwd96YA",
};

webPush.setVapidDetails(
  "mailto:abc@mail.com",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

export default webPush;