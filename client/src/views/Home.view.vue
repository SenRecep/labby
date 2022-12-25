<script lang="ts" setup>
import { onMounted, reactive } from "vue";
import labHttpRepository, { LabStatus } from "../api/lab.http.repository";
import { useLoadingStore } from "../stores/loading.store";
import { ServiceResponse } from "@/types/ServiceResponse.interface";
const loadingStore = useLoadingStore();
const labStatus = reactive<LabStatus>({
  status: "Close",
  count: 0,
  intensity: "0%",
});

const apiErrors = reactive({
  errors: [] as string[],
});
onMounted(async () => {
  loadingStore.beginLoading();
  apiErrors.errors = [];
  const response = (await labHttpRepository.get(() =>
    loadingStore.endLoading()
  )) as ServiceResponse<LabStatus>;
  console.log(response);

  if (!response.isSuccessful) {
    if (response.error) apiErrors.errors = response.error!.errors;
    return false;
  }
  labStatus.status = response.data?.status || "Close";
  labStatus.count = response.data?.count || 0;
  labStatus.intensity = response.data?.intensity || "0%";
});
</script>

<template>
  <div class="text-center d-flex flex-column h-100 justify-center">
    <h2 class="text-h2">Laboratory Status</h2>
    <h3 class="text-h3 pt-5 text-secondary">{{ labStatus.status }}</h3>
    <template v-if="labStatus.status !== 'Close'">
      <h2 class="text-h2 pt-5">People</h2>
      <h3 class="text-h3 pt-5 text-secondary">{{ labStatus.count }}</h3>
      <h2 class="text-h2 pt-5">Intensity</h2>
      <h3 class="text-h3 pt-5 text-secondary">{{ labStatus.intensity }}</h3>
    </template>
  </div>
</template>
