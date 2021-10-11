import React, { useContext, useState, useEffect } from "react";
import { Box, Grid, GridItem } from "@chakra-ui/react";
import { ApiContext } from "../../../contex/api";
import CharacterItem from "./CharacterItem";
import Button from "../../shared/Button";
import Spinner from "../../Spinner";
import ModalCharacterInfo from "./ModalCharacterInfo";

function CharactersPage() {
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
      <Box p="20px">
        {isFirstLoading ? (
          <Spinner />
        ) : (
          <>
            <Grid templateColumns="repeat(2, 2fr)" gap={3}>
              {!!characters.length &&
                characters.map(
                  ({ id, name, status, species, gender, location, image }) => (
                    <GridItem key={id}>
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
              <Box mt="20px">
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
