import { defineStore } from "pinia";
import constants from "./constants";
import { LabStatus } from "@/api/lab.http.repository";
import localStorageService from "@/stores/localstorages/localstorage.service";

const defaultData = {
  status: "Close",
  count: 0,
  intensity: "0%",
  assistant: "...",
} as LabStatus;

export const useLabStore = defineStore({
  id: constants.labStore,
  state: () => ({
    status: null as LabStatus | null,
  }),
  getters: {
    getStatus(store) {
      return store.status ?? defaultData;
    },
    isOpen(store) {
      return store.status?.status == "Open";
    },
  },
  actions: {
    load() {
      if (this.status) return;
      const status = localStorageService.get(constants.localStorages.lab);
      this.status = status;
    },
    setStatus(data: LabStatus) {
      this.status = data ?? defaultData;
      localStorageService.set(constants.localStorages.lab, this.status);
    },
    open(assistant: string) {
      this.status = { ...defaultData, status: "Open", assistant };
      localStorageService.set(constants.localStorages.lab, this.status);
    },
    close() {
      this.status = defaultData;
      localStorageService.set(constants.localStorages.lab, this.status);
    },
    changeAssistant(assistant: string) {
      this.status!.assistant = assistant;
      localStorageService.set(constants.localStorages.lab, this.status);
    },
  },
});
