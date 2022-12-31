<script setup lang="ts">
import { ref } from "vue";
import { useLabStore } from "@/stores/lab.store";
import AssistantsSelect from "./AssistantsSelectComponent.vue";
import OpenButton from "./ChangeStatus/OpenButton.vue";
import CloseButton from "./ChangeStatus/CloseButton.vue";
import { User } from "@/types/User.interface";
const labStore = useLabStore();
const selectedAssistant = ref<User>();
</script>
<template>
  <v-card prepend-icon="mdi-cog" class="h-100">
    <template v-slot:title> Change Status </template>
    <v-card-text>
      <assistants-select
        :disabled="labStore.isOpen"
        v-model:selectedAssistant="selectedAssistant"
      />
      <open-button
        :disabled="selectedAssistant == null || labStore.isOpen"
        :assistant="selectedAssistant"
      />
      <close-button :disabled="!labStore.isOpen" />
    </v-card-text>
  </v-card>
</template>
