import React, { useContext, useState, useEffect } from "react";
import { Box, Grid, GridItem, Input, Select, Flex } from "@chakra-ui/react";
import { useIntl } from "react-intl";
import { ApiContext } from "../../../contex/api";
import { personSearchingParams } from "../../../constants/searchingParams";
import CharacterItem from "./CharacterItem";
import Button from "../../shared/Button";
import Spinner from "../../Spinner";
import ModalCharacterInfo from "./ModalCharacterInfo";
import Drawer from "../../shared/Drawer";
import Text from "../../shared/Text";

const initialParamsForSearching = {
  name: "",
  status: "All",
  species: "All",
  type: "All",
  gender: "All",
};

const countOfFirstPage = 1;

function CharactersPage({ isOpen, onOpen, onClose }) {
  const intl = useIntl();
  const { getCharacterByParams } = useContext(ApiContext);
  const [paramsForSearching, setParamsForSearching] = useState(
    initialParamsForSearching
  );
  const [characters, setCharacters] = useState([]);
  const [currentCharacterId, setCurrentCharacterId] = useState();
  const [modalVisibility, toggleModalVisibility] = useState(false);
  const [isNextPageExist, setIsNextPageExist] = useState(true);
  const [isFirstLoading, setIsFirstLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(countOfFirstPage);
  const [isError, setIsError] = useState(false);

  const updateParamsForSearching = (params, type) => {
    setParamsForSearching({ ...paramsForSearching, [type]: params });
  };

  const onUpdateListCharacter = async () => {
    setIsLoading(true);
    setPage(countOfFirstPage);
    const data = await getCharacterByParams(paramsForSearching, page);
    setIsNextPageExist(!!data.info.next);
    setCharacters(data.results);
    setIsLoading(false);
  };

  useEffect(() => {
    (async () => {
      if (!characters.length) {
        setIsFirstLoading(true);
      }
      if (isError) {
        setIsError(false);
      }
      setIsLoading(true);
      try {
        const data = await getCharacterByParams(paramsForSearching, page);
        setIsNextPageExist(!!data.info.next);
        setCharacters([...characters, ...data.results]);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        setIsLoading(false);
      }
      if (characters.length) {
        return;
      }
      setIsFirstLoading(false);
    })();
  }, [page]);

  return (
    <>
      <Drawer
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        onUpdateListData={onUpdateListCharacter}
      >
        <Input
          value={paramsForSearching.name}
          onChange={(e) => updateParamsForSearching(e.target.value, "name")}
          focusBorderColor="rgb(0, 217, 255)"
          variant="flushed"
          placeholder={intl.formatMessage({ id: "placeholder.search" })}
        />

        {personSearchingParams.map(({ type, content, key }) => (
          <Flex
            justifyContent="space-between"
            alignItems="center"
            mt="20px"
            key={key}
          >
            <Text messageId={`character.${type}`} />
            <Select
              value={paramsForSearching[type]}
              onChange={(e) => updateParamsForSearching(e.target.value, type)}
              maxW="200px"
              size="xs"
              focusBorderColor="rgb(0, 217, 255)"
              borderRadius="12px"
            >
              {content.map(({ option, id }) => (
                <option key={id}>{option}</option>
              ))}
            </Select>
          </Flex>
        ))}
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
