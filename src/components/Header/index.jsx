import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Flex } from "@chakra-ui/react";
import Text from "../shared/Text";
import LocaleDropdown from "./LocaleDropdown";
import Logo from "../Logo";

const Header = () => {
  return (
    <Flex
      position="sticky"
      top="0"
      backgroundColor="black"
      height="30px"
      alignItems="center"
    >
      <Flex alignItems="center" justifyContent="space-between" px="5%" w="100%">
        <Flex justifyContent="space-between" alignItems="center">
          <Logo />
          <Flex justifyContent="space-between" alignItems="center">
            <Link to="/episodes">
              <Text color="gray" messageId="header.episodes" px="15px" />
            </Link>
            <Link to="/characters">
              <Text color="gray" messageId="header.characters" px="15px" />
            </Link>
            <Link to="/locations">
              <Text color="gray" messageId="header.locations" px="15px" />
            </Link>
          </Flex>
        </Flex>
        <LocaleDropdown />
      </Flex>
    </Flex>
  );
};

export default withRouter(Header);
