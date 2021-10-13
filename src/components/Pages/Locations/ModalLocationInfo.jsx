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
import { toUpperCaseFirst } from "../../../helpers/toUpperCaseFirst";

const FlexTextItem = ({ content, messageId }) => {
  return (
    <Flex>
      <Text messageId={`location.${messageId}`} fontSize="18px" minW="200px" />
      <Text color="white" fontSize="18px">
        {toUpperCaseFirst(content)}
      </Text>
    </Flex>
  );
};

const ModalLocationInfo = ({ onClose, isOpen, locationId }) => {
  const { getCharacterById, getLocationById } = useContext(ApiContext);
  const [isLoading, setIsLoading] = useState(false);
  const [locationInfo, setLocationInfo] = useState({});
  const [residents, setResidents] = useState([]);

  const { name, type, dimension } = locationInfo;

  const content = [
    { content: type, messageId: "type", key: 0 },
    { content: dimension, messageId: "dimension", key: 1 },
  ];

  useEffect(() => {
    if (!locationId) return;
    (async () => {
      setIsLoading(true);
      const locationInfo = await getLocationById(locationId);
      const residentsId = locationInfo.residents.map((item) =>
        item.replace(queryCharacters, "")
      );
      if (residentsId.length) {
        const residents = await getCharacterById(residentsId);
        Array.isArray(residents)
          ? setResidents(residents)
          : setResidents([residents]);
      } else {
        setResidents([]);
      }
      setLocationInfo(locationInfo);
      setIsLoading(false);
    })();
  }, [locationId]);

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
              <Text messageId="location.residents" mt="5px" fontSize="24px" />
              {residents.length && (
                <Grid templateColumns="repeat(4, 2fr)" gap={5} mt="5px">
                  {residents.map(({ name, image, id }) => (
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
              )}
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

export default ModalLocationInfo;
