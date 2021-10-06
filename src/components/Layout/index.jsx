import React from "react";
import Header from "../Header";
import { Box } from "@chakra-ui/react";
// import LeftPanel from 'components/LeftPanel'

export default function AppLayout({ children }) {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Header />
      <Box height="calc(100vh - 80px)">{children}</Box>
    </Box>
  );
}
