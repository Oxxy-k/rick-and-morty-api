import { extendTheme } from "@chakra-ui/react";

const breakpoints = ["576px", "768px", "1024px", "1440px"];

breakpoints.sm = breakpoints[0];
breakpoints.md = breakpoints[1];
breakpoints.lg = breakpoints[2];
breakpoints.xl = breakpoints[3];

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({ config, breakpoints });

export default theme;
