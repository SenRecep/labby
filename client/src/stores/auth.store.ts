import { defineStore } from "pinia";
import constants from "./constants";
import localStorageService from "./localstorages/localstorage.service";
import { User } from "@/types/User.interface";

export const useAuthStore = defineStore({
  id: constants.authStore,
  state: () => ({
    token: undefined as string | undefined,
    user: undefined as User | undefined,
  }),
  getters: {
    isAuthenticated(state) {
      return !!state.token;
    },
  },
  actions: {
    load() {
      if (!this.token) {
        const token = localStorageService.get(constants.localStorages.token);
        this.token = token;
      }
      if (!this.user) {
        const user = localStorageService.get(constants.localStorages.user);
        this.user = user;
      }
    },
    setToken(token: string | undefined) {
      this.token = token;
      localStorageService.set(constants.localStorages.token, token);
    },
    setUser(user: User | undefined) {
      this.user = user;
      localStorageService.set(constants.localStorages.user, user);
    },
  },
});
