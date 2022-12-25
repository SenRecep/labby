import usersHttpRepository from "../../api/users.http.repository";
export async function sub() {
  const worker = await navigator.serviceWorker.ready;
  const token = await worker.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey:
      "BKnPdI0sqgpEBpqXLcO4OTb5lpUQ7O_-xB6KgWqf1Tgys4qjC7AshdAURJPbnB_p421dlmCSz-j_lJf9-zuqlHk",
  });
  await usersHttpRepository.updateToken(token);
}

export async function unsub() {
  const worker = await navigator.serviceWorker.ready;
  const subscriber = await worker.pushManager.getSubscription();
  subscriber?.unsubscribe();
  await usersHttpRepository.updateToken(null);
}

export async function checkSub() {
  await navigator.serviceWorker.ready.then((reg) => {
    reg.pushManager.getSubscription().then((token) => {
      if (token) sub();
      else usersHttpRepository.updateToken(token);
    });
  });
}

export default {
  sub,
  unsub,
  checkSub,
};
