// Plugins
import { loadFonts } from "./webfontloader";
import vuetify from "./vuetify";

// Routers
import routers from "@/routers";

// States
import { createPinia } from "pinia";
const pinia = createPinia();

// Notifications
import Notifications from "@kyvg/vue3-notification";

// Types
import type { App } from "vue";

// Notify
import registerServiceWorker from "./notify";
import subscription from "./notify/subscription";

export function registerPlugins(app: App) {
  loadFonts();
  app.use(vuetify);
  app.use(pinia);
  app.use(routers);
  app.use(Notifications);
  registerServiceWorker();
  subscription.checkSub();
}
