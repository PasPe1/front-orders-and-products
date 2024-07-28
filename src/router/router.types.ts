import type { AppLayoutsEnum } from "@/components/layouts/layouts.types";
import type { VueElement } from "vue";

declare module "vue-router" {
  interface RouteMeta {
    layout?: AppLayoutsEnum;
    layoutComponent?: VueElement;
  }
}
