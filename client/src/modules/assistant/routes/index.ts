import { Roles } from "@/constants/roles.constant";
import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    name: "managmennt",
    path: "/assistant/managment",
    meta: { requiresAuth: true, roles: [Roles.assistant] },
    component: () => import("@/modules/assistant/views/Managment.vue"),
  },
  {
    name: "usersinlab",
    path: "/assistant/users",
    meta: { requiresAuth: true, roles: [Roles.assistant] },
    component: () => import("@/modules/assistant/views/UsersInLab.vue"),
  },
  {
    name: "sessions",
    path: "/assistant/sessions",
    meta: { requiresAuth: true, roles: [Roles.assistant] },
    component: () => import("@/modules/assistant/views/Sessions.vue"),
  },
];

export default routes;
