<script setup lang="ts">
import labHttpRepository from "@/api/lab.http.repository";
import { NoContentResponse } from "@/types/NoContentResponse.interface";
import { ServiceResponse } from "@/types/ServiceResponse.interface";
import { useLabStore } from "@/stores/lab.store";
import { ref } from "@vue/reactivity";

const labStore = useLabStore();
const isLoading = ref(false);
const click = async () => {
  isLoading.value = true;
  const response = (await labHttpRepository.close(
    () => (isLoading.value = false)
  )) as ServiceResponse<NoContentResponse>;

  if (!response.isSuccessful) return;
  labStore.close();
};
</script>
<template>
  <v-btn :loading="isLoading" @click="click" class="bg-red" block>Close</v-btn>
</template>
