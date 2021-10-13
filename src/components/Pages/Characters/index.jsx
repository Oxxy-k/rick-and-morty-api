import React, { useContext, useState, useEffect } from "react";
import { Box, Grid, GridItem, Input, Select, Flex } from "@chakra-ui/react";
import { useIntl } from "react-intl";
import { ApiContext } from "../../../contex/api";
import { initialPersonSearchingParams } from "../../../constants/searchingParams";
import CharacterItem from "./CharacterItem";
import Button from "../../shared/Button";
import Spinner from "../../Spinner";
import ModalCharacterInfo from "./ModalCharacterInfo";
import Drawer from "../../shared/Drawer";
import Text from "../../shared/Text";

const { statuses, species, types, gender } = initialPersonSearchingParams;

function CharactersPage({ isOpen, onOpen, onClose }) {
  const intl = useIntl();
  const { getAllCharacter } = useContext(ApiContext);
  const [currentCharacterId, setCurrentCharacterId] = useState();
  const [modalVisibility, toggleModalVisibility] = useState(false);
  const [isNextPageExist, setIsNextPageExist] = useState(true);
  const [isFirstLoading, setIsFirstLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    (async () => {
      if (!characters.length) {
        setIsFirstLoading(true);
      }
      setIsLoading(true);
      const data = await getAllCharacter(page);
      setIsNextPageExist(!!data.info.next);
      setCharacters([...characters, ...data.results]);
      setIsLoading(false);
      if (characters.length) {
        return;
      }
      setIsFirstLoading(false);
    })();
  }, [page]);

  return (
    <>
      <Drawer isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
        <Input
          focusBorderColor="rgb(0, 217, 255)"
          variant="flushed"
          placeholder={intl.formatMessage({ id: "placeholder.search" })}
        />
        <Flex justifyContent="space-between" alignItems="center" mt="20px">
          <Text messageId="character.status" />
          <Select maxW="200px" size="xs" focusBorderColor="rgb(0, 217, 255)">
            {statuses.map(({ status, id }) => (
              <option key={id} color="black">
                {status}
              </option>
            ))}
          </Select>
        </Flex>
        <Flex justifyContent="space-between" alignItems="center" mt="20px">
          <Text messageId="character.species" />
          <Select maxW="200px" size="xs" focusBorderColor="rgb(0, 217, 255)">
            {species.map(({ species, id }) => (
              <option key={id}>{species}</option>
            ))}
          </Select>
        </Flex>
        <Flex justifyContent="space-between" alignItems="center" mt="20px">
          <Text messageId="character.type" />
          <Select maxW="200px" size="xs" focusBorderColor="rgb(0, 217, 255)">
            {types.map(({ type, id }) => (
              <option key={id}>{type}</option>
            ))}
          </Select>
        </Flex>
        <Flex justifyContent="space-between" alignItems="center" mt="20px">
          <Text messageId="character.gender" />
          <Select maxW="200px" size="xs" focusBorderColor="rgb(0, 217, 255)">
            {gender.map(({ gender, id }) => (
              <option key={id}>{gender}</option>
            ))}
          </Select>
        </Flex>
      </Drawer>
      <Box p="20px">
        {isFirstLoading ? (
          <Spinner />
        ) : (
          <>
            <Grid
              templateColumns={[
                "repeat(1, 2fr)",
                "repeat(1, 2fr)",
                "repeat(1, 2fr)",
                "repeat(2, 2fr)",
              ]}
              gap={3}
            >
              {!!characters.length &&
                characters.map(
                  ({ id, name, status, species, gender, location, image }) => (
                    <GridItem key={id} display="flex" justifyContent="center">
                      <CharacterItem
                        onClick={() => {
                          toggleModalVisibility(true);
                          setCurrentCharacterId(id);
                        }}
                        name={name}
                        status={status}
                        species={species}
                        gender={gender}
                        location={location.name}
                        image={image}
                      />
                    </GridItem>
                  )
                )}
            </Grid>
            {isNextPageExist && (
              <Box mt="20px" display="flex" justifyContent="center">
                <Button
                  size="md"
                  isLoading={isLoading}
                  onClick={() => setPage(page + 1)}
                  messageId="button.more"
                />
              </Box>
            )}
          </>
        )}
      </Box>
      <ModalCharacterInfo
        characterId={currentCharacterId}
        onClose={() => toggleModalVisibility(false)}
        isOpen={modalVisibility}
      />
    </>
  );
}

export default CharactersPage;
