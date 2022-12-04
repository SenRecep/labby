<template>
  <v-app>
    <v-app-bar app>
      <v-app-bar-nav-icon
        @click="layoutStore.toggleDrawer"
      ></v-app-bar-nav-icon>

      <v-toolbar-title>Labby</v-toolbar-title>
    </v-app-bar>

    <navigation-drawer />

    <v-main>
      <v-container><router-view /></v-container>
    </v-main>

    <notifications />
    <app-footer />
  </v-app>
</template>

<script setup lang="ts">
import NavigationDrawer from "@/layouts/NavigationDrawer.vue";
import AppFooter from "@/layouts/Footer.vue";
import { useLayoutStore } from "./stores/layout.store";
const layoutStore = useLayoutStore();
</script>

<style scoped></style>
