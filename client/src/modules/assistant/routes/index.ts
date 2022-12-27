import { Roles } from "@/constants/roles.constant";
import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    name: "managmennt",
    path: "/assistant/managment",
    meta: { requiresAuth: true, roles: [Roles.assistant] },
    component: () => import("@/modules/assistant/views/Managment.vue"),
  },
];

export default routes;
