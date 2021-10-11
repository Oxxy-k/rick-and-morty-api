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
  Grid,
  GridItem,
} from "@chakra-ui/react";
import Spinner from "../../Spinner";
import Button from "../../shared/Button";
import Text from "../../shared/Text";
import { queryCharacters } from "../../../constants/queryStringsForApi";

const FlexTextItem = ({ content, messageId }) => {
  return (
    <Flex>
      <Text messageId={`episode.${messageId}`} fontSize="18px" minW="200px" />
      <Text color="white" fontSize="18px">
        {content}
      </Text>
    </Flex>
  );
};

const ModalEpisodeInfo = ({ onClose, isOpen, episodeId }) => {
  const { getCharacterById, getEpisodeById } = useContext(ApiContext);
  const [isLoading, setIsLoading] = useState(false);
  const [episodeInfo, setEpisodeInfo] = useState({});
  const [episodeCharacters, setEpisodeCharacters] = useState([]);

  const { name, air_date: date, episode } = episodeInfo;

  const content = [
    { content: date, messageId: "date", key: 0 },
    { content: episode, messageId: "episode", key: 1 },
  ];

  useEffect(() => {
    if (!episodeId) return;
    (async () => {
      setIsLoading(true);
      const episodeInfo = await getEpisodeById(episodeId);
      const episodeCharactersId = episodeInfo.characters.map((item) =>
        item.replace(queryCharacters, "")
      );
      const episodeCharacters = await getCharacterById(episodeCharactersId);
      setEpisodeCharacters(episodeCharacters);
      setEpisodeInfo(episodeInfo);
      setIsLoading(false);
    })();
  }, [episodeId]);

  return (
    <Modal
      size={"xl"}
      onClose={onClose}
      isOpen={isOpen}
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
              <Box>
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
              <Text messageId="episode.characters" mt="5px" fontSize="24px" />
              <Grid templateColumns="repeat(4, 2fr)" gap={5} mt="5px">
                {episodeCharacters.map(({ name, image, id }) => (
                  <GridItem key={id}>
                    <Box>
                      <Image src={image} maxW="70px" />
                      <Text color="white" mt="5px">
                        {name}
                      </Text>
                    </Box>
                  </GridItem>
                ))}
              </Grid>
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

export default ModalEpisodeInfo;
