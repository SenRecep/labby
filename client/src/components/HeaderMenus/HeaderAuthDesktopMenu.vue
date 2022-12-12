<script setup lang="ts">
import { useAuthStore } from "@/stores/auth.store";
import Authenticate from "../auth/Authenticate.vue";
const authStore = useAuthStore();
</script>

<template>
  <authenticate>
    <template #authorized>
      Welcome!
      {{ authStore.user?.name }} {{ authStore.user?.surname }}
      <v-btn to="/auth/logout" prepend-icon="mdi-logout">Logout</v-btn>
    </template>
    <template #unauthorized>
      <v-btn to="/auth/login" prepend-icon="mdi-login">Login</v-btn>
      <v-btn to="/auth/register" prepend-icon="mdi-account-plus"
        >Register</v-btn
      ></template
    >
  </authenticate>
</template>
