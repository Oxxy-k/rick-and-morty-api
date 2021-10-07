import React from "react";
import Text from "../shared/Text";
import { Image, Flex } from "@chakra-ui/react";
import LocaleDropdown from "./LocaleDropdown";
import { Link, withRouter } from "react-router-dom";

const Header = () => {
  return (
    <Flex
      position="sticky"
      top="0"
      backgroundColor="black"
      height="40px"
      alignItems="center"
    >
      <Flex alignItems="center" justifyContent="space-between" px="5%" w="100%">
        <Flex justifyContent="space-between" alignItems="center">
          <Image boxSize="40px" src="header.png" alt="Rick and Morty"></Image>
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
