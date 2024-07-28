import { AppLayoutsEnum, AppLayoutToFileMap } from "@/components/layouts/layouts.types";
import type { RouteLocationNormalized } from "vue-router";

export async function loadLayoutMiddleware(route: RouteLocationNormalized): Promise<void> {
  const { layout } = route.meta;
  const normalizedLayoutName = layout || AppLayoutsEnum.default;
  const fileName = AppLayoutToFileMap[normalizedLayoutName];
  const fileNameWithoutExtension = fileName.split(".vue")[0];

  const component = await import(`../../components/layouts/${fileNameWithoutExtension}.vue`);
  route.meta.layoutComponent = component.default;
}
