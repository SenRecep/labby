<script lang="ts" setup>
import userRepository from "@/api/users.http.repository";
import { onMounted } from "vue";

onMounted(async () => {
  const users = await userRepository.getUsersAsync();
  console.log(users);
});
</script>

<template>
  <div>List</div>
</template>
