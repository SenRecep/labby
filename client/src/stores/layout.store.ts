import { defineStore } from "pinia";

export const useLayoutStore = defineStore({
  id: "layoutStore",
  state: () => ({
    drawer: false,
  }),
  actions: {
    toggleDrawer() {
      this.drawer = !this.drawer;
    },
  },
});
