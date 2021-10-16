import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import { toUpperCaseFirst } from "../../../helpers/toUpperCaseFirst";
import Text from "../../shared/Text";

const EpisodesItem = ({ name, type, dimension, onClick }) => {
  return (
    <Box
      onClick={onClick}
      w={["300px", "300px", "300px", "500px"]}
      className="content-item-wrapper"
    >
      <Flex>
        <Text messageId="location.name" />
        <Text ml="5px" wordwrap="break-word" color="white">
          {toUpperCaseFirst(name)}
        </Text>
      </Flex>
      <Flex>
        <Text messageId="location.type" />
        <Text ml="5px" wordwrap="break-word" color="white">
          {toUpperCaseFirst(type)}
        </Text>
      </Flex>
      <Flex>
        <Text messageId="location.dimension" />
        <Text ml="5px" wordwrap="break-word" color="white">
          {toUpperCaseFirst(dimension)}
        </Text>
      </Flex>
    </Box>
  );
};

export default EpisodesItem;
