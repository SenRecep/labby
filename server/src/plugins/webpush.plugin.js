import webPush from "web-push";

const vapidKeys = {
  publicKey: process.env.PUSH_PUBLIC,
  privateKey: process.env.PUSH_PRIVATE,
};

console.log(vapidKeys);

webPush.setVapidDetails(
  "mailto:abc@mail.com",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

export default webPush;
