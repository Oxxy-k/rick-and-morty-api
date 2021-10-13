import React from "react";
import { Box, Flex, Image } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { toUpperCaseFirst } from "../../../helpers/toUpperCaseFirst";
import Text from "../../shared/Text";

const colors = { alive: "#2aa101", dead: "#c70000", unknown: "#ffffff" };

const generateColorStatus = (status) => {
  return colors[status.toLowerCase()];
};

const CharacterItem = ({
  name,
  status,
  species,
  gender,
  location,
  image,
  onClick,
}) => {
  return (
    <Flex
      onClick={onClick}
      cursor="pointer"
      _hover={{
        bgColor: "black",
        boxShadow: "0 0 10px rgb(0, 217, 255)",
      }}
      p="20px"
      w={["320px", "400px", "320px", "400px"]}
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
        <Flex alignItems="center" mt="5px">
          <Text messageId="character.gender" />
          <Text color="white" ml="5px">
            {toUpperCaseFirst(gender)}
          </Text>
        </Flex>
        <Text messageId="character.lastKnowLocation" mt="5px" />
        <Text color="white">{location}</Text>
      </Box>
    </Flex>
  );
};

export default CharacterItem;
