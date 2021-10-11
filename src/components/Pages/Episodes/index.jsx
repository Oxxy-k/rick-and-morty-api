import React, { useContext, useState, useEffect } from "react";
import { Box, Grid, GridItem } from "@chakra-ui/react";
import { ApiContext } from "../../../contex/api";
import EpisodesItem from "./EpisodesItem";
import Button from "../../shared/Button";
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
  );
}

export default EpisodesPage;
