import React from "react";
import { Flex } from "@chakra-ui/react";
import NavBar from "./NavBar";
import MobileNavBar from "./MobileNavBar";
import LocaleDropdown from "./LocaleDropdown";
import useCurrentBreakpoint from "../../helpers/useCurrentBreakpoint";

const Header = ({ onOpen }) => {
  const { isTablet } = useCurrentBreakpoint();

  return (
    <Flex
      position="sticky"
      top="0"
      backgroundColor="black"
      height="40px"
      alignItems="center"
    >
      <Flex alignItems="center" justifyContent="space-between" px="5%" w="100%">
        {isTablet ? (
          <NavBar onOpen={onOpen} />
        ) : (
          <MobileNavBar onOpen={onOpen} />
        )}
        <LocaleDropdown />
      </Flex>
    </Flex>
  );
};

export default Header;
