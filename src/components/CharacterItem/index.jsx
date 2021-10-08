import React from "react";
import { Box, Flex, Image } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import Text from "../shared/Text";

const colors = { alive: "#2aa101", dead: "#c70000", unknown: "#ffffff" };

const generateColorStatus = (status) => {
  return colors[status.toLowerCase()];
};

const toUpperCaseFirst = (str) => {
  if (!str) return str;

  return str[0].toUpperCase() + str.slice(1);
};

const EpisodesItem = ({ name, status, species, gender, location, image }) => {
  return (
    <Flex
      p="20px"
      w="400px"
      h="150px"
      borderRadius="12px"
      backgroundColor="rgba(0, 0, 0, 0.9)"
      boxShadow="dark-lg"
    >
      <Image src={image} />
      <Box pl="10px" textAlign="left">
        <Text fontSize="20px" color="white">
          {name}
        </Text>
        <Flex alignItems="center" fontSize="8px">
          <FontAwesomeIcon
            icon={faCircle}
            color={generateColorStatus(status)}
          />
          <Text fontSize="12px" ml="5px" color="white">{`${toUpperCaseFirst(
            status
          )} - ${species}`}</Text>
        </Flex>
        <Text color="white" mt="5px">
          {toUpperCaseFirst(gender)}
        </Text>
        <Text messageId="characterItem.lastKnowLocation" mt="5px" />
        <Text color="white">{location}</Text>
      </Box>
    </Flex>
  );
};

export default EpisodesItem;
