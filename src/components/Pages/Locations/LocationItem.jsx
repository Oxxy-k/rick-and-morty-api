import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import { toUpperCaseFirst } from "../../../helpers/toUpperCaseFirst";
import Text from "../../shared/Text";

const EpisodesItem = ({ name, type, dimension }) => {
  return (
    <Box
      p="20px"
      w="400px"
      borderRadius="12px"
      backgroundColor="rgba(0, 0, 0, 0.9)"
      boxShadow="dark-lg"
    >
      <Flex>
        <Text messageId="location.name" />
        <Text ml="5px" wordWrap="break-word" color="white">
          {name}
        </Text>
      </Flex>
      <Flex>
        <Text messageId="location.type" />
        <Text ml="5px" wordWrap="break-word" color="white">
          {type}
        </Text>
      </Flex>
      <Flex>
        <Text messageId="location.dimension" />
        <Text ml="5px" wordWrap="break-word" color="white">
          {toUpperCaseFirst(dimension)}
        </Text>
      </Flex>
    </Box>
  );
};

export default EpisodesItem;
