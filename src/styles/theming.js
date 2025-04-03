import { createSystem, defineConfig, defaultConfig } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          25: "#FBFBFB",
          50: "#FAF3FF",
          75: "#eee8f3",
          100: "#EAD1FC",
          200: "#D9B0F9",
          300: "#C08AEF",
          350: "#9013FE",
          400: "#8528FF",
          500: "#8528CE",
          600: "#7200e6",
          700: "#5e00b3",
          800: "#4a0080",
          850: "#3D1C4F",
          900: "#2e0033",
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
