<script lang="ts" setup>
import { onMounted, ref, useAttrs, reactive } from "vue";
import { useLabStore } from "@/stores/lab.store";
import { useSessionStore } from "@/stores/session.store";
import { ServiceResponse } from "@/types/ServiceResponse.interface";
import usersHttpRepository from "../api/users.http.repository";
import { UserSession } from "@/api/assistants.http.repository";
const sessionStore = useSessionStore();
sessionStore.load();
const labStore = useLabStore();
labStore.load();

const isLoading = ref(false);

const state = reactive({
  history: [] as UserSession[],
});

onMounted(async () => {
  isLoading.value = true;
  const response = (await usersHttpRepository.getHistory(
    () => (isLoading.value = false)
  )) as ServiceResponse<UserSession[]>;

  if (response.isSuccessful) state.history = response.data!;
});
</script>

<template>
  <v-card
    :disabled="!labStore.isOpen"
    :loading="isLoading"
    prepend-icon="mdi-clipboard-text-clock-outline"
    class="h-100"
  >
    <template v-slot:title> User History </template>
    <v-card-text>
      <v-table fixed-header height="300px">
        <thead>
          <tr>
            <th class="text-left">Entry Time</th>
            <th class="text-left">Exit Time</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in state.history" :key="item.id">
            <td>{{ item.entryTime }}</td>
            <template v-if="item.exitTime">
              <td>{{ item.exitTime }}</td>
            </template>
            <template v-else>
              <td><v-icon icon="mdi-circle" color="green" /> In Lab</td>
            </template>
          </tr>
        </tbody>
      </v-table>
    </v-card-text>
  </v-card>
</template>
