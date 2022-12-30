<script setup lang="ts">
import { reactive, onMounted, ref } from "vue";
import assistantsHttpRepository from "@/api/assistants.http.repository";
import { ServiceResponse } from "@/types/ServiceResponse.interface";
import { UserSession } from "@/api/assistants.http.repository";
import UsersInLabTable from "../components/Users/UsersInLabTable.vue";
import UsersTodayTable from "../components/Users/UsersTodayTable.vue";

const toggle = ref("now");
const state = reactive({
  usersInLab: [] as UserSession[],
  usersToday: [] as UserSession[],
});

onMounted(async () => {
  const responseUsersIn =
    (await assistantsHttpRepository.getUsersInLab()) as ServiceResponse<
      UserSession[]
    >;

  if (responseUsersIn.isSuccessful) state.usersInLab = responseUsersIn.data!;

  const responseUsersToday =
    (await assistantsHttpRepository.getUsersToday()) as ServiceResponse<
      UserSession[]
    >;

  if (responseUsersToday.isSuccessful)
    state.usersToday = responseUsersToday.data!;
});
</script>

<template>
  <div>
    <div class="d-flex justify-center mb-10">
      <v-btn-toggle v-model="toggle" mandatory>
        <v-btn value="now">Now</v-btn>
        <v-btn value="today">Today</v-btn>
      </v-btn-toggle>
    </div>
    <users-in-lab-table
      v-show="toggle == 'now'"
      :users-in-lab="state.usersInLab"
    />
    <users-today-table
      v-show="toggle == 'today'"
      :users-in-lab="state.usersToday"
    />
  </div>
</template>
