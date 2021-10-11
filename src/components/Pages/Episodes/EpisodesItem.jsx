import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import Text from "../../shared/Text";

const EpisodesItem = ({ name, episode, date, onClick }) => {
  return (
    <Box
      onClick={onClick}
      cursor="pointer"
      _hover={{
        bgColor: "black",
        boxShadow: "0 0 10px rgb(0, 217, 255)",
      }}
      p="20px"
      w={["250px", "200px", "300px", "400px"]}
      borderRadius="12px"
      backgroundColor="rgba(0, 0, 0, 0.9)"
      boxShadow="dark-lg"
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
