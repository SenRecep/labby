import { Roles } from "@/constants/roles.constant";
import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    name: "assistan-create",
    path: "/admin/assistant-create",
    meta: { requiresAuth: true, roles: [Roles.admin] },
    redirect: { name: "register" },
  },
];

export default routes;
