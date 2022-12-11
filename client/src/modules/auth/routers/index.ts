import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    name: "login",
    path: "/auth/login",
    component: () => import("@/modules/auth/views/Login.vue"),
  },
  {
    name: "register",
    path: "/auth/register",
    component: () => import("@/modules/auth/views/Register.vue"),
  },
];

export default routes;
