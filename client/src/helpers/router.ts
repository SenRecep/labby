export {};

import "vue-router";

declare module "vue-router" {
  interface RouteMeta {
    roles?: string[];
    requiresAuth?: boolean;
  }
}
