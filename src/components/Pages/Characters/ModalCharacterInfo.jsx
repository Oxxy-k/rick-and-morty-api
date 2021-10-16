import React, { useState, useEffect, useContext } from "react";
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
import { ApiContext } from "../../../contex/api";
import Spinner from "../../Spinner";
import Button from "../../shared/Button";
import Text from "../../shared/Text";
import { queryEpisodes } from "../../../constants/queryStringsForApi";
import { toUpperCaseFirst } from "../../../helpers/toUpperCaseFirst";
import ErrorBoundary from "../../ErrorBounadry";
import useCurrentBreakpoint from "../../../helpers/useCurrentBreakpoint";

const FlexTextItem = ({ content, messageId, isTablet }) => {
  return (
    <Box display={isTablet ? "flex" : "block"}>
      <Text
        messageId={`character.${messageId}`}
        fontSize="18px"
        minW={isTablet ? "200px" : "content-width"}
      />
      <Text color="white" fontSize="18px">
        {toUpperCaseFirst(content)}
      </Text>
    </Box>
  );
};

const ModalCharacterInfo = ({ onClose, isOpen, characterId }) => {
  const { isTablet } = useCurrentBreakpoint();
  const { getCharacterById, getEpisodeById } = useContext(ApiContext);
  const [isLoading, setIsLoading] = useState(false);
  const [characterInfo, setCharacterInfo] = useState({});
  const [firstCharacterEpisode, setFirstCharacterEpisode] = useState({});
  const [isError, setIsError] = useState(false);

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
      if (isError) {
        setIsError(false);
      }
      setIsLoading(true);
      try {
        const characterInfo = await getCharacterById(characterId);
        const firstCharactersEpisodeId = characterInfo.episode[0].replace(
          queryEpisodes,
          ""
        );
        const firstCharacterEpisode = await getEpisodeById(
          firstCharactersEpisodeId
        );
        setFirstCharacterEpisode(firstCharacterEpisode);
        setCharacterInfo(characterInfo);
        setIsLoading(false);
      } catch {
        setIsError(true);
        setIsLoading(false);
      }
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
        ) : isError ? (
          <ErrorBoundary />
        ) : (
          <>
            <ModalHeader>
              <Text fontSize="30px" color="white">
                {name}
              </Text>
            </ModalHeader>
            <ModalBody>
              <Box display={isTablet ? "flex" : "block"}>
                <Image src={image} h="200px" />
                <Box ml={isTablet ? "20px" : "0px"}>
                  {content.map(
                    ({ content, messageId, key }) =>
                      content && (
                        <FlexTextItem
                          isTablet={isTablet}
                          content={content}
                          messageId={messageId}
                          key={key}
                        />
                      )
                  )}
                </Box>
              </Box>
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
