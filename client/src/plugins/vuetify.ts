/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Composables
import { createVuetify } from "vuetify";
import localStorageService from "../stores/localstorages/localstorage.service";

let theme = localStorageService.get("theme");
if (!theme) {
  const isDarkTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
  theme = isDarkTheme ? "dark" : "light";
}

export default createVuetify({
  theme: {
    defaultTheme: theme,
    themes: {},
  },
});
