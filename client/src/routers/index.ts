import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "@/views/Home.view.vue";

import authRoutes from "@/modules/auth/routers";

const routes: Array<RouteRecordRaw> = [
  {
    name: "home",
    path: "/",
    component: Home,
  },
  {
    name: "list",
    path: "/list",
    component: () => import("@/views/List.view.vue"),
  },
  ...authRoutes,
  {
    name: "notfound",
    path: "/:catchAll(.*)",
    component: () => import("@/views/NotFound.view.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
