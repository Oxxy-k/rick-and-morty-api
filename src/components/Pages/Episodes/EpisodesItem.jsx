import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import Text from "../../shared/Text";

const EpisodesItem = ({ name, episode, date }) => {
  return (
    <Box
      p="20px"
      w="400px"
      borderRadius="12px"
      backgroundColor="rgba(0, 0, 0, 0.9)"
      boxShadow="dark-lg"
    >
      <Flex>
        <Text messageId="episode.name" />
        <Text ml="5px" wordwrap="break-word" color="white">
          {name}
        </Text>
      </Flex>
      <Flex>
        <Text messageId="episode.episode" />
        <Text ml="5px" wordwrap="break-word" color="white">
          {episode}
        </Text>
      </Flex>
      <Flex>
        <Text messageId="episode.date" />
        <Text ml="5px" wordwrap="break-word" color="white">
          {date}
        </Text>
      </Flex>
    </Box>
  );
};

export default EpisodesItem;
