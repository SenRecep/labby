<script setup lang="ts">
import { useAuthStore } from "@/stores/auth.store";
import { computed, useSlots } from "vue";
const slots = useSlots();
const authStore = useAuthStore();
const props = defineProps<{
  roles?: string[];
}>();
const state = computed(() =>
  authStore.isAuthenticated
    ? props.roles
      ? props.roles.some((x) => x == authStore.user?.role)
        ? "Authorized"
        : "Forbidden"
      : "Authorized"
    : "Unauthorized"
);
</script>

<template>
  <slot v-if="state === 'Unauthorized'" name="unauthorized"></slot>
  <slot
    v-else-if="state === 'Authorized' || !slots.forbidden"
    name="authorized"
  ></slot>
  <slot v-else name="forbidden"></slot>
</template>
