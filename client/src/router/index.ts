import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "@/views/Home.view.vue";
import NotFound from "@/views/Notfound.view.vue";

// createWebHistory();
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
  {
    name: "notfound",
    path: "/:catchAll(.*)",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
