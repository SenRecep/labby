<script lang="ts" setup>
import { onMounted, ref } from "vue";
import labHttpRepository, { LabStatus } from "@/api/lab.http.repository";
import { ServiceResponse } from "@/types/ServiceResponse.interface";
import { useLabStore } from "@/stores/lab.store";
const labStore = useLabStore();
labStore.load();

const isLoading = ref(false);

onMounted(async () => {
  isLoading.value = true;
  const response = (await labHttpRepository.get(
    () => (isLoading.value = false)
  )) as ServiceResponse<LabStatus>;

  if (!response.isSuccessful) {
    labStore.close();
    return;
  }

  labStore.setStatus(response.data!);
});
</script>

<template>
  <v-card :loading="isLoading" prepend-icon="mdi-access-point" class="h-100">
    <template v-slot:title> Lab Status </template>
    <v-card-text class="text-center">
      <v-row>
        <v-col cols="6">
          <h5 class="text-h5">Laboratory Status</h5>
          <h6 class="text-h6 pt-1 text-secondary">
            {{ labStore.status?.status }}
          </h6>
          <h5 class="text-h5 pt-1">People</h5>
          <h6 class="text-h6 pt-1 text-secondary">
            {{ labStore.status?.count }}
          </h6>
        </v-col>
        <v-col cols="6">
          <h5 class="text-h5 pt-1">Assistant</h5>
          <h6 class="text-h6 pt-1 text-secondary">
            {{ labStore.status?.assistant?.fullName }}
          </h6>
          <h5 class="text-h5 pt-1">Intensity</h5>
          <h6 class="text-h6 pt-1 text-secondary">
            {{ labStore.status?.intensity }}
          </h6>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
