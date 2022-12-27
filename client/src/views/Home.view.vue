<script setup lang="ts">
import { computed } from "vue";
import { useDisplay } from "vuetify/lib/framework.mjs";
import LabStatus from "@/components/LabStatus.vue";
import SessionManagment from "@/components/SessionManagment.vue";
const display = useDisplay();
const col = computed(() => (display.mobile.value ? 12 : 6));
</script>
<template>
  <v-row>
    <v-col :cols="col">
      <lab-status />
    </v-col>
    <v-col :cols="col">
      <session-managment />
    </v-col>
  </v-row>
</template>
