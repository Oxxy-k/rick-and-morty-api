import React from "react";
import Text from "../shared/Text";
import { Button, Box, Image, Flex } from "@chakra-ui/react";
import LocaleDropdown from "./LocaleDropdown";
// import { useRouter } from "next/router";

const Header = () => {
//   const { push, pathname } = useRouter();

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
            <Box as="button" px="15px">
              <Text color="gray" messageId="header.episodes" />
            </Box>
            <Box as="button" px="15px">
              <Text color="gray" messageId="header.characters" />
            </Box>
            <Box as="button" px="15px">
              <Text color="gray" messageId="header.locations" />
            </Box>
          </Flex>
        </Flex>
        <LocaleDropdown />
      </Flex>
    </Flex>
  );
};

export default Header;
