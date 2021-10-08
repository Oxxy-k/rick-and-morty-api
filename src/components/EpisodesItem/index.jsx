import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import Text from "../shared/Text";

const EpisodesItem = ({ name, episode, characters, date }) => {
  return (
    <Box
      p="20px"
      w="400px"
      borderRadius="12px"
      backgroundColor="rgba(0, 0, 0, 0.9)"
      boxShadow="dark-lg"
    >
      <Flex>
        <Text messageId="episodeItem.name" minW="105px" />
        <Text ml="5px" wordWrap="break-word">
          {name}
        </Text>
      </Flex>
      <Flex>
        <Text messageId="episodeItem.episode" />
        <Text ml="5px" wordWrap="break-word">
          {episode}
        </Text>
      </Flex>
      <Flex>
        <Text messageId="episodeItem.date" />
        <Text ml="5px" wordWrap="break-word">
          {date}
        </Text>
      </Flex>
    </Box>
  );
};

export default EpisodesItem;
