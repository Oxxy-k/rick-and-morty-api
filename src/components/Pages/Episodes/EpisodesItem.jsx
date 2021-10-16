import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import Text from "../../shared/Text";

const EpisodesItem = ({ name, episode, date, onClick }) => {
  return (
    <Box
      onClick={onClick}
      w={["300px", "300px", "300px", "500px"]}
      className="content-item-wrapper"
      textAlign="left"
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
