import { defineStore } from "pinia";

export const useLoadingStore = defineStore({
  id: "loadingStore",
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
