<script lang="ts" setup>
import { reactive } from "vue";
import { useLayoutStore } from "../stores/layout.store";

const layoutStore = useLayoutStore();

const items = reactive([
  { title: "Home", icon: "mdi-home-variant-outline", path: "/" },
  {
    title: "List",
    icon: "mdi-calculator-variant-outline",
    path: "/list",
  },
]);
</script>

<template>
  <v-navigation-drawer v-model="layoutStore.drawer" temporary>
    <v-list>
      <v-list-item title="Pages" />
    </v-list>

    <v-divider></v-divider>
    <v-list density="compact" nav>
      <v-list-item
        v-for="(item, index) in items"
        :to="item.path"
        :key="index"
        :prepend-icon="item.icon"
        :title="item.title"
        :value="item.path"
        link
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
