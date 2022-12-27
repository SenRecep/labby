<script setup lang="ts">
import labHttpRepository from "@/api/lab.http.repository";
import { NoContentResponse } from "@/types/NoContentResponse.interface";
import { ServiceResponse } from "@/types/ServiceResponse.interface";
import { useLabStore } from "../../../../stores/lab.store";
import { useAssistantsStore } from "../../../../stores/assistants.store";
import { ref } from "@vue/reactivity";
const props = defineProps<{
  assistant: unknown;
}>();
const assistantStore = useAssistantsStore();
const labStore = useLabStore();
const isLoading = ref(false);
const click = async () => {
  isLoading.value = true;
  const response = (await labHttpRepository.open(
    props.assistant,
    () => (isLoading.value = false)
  )) as ServiceResponse<NoContentResponse>;

  if (!response.isSuccessful) return;
  const found = assistantStore.assistants.find((x) => x.id == props.assistant);
  labStore.open(found?.fullName!);
};
</script>
<template>
  <v-btn :loading="isLoading" @click="click" class="mb-4 bg-green" block
    >Open</v-btn
  >
</template>
