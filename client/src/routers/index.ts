import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "@/views/Home.view.vue";

import authRoutes from "@/modules/auth/routers";
import { useAuthStore } from "@/stores/auth.store";
import { Roles } from "../constants/roles.constant";

const routes: Array<RouteRecordRaw> = [
  {
    name: "home",
    path: "/",
    component: Home,
  },
  {
    name: "list",
    path: "/list",
    meta: { requiresAuth: true, roles: [Roles.admin] },
    component: () => import("@/views/List.view.vue"),
  },
];
routes.push(...authRoutes);
routes.push({
  name: "notfound",
  path: "/:catchAll(.*)",
  component: () => import("@/views/NotFound.view.vue"),
});

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  const authStore = useAuthStore();
  authStore.load();

  if (to.meta.requiresAuth && !authStore.isAuthenticated)
    return { name: "login" };

  if (
    to.meta.requiresAuth &&
    authStore.isAuthenticated &&
    to.meta.roles &&
    !to.meta.roles.some((x) => x === authStore.user?.role)
  )
    return { name: "forbidden" };
});

export default router;
