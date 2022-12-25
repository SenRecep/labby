self.addEventListener("push", (e) => {
  console.log(e);
  console.log(e.data.text());
  const chain = self.registration.showNotification("Labby", {
    requireInteraction: true,
    body: e.data.text(),
    badge:
      "https://cdn2.iconfinder.com/data/icons/stationary-19/100/Thumb_Tack-128.png",
    icon: "https://cdn4.iconfinder.com/data/icons/seo-fourteen-black-and-white/128/button-turn_on-start-push-128.png",
    vibrate: [100, 100, 100],
    action: "https://www.google.com",
  });
  e.waitUntil(chain);
});
self.addEventListener("notificationclick", (event) => {
  console.log(event);
  event.notification.close();
  clients.openWindow("https://www.google.com");
});
