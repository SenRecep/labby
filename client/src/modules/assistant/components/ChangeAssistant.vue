<script setup lang="ts">
import AssistantsSelect from "./AssistantsSelectComponent.vue";
import { ref } from "vue";
import assistantsHttpRepository from "@/api/assistants.http.repository";
import { useLabStore } from "@/stores/lab.store";
import { ServiceResponse } from "@/types/ServiceResponse.interface";
import { NoContentResponse } from "@/types/NoContentResponse.interface";
import { useAssistantsStore } from "@/stores/assistants.store";
import { User } from "@/types/User.interface";
const selectedAssistant = ref<User>();
const isLoading = ref(false);
const labStore = useLabStore();
const assistantsStore = useAssistantsStore();
const click = async () => {
  isLoading.value = true;
  const response = (await assistantsHttpRepository.change(
    selectedAssistant.value,
    () => (isLoading.value = false)
  )) as ServiceResponse<NoContentResponse>;
  if (!response.isSuccessful) return;
  const found = assistantsStore.assistants.find(
    (x) => x.id == selectedAssistant.value?.id
  );

  labStore.changeAssistant(found!);
};
</script>
<template>
  <v-card
    :disabled="!labStore.isOpen"
    prepend-icon="mdi-swap-horizontal"
    class="h-100"
  >
    <template v-slot:title> Change Assistant </template>

    <v-card-text>
      <assistants-select v-model:selectedAssistant="selectedAssistant" />
      <v-btn :loading="isLoading" @click="click" class="mb-4 bg-blue" block
        >Change</v-btn
      >
    </v-card-text>
  </v-card>
</template>
