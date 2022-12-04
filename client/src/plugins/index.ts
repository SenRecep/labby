// Plugins
import { loadFonts } from "./webfontloader";
import vuetify from "./vuetify";

// Routers
import router from "@/router";

// States
import { createPinia } from "pinia";
const pinia = createPinia();

// Notifications
import Notifications from "@kyvg/vue3-notification";

// Types
import type { App } from "vue";

export function registerPlugins(app: App) {
  loadFonts();
  app.use(vuetify);
  app.use(router);
  app.use(pinia);
  app.use(Notifications);
}
