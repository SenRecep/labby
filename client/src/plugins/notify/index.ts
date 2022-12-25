const registerServiceWorker = () => {
  if (!("serviceWorker" in navigator)) return;
  window.addEventListener("load", async () => {
    await navigator.serviceWorker.register("/worker.js");
    console.log("Service Worker Registered");
  });
};

export default registerServiceWorker;
