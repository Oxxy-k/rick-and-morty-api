import React, { useContext, useState, useEffect } from "react";
import { Box, Grid, GridItem, Input, Flex, Select } from "@chakra-ui/react";
import { useIntl } from "react-intl";
import { ApiContext } from "../../../contex/api";
import { locationSearchingParams } from "../../../constants/searchingParams";
import LocationItem from "./LocationItem";
import Button from "../../shared/Button";
import Spinner from "../../Spinner";
import ModalLocationInfo from "./ModalLocationInfo";
import Drawer from "../../shared/Drawer";
import Text from "../../shared/Text";
import ErrorBoundary from "../../ErrorBounadry";

const countOfFirstPage = 1;

const initialParamsForSearching = {
  name: "",
  type: "All",
};

function LocationPage({ isOpen, onClose, onOpen }) {
  const intl = useIntl();
  const { getLocationByParams } = useContext(ApiContext);
  const [paramsForSearching, setParamsForSearching] = useState(
    initialParamsForSearching
  );
  const [modalVisibility, toggleModalVisibility] = useState(false);
  const [currentLocationId, setCurrentEpisodeId] = useState();
  const [isNextPageExist, setIsNextPageExist] = useState(true);
  const [isFirstLoading, setIsFirstLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [locations, setLocations] = useState([]);
  const [page, setPage] = useState(countOfFirstPage);
  const [isError, setIsError] = useState(false);

  const updateParamsForSearching = (params, type) => {
    setParamsForSearching({ ...paramsForSearching, [type]: params });
  };

  const onUpdateLocationCharacter = async () => {
    if (isError) {
      setIsError(false);
    }
    setIsLoading(true);
    setPage(countOfFirstPage);    
    try {
      const data = await getLocationByParams(paramsForSearching, page);
      setIsNextPageExist(!!data.info.next);
      setLocations(data.results);
      setIsLoading(false);
    } catch {
      setIsError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      if (!locations.length) {
        setIsFirstLoading(true);
      }
      if (isError) {
        setIsError(false);
      }
      setIsLoading(true);
      try {
        const data = await getLocationByParams(paramsForSearching, page);
        setIsNextPageExist(!!data.info.next);
        setLocations([...locations, ...data.results]);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        setIsLoading(false);
      }
      if (locations.length) {
        return;
      }
      setIsFirstLoading(false);
    })();
  }, [page]);

  if (isError) {
    return <ErrorBoundary />;
  }

  return (
    <>
      <Drawer
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        onUpdateListData={onUpdateLocationCharacter}
      >
        <Input
          value={paramsForSearching.name}
          onChange={(e) => updateParamsForSearching(e.target.value, "name")}
          focusBorderColor="rgb(0, 217, 255)"
          variant="flushed"
          placeholder={intl.formatMessage({ id: "placeholder.search" })}
        />
        <Flex justifyContent="space-between" alignItems="center" mt="20px">
          <Text messageId="location.type" />
          <Select
            value={paramsForSearching.type}
            onChange={(e) => updateParamsForSearching(e.target.value, "type")}
            maxW="200px"
            size="xs"
            focusBorderColor="rgb(0, 217, 255)"
            borderRadius="12px"
          >
            {locationSearchingParams.map(({ type, id }) => (
              <option key={id}>{type}</option>
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

export default LocationPage;
