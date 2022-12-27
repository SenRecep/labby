import { defineStore } from "pinia";
import constants from "./constants";
import { User } from "@/types/User.interface";

export const useAssistantsStore = defineStore({
  id: constants.layaoutStore,
  state: () => ({
    requestStart: false,
    assistants: [] as User[],
  }),
});
