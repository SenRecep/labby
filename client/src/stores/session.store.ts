import { defineStore } from "pinia";
import constants from "./constants";
import { LabStatus } from "@/api/lab.http.repository";
import localStorageService from "@/stores/localstorages/localstorage.service";

export const useSessionStore = defineStore({
  id: constants.sessionStore,
  state: () => ({
    status: false,
  }),
  getters: {
    getStatus(store) {
      return store.status ?? false;
    },
  },
  actions: {
    load() {
      if (this.status) return;
      const status = localStorageService.get(constants.localStorages.session);
      this.status = status;
    },
    setStatus(data: boolean) {
      this.status = data;
      localStorageService.set(constants.localStorages.session, this.status);
    },
    checkIn() {
      this.status = true;
      localStorageService.set(constants.localStorages.session, this.status);
    },
    checkOut() {
      this.status = false;
      localStorageService.set(constants.localStorages.session, this.status);
    },
  },
});
