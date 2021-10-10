import React, { useState, useEffect, useContext } from "react";
import { ApiContext } from "../../../contex/api";
import {
  Box,
  Button,
  Flex,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import Spinner from "../../Spinner";
import Text from "../../shared/Text";

const ModalCharacterInfo = ({ onClose, isOpen, characterId }) => {
  const { getCharacterById } = useContext(ApiContext);
  const [isLoading, setIsLoading] = useState(false);
  const [characterInfo, setCharacterInfo] = useState({});
  const { name, status, species, type, gender, origin, location, image } =
    characterInfo;

  useEffect(() => {
    if (!characterId) return;
    (async () => {
      setIsLoading(true);
      const characterInfo = await getCharacterById(characterId);
      setCharacterInfo(characterInfo);
      setIsLoading(false);
    })();
  }, [characterId]);

  return (
    <Modal
      size={"2xl"}
      onClose={onClose}
      isOpen={isOpen}
      isCentered={true}
      scrollBehavior={"outside"}
      position="fixed"
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <ModalOverlay />
          <ModalContent backgroundColor="black">
            <ModalHeader>
              <Text fontSize="30px" color="white">
                {name}
              </Text>
            </ModalHeader>
            <ModalBody>
              <Flex>
                <Image src={image} h="200px" />
                <Box ml="20px">
                  <Flex>
                    <Text
                      messageId="character.status"
                      fontSize="18px"
                      minW="200px"
                    />
                    <Text color="white" fontSize="18px">
                      {status}
                    </Text>
                  </Flex>
                  <Flex>
                    <Text
                      messageId="character.species"
                      fontSize="18px"
                      minW="200px"
                    />
                    <Text color="white" fontSize="18px">
                      {species}
                    </Text>
                  </Flex>
                  {type && (
                    <Flex>
                      <Text
                        messageId="character.type"
                        fontSize="18px"
                        minW="200px"
                      />
                      <Text color="white" fontSize="18px">
                        {type}
                      </Text>
                    </Flex>
                  )}
                  <Flex>
                    <Text
                      messageId="character.gender"
                      fontSize="18px"
                      minW="200px"
                    />
                    <Text color="white" fontSize="18px">
                      {gender}
                    </Text>
                  </Flex>
                  <Flex>
                    <Text
                      messageId="character.originLocation"
                      fontSize="18px"
                      minW="200px"
                    />
                    <Text color="white" fontSize="18px">
                      {origin?.name}
                    </Text>
                  </Flex>
                  <Flex>
                    <Text
                      messageId="character.lastKnowLocation"
                      fontSize="18px"
                      minW="200px"
                    />
                    <Text color="white" fontSize="18px">
                      {location?.name}
                    </Text>
                  </Flex>
                </Box>
              </Flex>
            </ModalBody>
            <ModalFooter>
              <Button
                onClick={onClose}
                variant="outline"
                _hover={{
                  bgColor: "none",
                  boxShadow: "0 0 10px rgb(0, 217, 255)",
                }}
                _focus={{ outline: "none" }}
              >
                <Text messageId="button.close" color="white" />
              </Button>
            </ModalFooter>
          </ModalContent>
        </>
      )}
    </Modal>
  );
};

export default ModalCharacterInfo;
