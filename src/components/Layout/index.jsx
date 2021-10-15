import React from "react";
import { Box } from "@chakra-ui/react";
import Header from "../Header";

export default function AppLayout({ children }) {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Header />
      <Box height="calc(100vh - 80px)">{children}</Box>
    </Box>
  );
}
