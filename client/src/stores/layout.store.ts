import { defineStore } from "pinia";
import constants from "./constants";

export const useLayoutStore = defineStore({
  id: constants.layaoutStore,
  state: () => ({
    drawer: false,
  }),
  actions: {
    toggleDrawer() {
      this.drawer = !this.drawer;
    },
  },
});
