import React, { useContext, useState, useEffect } from "react";
import {
  Box,
  Grid,
  GridItem,
  Input,
  Flex,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { useIntl } from "react-intl";
import { ApiContext } from "../../../contex/api";
import { episodeSearchingParams } from "../../../constants/searchingParams";
import ModalEpisodeInfo from "./ModalEpisodeInfo";
import EpisodesItem from "./EpisodesItem";
import Button from "../../shared/Button";
import Spinner from "../../Spinner";
import Drawer from "../../shared/Drawer";
import Text from "../../shared/Text";

const countOfFirstPage = 1;

const initialParamsForSearching = {
  name: "",
  season: "",
  episode: "",
};

function EpisodesPage({ isOpen, onOpen, onClose }) {
  const intl = useIntl();
  const { getAllEpisodes, getEpisodeByParams } = useContext(ApiContext);
  const [paramsForSearching, setParamsForSearching] = useState(
    initialParamsForSearching
  );

  const [modalVisibility, toggleModalVisibility] = useState(false);
  const [currentEpisodeId, setCurrentEpisodeId] = useState();
  const [isNextPageExist, setIsNextPageExist] = useState(true);
  const [isFirstLoading, setIsFirstLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [episodes, setEpisodes] = useState([]);
  const [page, setPage] = useState(countOfFirstPage);
  const [isError, setIsError] = useState(false);

  const updateParamsForSearching = (params, type) => {
    setParamsForSearching({ ...paramsForSearching, [type]: params });
  };

  const onUpdateListEpisode = async () => {
    setIsLoading(true);
    setPage(countOfFirstPage);
    const data = await getEpisodeByParams(paramsForSearching, page);
    setIsNextPageExist(!!data.info.next);
    setEpisodes(data.results);
    setIsLoading(false);
  };

  useEffect(() => {
    (async () => {
      if (!episodes.length) {
        setIsFirstLoading(true);
      }
      if (isError) {
        setIsError(false);
      }
      setIsLoading(true);
      try {
        const data = await getAllEpisodes(page);
        setIsNextPageExist(!!data.info.next);
        setEpisodes([...episodes, ...data.results]);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        setIsLoading(false);
      }
      if (episodes.length) {
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
        onUpdateListData={onUpdateListEpisode}
      >
        <Input
          value={paramsForSearching.name}
          onChange={(e) => updateParamsForSearching(e.target.value, "name")}
          focusBorderColor="rgb(0, 217, 255)"
          variant="flushed"
          placeholder={intl.formatMessage({ id: "placeholder.search" })}
        />
        {episodeSearchingParams.map(({ type, id, max }) => (
          <Flex
            mt="20px"
            alignItems="center"
            justifyContent="space-between"
            key={id}
          >
            <Text messageId={`episode.${type}`} />
            <NumberInput
              onChange={(count) => updateParamsForSearching(count, type)}
              value={paramsForSearching[type]}
              size="xs"
              maxW="100px"
              min={1}
              max={max}
              focusBorderColor="rgb(0, 217, 255)"
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Flex>
        ))}
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
              {!!episodes.length &&
                episodes.map(({ id, name, episode, air_date }) => (
                  <GridItem key={id} display="flex" justifyContent="center">
                    <EpisodesItem
                      onClick={() => {
                        toggleModalVisibility(true);
                        setCurrentEpisodeId(id);
                      }}
                      name={name}
                      episode={episode}
                      date={air_date}
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
      <ModalEpisodeInfo
        episodeId={currentEpisodeId}
        onClose={() => toggleModalVisibility(false)}
        isOpen={modalVisibility}
      />
    </>
  );
}

export default EpisodesPage;
