<script lang="ts" setup>
import { onMounted, ref, useAttrs } from "vue";
import { useLabStore } from "@/stores/lab.store";
import InButton from "./SessionManagment/InButton.vue";
import OutButton from "./SessionManagment/OutButton.vue";
import { useSessionStore } from "@/stores/session.store";
import sessionHttpRepository from "../api/session.http.repository";
import { ServiceResponse } from "@/types/ServiceResponse.interface";
const sessionStore = useSessionStore();
sessionStore.load();
const labStore = useLabStore();
labStore.load();

const isLoading = ref(false);

onMounted(async () => {
  isLoading.value = true;
  const response = (await sessionHttpRepository.get(
    () => (isLoading.value = false)
  )) as ServiceResponse<boolean>;
  if (!response.isSuccessful) {
    labStore.close();
    return;
  }
  if (!response.isSuccessful) {
    sessionStore.setStatus(false);
    return;
  }

  sessionStore.setStatus(response.data!);
});
</script>

<template>
  <v-card
    :disabled="!labStore.isOpen"
    :loading="isLoading"
    prepend-icon="mdi-account-cog"
    class="h-100"
  >
    <template v-slot:title> Session Managment </template>
    <v-card-text class="text-center">
      <h5 class="text-h5">
        Status:
        <span class="text-secondary">{{
          sessionStore.status ? "Online" : "Offline"
        }}</span>
      </h5>
      <in-button class="my-4" />
      <out-button />
    </v-card-text>
  </v-card>
</template>
