import React, { useContext, useState, useEffect } from "react";
import { Box, Grid, GridItem, Button } from "@chakra-ui/react";
import { ApiContext } from "../../../contex/api";
import CharacterItem from "../../CharacterItem";
import Text from "../../shared/Text";
import Spinner from "../../Spinner";

function CharactersPage() {
  const { getAllCharacter } = useContext(ApiContext);
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
            <Box>
              <Button
                variant="outline"
                isLoading={isLoading}
                mt="20px"
                onClick={() => setPage(page + 1)}
              >
                <Text messageId="button.more" color="white" />
              </Button>
            </Box>
          )}
        </>
      )}
    </Box>
  );
}

export default CharactersPage;
