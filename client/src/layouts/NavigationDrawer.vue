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
      title: "Assistant Create",
      icon: "mdi-account-plus",
      path: "/admin/assistant-create",
      isShow: isShow("/admin/assistant-create"),
    },
    {
      title: "Managment",
      icon: "mdi-cog",
      path: "/assistant/managment",
      isShow: isShow("/assistant/managment"),
    },
    {
      title: "Users",
      icon: "mdi-clipboard-list-outline",
      path: "/assistant/users",
      isShow: isShow("/assistant/users"),
    },
    {
      title: "Sessions",
      icon: "mdi-format-list-bulleted",
      path: "/assistant/sessions",
      isShow: isShow("/assistant/sessions"),
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
