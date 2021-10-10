import React, { useContext, useState, useEffect } from "react";
import { Box, Grid, GridItem, Button } from "@chakra-ui/react";
import { ApiContext } from "../../../contex/api";
import LocationItem from "./LocationItem";
import Text from "../../shared/Text";
import Spinner from "../../Spinner";

function EpisodesPage() {
  const { getAllLocations } = useContext(ApiContext);
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
    <Box p="20px">
      {isFirstLoading ? (
        <Spinner />
      ) : (
        <>
          <Grid templateColumns="repeat(2, 2fr)" gap={3}>
            {!!locations.length &&
              locations.map(({ id, name, type, dimension }) => (
                <GridItem key={id}>
                  <LocationItem name={name} type={type} dimension={dimension} />
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
