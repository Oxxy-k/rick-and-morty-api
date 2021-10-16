import React from "react";
import { Image, Flex, Box } from "@chakra-ui/react";
import { Text } from "../shared/Text";

const ErrorBoundary = () => {
  return (
    <Flex alignItems="center" justifyContent="center" h="90vh">
      <Box>
        <Flex justifyContent="center">
          <Image src="https://upload.wikimedia.org/wikipedia/ru/c/c3/Morty_Smith.png" />
        </Flex>
        <Text messageId="error.message" color="white" fontSize="24px" />
      </Box>
    </Flex>
  );
};

export default ErrorBoundary;
