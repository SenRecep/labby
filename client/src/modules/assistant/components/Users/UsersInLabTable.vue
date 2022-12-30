<script setup lang="ts">
import { UserSession } from "@/api/assistants.http.repository";
defineProps<{
  usersInLab: UserSession[];
}>();
</script>
<template>
  <v-table fixed-header>
    <thead>
      <tr>
        <th class="text-left">Entry Time</th>
        <th class="text-left">Full Name</th>
        <th class="text-left">Phone</th>
        <th class="text-left">E-Mail</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in usersInLab" :key="item.id">
        <td>{{ item.entryTime }}</td>
        <td>{{ item.user.fullName }}</td>
        <td>{{ item.user.phone }}</td>
        <td>{{ item.user.email }}</td>
      </tr>
    </tbody>
  </v-table>
</template>
