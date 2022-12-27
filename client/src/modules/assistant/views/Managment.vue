<script setup lang="ts">
import { computed } from "vue";
import { useDisplay } from "vuetify/lib/framework.mjs";
import ChangeStatus from "../components/ChangeStatus.vue";
import ChangeAssistant from "../components/ChangeAssistant.vue";
import SendNotification from "../components/SendNotification.vue";
import LabStatus from "@/components/LabStatus.vue";
const display = useDisplay();
const col = computed(() => (display.mobile.value ? 12 : 6));
</script>
<template>
  <v-row>
    <v-col :cols="col">
      <lab-status />
    </v-col>
    <v-col :cols="col">
      <change-status />
    </v-col>
    <v-col :cols="col"> <change-assistant /></v-col>
    <v-col :cols="col">
      <send-notification />
    </v-col>
  </v-row>
</template>

<style>
.v-card__loader {
  height: 2px;
}
</style>
