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

const size = {
  w: ["320px", "400px", "500px", "550px"],
  h: ["max-content", "200px"],
};

const CharacterItem = ({
  name,
  status,
  species,
  gender,
  location,
  image,
  onClick,
  ...props
}) => {
  return (
    <Flex
      onClick={onClick}
      className="content-item-wrapper"
      {...size}
      {...props}
    >
      <Image src={image} h={["100px", "160px"]} />
      <Box pl="10px" textAlign="left">
        <Text fontSize="20px" color="white">
          {name}
        </Text>
        <Flex alignItems="center" fontSize="8px">
          <FontAwesomeIcon
            icon={faCircle}
            color={generateColorStatus(status)}
          />
          <Text ml="5px" color="white">{`${toUpperCaseFirst(
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
        <Text color="white">{toUpperCaseFirst(location)}</Text>
      </Box>
    </Flex>
  );
};

export default CharacterItem;
