import React, { useContext, useState, useEffect } from "react";
import { Box, Grid, GridItem } from "@chakra-ui/react";
import { ApiContext } from "../../../contex/api";
import EpisodesItem from "../../EpisodesItem";

const moc = {
  air_date: "December 2, 2013",
  created: "2017-11-10T12:56:33.798Z",
  episode: "S01E01",
  id: 1,
  name: "Pilot",
};

function EpisodesPage() {
  const { getAllEpisodes } = useContext(ApiContext);
  const [episodes, setEpisodes] = useState([]);
  console.log(
    "🚀 ~ file: index.jsx ~ line 9 ~ EpisodesPage ~ episodes",
    episodes
  );
  const [page, setPage] = useState(1);

  useEffect(() => {
    (async () => {
      const episodes = await getAllEpisodes(page);
      setEpisodes(episodes.results);
    })();
  }, [page]);

  return (
    <Box>
      <Grid p="20px" templateColumns="repeat(2, 2fr)" gap={3}>
        {!!episodes.length &&
          episodes.map(({ id, name, episode, air_date }) => (
            <GridItem key={id}>
              <EpisodesItem name={name} episode={episode} date={air_date} />
            </GridItem>
          ))}
      </Grid>
    </Box>
  );
}

export default EpisodesPage;
