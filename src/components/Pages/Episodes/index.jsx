import React, { useContext, useState, useEffect } from "react";
import { Box, Grid, GridItem, Button } from "@chakra-ui/react";
import { ApiContext } from "../../../contex/api";
import EpisodesItem from "./EpisodesItem";
import Text from "../../shared/Text";
import Spinner from "../../Spinner";

function EpisodesPage() {
  const { getAllEpisodes } = useContext(ApiContext);
  const [isNextPageExist, setIsNextPageExist] = useState(true);
  const [isFirstLoading, setIsFirstLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [episodes, setEpisodes] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    (async () => {
      if (!episodes.length) {
        setIsFirstLoading(true);
      }
      setIsLoading(true);
      const data = await getAllEpisodes(page);
      setIsNextPageExist(!!data.info.next);
      setEpisodes([...episodes, ...data.results]);
      setIsLoading(false);
      if (episodes.length) {
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
            {!!episodes.length &&
              episodes.map(({ id, name, episode, air_date }) => (
                <GridItem key={id}>
                  <EpisodesItem name={name} episode={episode} date={air_date} />
                </GridItem>
              ))}
          </Grid>
          {isNextPageExist && (
            <Box>
              <Button
                variant="outline"
                isLoading={isLoading}
                mt="20px"
                onClick={() => setPage(page + 1)}
                _hover={{
                  bgColor: "none",
                  boxShadow: "0 0 10px rgb(0, 217, 255)",
                }}
                _focus={{ outline: "none" }}
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

export default EpisodesPage;
