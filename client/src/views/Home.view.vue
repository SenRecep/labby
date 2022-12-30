<script setup lang="ts">
import { computed, ref } from "vue";
import { useDisplay } from "vuetify/lib/framework.mjs";
import LabStatus from "@/components/LabStatus.vue";
import SessionManagment from "@/components/SessionManagment.vue";
import UserHistory from "@/components/UserHistory.vue";
const display = useDisplay();
const col = computed(() => (display.mobile.value ? 12 : 6));

const labStatusKey = ref(0);
const userHistoryKey = ref(4);
const forceReload = () => {
  labStatusKey.value++;
  userHistoryKey.value++;
};
</script>
<template>
  <v-row>
    <v-col :cols="col">
      <lab-status :key="labStatusKey" />
    </v-col>
    <v-col :cols="col">
      <session-managment :force-reloader="forceReload" />
    </v-col>
    <v-col :cols="col">
      <user-history :key="userHistoryKey" />
    </v-col>
  </v-row>
</template>
