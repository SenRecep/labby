import { defineStore } from "pinia";
import constants from "./constants";

export const useLoadingStore = defineStore({
  id: constants.loadingStore,
  state: () => ({
    isLoading: false,
  }),
  actions: {
    beginLoading() {
      this.isLoading = true;
    },
    endLoading() {
      this.isLoading = false;
    },
    setLoading(value: boolean) {
      this.isLoading = value;
    },
  },
});
