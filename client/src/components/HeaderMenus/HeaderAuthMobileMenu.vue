<script setup lang="ts">
import { useAuthStore } from "@/stores/auth.store";
import Authenticate from "../auth/Authenticate.vue";
const authStore = useAuthStore();
</script>
<template>
  <v-menu left bottom>
    <template v-slot:activator="{ props }">
      <v-btn icon v-bind="props">
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </template>

    <v-list>
      <authenticate>
        <template #authorized>
          <v-list-item
            to="/auth/logout"
            title="Logout"
            prepend-icon="mdi-logout"
          />
        </template>
        <template #unauthorized>
          <v-list-item
            to="/auth/login"
            title="Login"
            prepend-icon="mdi-login"
          />
          <v-list-item
            to="/auth/register"
            title="Register"
            prepend-icon="mdi-account-plus"
          />
        </template>
      </authenticate>
    </v-list>
  </v-menu>
</template>
