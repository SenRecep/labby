<script setup lang="ts">
import HeaderAuthMenu from "@/components/HeaderMenus/HeaderAuthMenu.vue";
import { useLayoutStore } from "@/stores/layout.store";
import ToolbarProgressBar from "./ToolbarProgressBar.vue";
const layoutStore = useLayoutStore();
</script>

<template>
  <v-app-bar app>
    <template v-slot:prepend>
      <v-app-bar-nav-icon
        @click="layoutStore.toggleDrawer"
      ></v-app-bar-nav-icon>
    </template>

    <v-toolbar-title>Labby</v-toolbar-title>

    <template v-slot:append>
      <HeaderAuthMenu />
    </template>
    <ToolbarProgressBar slot="extension" />
  </v-app-bar>
</template>

<style>
.v-toolbar__extension {
  padding: 0px !important;
}
</style>
