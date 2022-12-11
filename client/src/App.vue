<script setup lang="ts">
import NavigationDrawer from "@/layouts/NavigationDrawer.vue";
import AppFooter from "@/layouts/Footer.vue";
import AppHeader from "./layouts/Header.vue";
</script>

<template>
  <v-app>
    <app-header />
    <navigation-drawer />
    <v-main>
      <v-container class="h-100"><router-view /></v-container>
    </v-main>
    <notifications />
    <app-footer />
  </v-app>
</template>
