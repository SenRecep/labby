<script setup lang="ts">
import { useAuthStore } from "@/stores/auth.store";
import { computed } from "vue";
const authStore = useAuthStore();
authStore.load();
const state = computed(() =>
  authStore.isAuthenticated ? "Authorized" : "Unauthorized"
);
</script>

<template>
  <slot v-if="state === 'Authorized'" name="authorized"></slot>
  <slot v-else name="unauthorized"></slot>
</template>
