import React, { useContext, useState, useEffect } from "react";
import { Box, Grid, GridItem } from "@chakra-ui/react";
import { ApiContext } from "../../../contex/api";
import LocationItem from "./LocationItem";
import Button from "../../shared/Button";
import Spinner from "../../Spinner";
import ModalLocationInfo from "./ModalLocationInfo";

function EpisodesPage() {
  const { getAllLocations } = useContext(ApiContext);
  const [modalVisibility, toggleModalVisibility] = useState(false);
  const [currentLocationId, setCurrentEpisodeId] = useState();
  const [isNextPageExist, setIsNextPageExist] = useState(true);
  const [isFirstLoading, setIsFirstLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [locations, setLocations] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    (async () => {
      if (!locations.length) {
        setIsFirstLoading(true);
      }
      setIsLoading(true);
      const data = await getAllLocations(page);
      setIsNextPageExist(!!data.info.next);
      setLocations([...locations, ...data.results]);
      setIsLoading(false);
      if (locations.length) {
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
            <Grid
              templateColumns={["repeat(1, 2fr)", "repeat(2, 2fr)"]}
              gap={3}
            >
              {!!locations.length &&
                locations.map(({ id, name, type, dimension }) => (
                  <GridItem key={id} display="flex" justifyContent="center">
                    <LocationItem
                      onClick={() => {
                        toggleModalVisibility(true);
                        setCurrentEpisodeId(id);
                      }}
                      name={name}
                      type={type}
                      dimension={dimension}
                    />
                  </GridItem>
                ))}
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
      <ModalLocationInfo
        locationId={currentLocationId}
        onClose={() => toggleModalVisibility(false)}
        isOpen={modalVisibility}
      />
    </>
  );
}

export default EpisodesPage;
