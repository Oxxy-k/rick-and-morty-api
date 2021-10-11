import React, { useState, useEffect, useContext } from "react";
import { ApiContext } from "../../../contex/api";
import {
  Box,
  Flex,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
} from "@chakra-ui/react";
import Spinner from "../../Spinner";
import Button from "../../shared/Button";
import Text from "../../shared/Text";
import { queryEpisodes } from "../../../constants/queryStringsForApi";

const FlexTextItem = ({ content, messageId }) => {
  return (
    <Flex>
      <Text messageId={`character.${messageId}`} fontSize="18px" minW="200px" />
      <Text color="white" fontSize="18px">
        {content}
      </Text>
    </Flex>
  );
};

const ModalCharacterInfo = ({ onClose, isOpen, characterId }) => {
  const { getCharacterById, getEpisodeById } = useContext(ApiContext);
  const [isLoading, setIsLoading] = useState(false);
  const [characterInfo, setCharacterInfo] = useState({});
  const [firstCharacterEpisode, setFirstCharacterEpisode] = useState({});

  const { name, status, species, type, gender, origin, location, image } =
    characterInfo;

  const content = [
    { content: status, messageId: "status", key: 0 },
    { content: species, messageId: "species", key: 1 },
    { content: type, messageId: "type", key: 2 },
    { content: gender, messageId: "gender", key: 3 },
    { content: origin?.name, messageId: "originLocation", key: 4 },
    { content: location?.name, messageId: "lastKnowLocation", key: 5 },
    { content: firstCharacterEpisode?.name, messageId: "firstSeenIn", key: 6 },
  ];

  useEffect(() => {
    if (!characterId) return;
    (async () => {
      setIsLoading(true);
      const characterInfo = await getCharacterById(characterId);
      const firstCharacterEpisodeId = characterInfo.episode[0].replace(
        queryEpisodes,
        ""
      );
      const firstCharacterEpisode = await getEpisodeById(
        firstCharacterEpisodeId
      );
      setFirstCharacterEpisode(firstCharacterEpisode);
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
      <ModalOverlay />
      <ModalContent backgroundColor="black">
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <ModalHeader>
              <Text fontSize="30px" color="white">
                {name}
              </Text>
            </ModalHeader>
            <ModalBody>
              <Flex>
                <Image src={image} h="200px" />
                <Box ml="20px">
                  {content.map(
                    ({ content, messageId, key }) =>
                      content && (
                        <FlexTextItem
                          content={content}
                          messageId={messageId}
                          key={key}
                        />
                      )
                  )}
                </Box>
              </Flex>
            </ModalBody>
            <ModalFooter>
              <Button onClick={onClose} messageId="button.close" />
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalCharacterInfo;
