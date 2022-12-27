<script setup lang="ts">
import assistantsHttpRepository from "@/api/assistants.http.repository";
import { ref, watch, onMounted } from "vue";
import { ServiceResponse } from "@/types/ServiceResponse.interface";
import { User } from "@/types/User.interface";
import { useAssistantsStore } from "../../../stores/assistants.store";
const props = defineProps<{
  selectedAssistant: unknown;
}>();
const emit = defineEmits<{
  (e: "update:selectedAssistant", value: unknown): void;
}>();
const assistantsStore = useAssistantsStore();
const isLoading = ref(false);
const selected = ref(props.selectedAssistant);
watch(selected, (current) => {
  emit("update:selectedAssistant", current);
});

onMounted(async () => {
  if (assistantsStore.requestStart) return;
  isLoading.value = true;
  assistantsStore.requestStart = true;
  const response = (await assistantsHttpRepository.getAll(
    () => (isLoading.value = false)
  )) as ServiceResponse<User[]>;

  if (!response.isSuccessful) return;
  assistantsStore.assistants = response.data!;
});
</script>
<template>
  <v-select
    :loading="isLoading"
    label="Asistants"
    :items="assistantsStore.assistants"
    item-title="fullName"
    item-value="id"
    v-model="selected"
    variant="solo"
  ></v-select>
</template>
