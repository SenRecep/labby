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
  {
    name: "logout",
    path: "/auth/logout",
    component: () => import("@/modules/auth/views/Logout.vue"),
  },
  {
    name: "forbidden",
    path: "/auth/forbidden",
    component: () => import("@/modules/auth/views/Forbidden.vue"),
  },
];

export default routes;
