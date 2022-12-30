import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "@/views/Home.view.vue";

import authRoutes from "@/modules/auth/routers";
import adminRoutes from "@/modules/admin/routes";
import assistantRoutes from "@/modules/assistant/routes";
import { useAuthStore } from "@/stores/auth.store";

const routes: Array<RouteRecordRaw> = [
  {
    name: "home",
    path: "/",
    meta: { requiresAuth: true },
    component: Home,
  },
];

routes.push(...authRoutes);
routes.push(...adminRoutes);
routes.push(...assistantRoutes);

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
