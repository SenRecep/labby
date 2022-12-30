<script setup lang="ts">
import localStorageService from "@/stores/localstorages/localstorage.service";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../../stores/auth.store";
import constants from "@/stores/constants";
const store = useAuthStore();

localStorageService.removeKeys([
  constants.localStorages.user,
  constants.localStorages.token,
  constants.localStorages.session,
]);
store.$reset();

const router = useRouter();
router.replace({ name: "login" });
</script>

<template></template>
