import { config } from "@tamagui/config";

import { createTamagui } from "tamagui";

export const tamaguiConfig = createTamagui(config);

type CustomConfig = typeof config;

// ensure types work
declare module "tamagui" {
  interface TamaguiCustomConfig extends CustomConfig {}
}
