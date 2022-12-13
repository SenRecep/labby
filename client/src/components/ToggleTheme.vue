<script setup lang="ts">
import { useTheme } from "vuetify";
import localStorageService from "@/stores/localstorages/localstorage.service";
const theme = useTheme();
const toggleTheme = () => {
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
  localStorageService.set("theme", theme.global.name.value);
};
</script>
<template>
  <div class="pa-4">
    <v-btn block @click="toggleTheme">toggle theme</v-btn>
  </div>
</template>
