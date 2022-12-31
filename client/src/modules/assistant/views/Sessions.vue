<script setup lang="ts">
import { reactive, onMounted } from "vue";
import sessionHttpRepository, {
  SessionHistory,
} from "@/api/session.http.repository";
import { ServiceResponse } from "@/types/ServiceResponse.interface";
const state = reactive({
  sessions: [] as SessionHistory[],
});

onMounted(async () => {
  const response =
    (await sessionHttpRepository.getSessionHistory()) as ServiceResponse<
      SessionHistory[]
    >;

  if (response.isSuccessful) state.sessions = response.data!;
});
</script>
<template>
  <v-table fixed-header>
    <thead>
      <tr>
        <th class="text-left">Open Time</th>
        <th class="text-left">Close Time</th>
        <th class="text-left">Full Name</th>
        <th class="text-left">Visitors</th>
        <th class="text-left">Entries</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in state.sessions" :key="item.id">
        <td>{{ item.openTime }}</td>
        <template v-if="item.closeTime">
          <td>{{ item.closeTime }}</td>
        </template>
        <template v-else>
          <td><v-icon icon="mdi-circle" color="green" /> Open</td>
        </template>
        <td>{{ item.assistant.user.fullName }}</td>
        <td>{{ item.visitors }}</td>
        <td>{{ item.entries }}</td>
      </tr>
    </tbody>
  </v-table>
</template>
