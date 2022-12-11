<script setup lang="ts">
import { useLoadingStore } from "../stores/loading.store";
const store = useLoadingStore();
</script>
<template>
  <v-progress-linear
    :active="store.isLoading"
    :indeterminate="true"
    class="ma-0"
    height="4"
  ></v-progress-linear>
</template>

<style>
.v-progress-linear {
  position: absolute;
  bottom: 0;
  -moz-transform: scale(1, -1);
  -webkit-transform: scale(1, -1);
  -o-transform: scale(1, -1);
  -ms-transform: scale(1, -1);
  transform: scale(1, -1);
}
</style>
