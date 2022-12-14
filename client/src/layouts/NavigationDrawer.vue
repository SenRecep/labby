<script lang="ts" setup>
import ToggleTheme from "@/components/ToggleTheme.vue";
import { reactive, computed } from "vue";
import { useLayoutStore } from "../stores/layout.store";
import { useAuthStore } from "../stores/auth.store";
import { useRouter } from "vue-router";
const router = useRouter();
const layoutStore = useLayoutStore();
const authStore = useAuthStore();
const routes = router.getRoutes();

const isShow = (path: string) => {
  const route = routes.find((x) => x.path === path);
  if (!route || !route.meta || !route.meta.requiresAuth) return true;
  if (!authStore.isAuthenticated) return false;
  if (!route.meta.roles) return true;
  return route.meta.roles.some((x) => x == authStore.user?.role);
};

const items = computed(() =>
  [
    {
      title: "Home",
      icon: "mdi-home-variant-outline",
      path: "/",
      isShow: isShow("/"),
    },
    {
      title: "List",
      icon: "mdi-calculator-variant-outline",
      path: "/list",
      isShow: isShow("/list"),
    },
  ].filter((x) => x.isShow == undefined || x.isShow)
);
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
    <template v-slot:append> <toggle-theme /></template>
  </v-navigation-drawer>
</template>
