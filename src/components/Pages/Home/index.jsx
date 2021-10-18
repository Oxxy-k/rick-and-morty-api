import React, { useContext, useState, useEffect } from "react";
import { Box, Flex, Image } from "@chakra-ui/react";
import { ApiContext } from "../../../contex/api";
import CharacterItem from "../Characters/CharacterItem";
import ModalCharacterInfo from "../Characters/ModalCharacterInfo";
import Text from "../../shared/Text";
import ErrorBoundary from "../../ErrorBounadry";
import Spinner from "../../Spinner";

const HomePage = () => {
  const { getCharacterById, getAllCharacter } = useContext(ApiContext);
  const [countOfAllCharacters, setCountOfAllCharacters] = useState(null);
  const [character, setCharacter] = useState({});
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCharacterId, setCurrentCharacterId] = useState();
  const [modalVisibility, toggleModalVisibility] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { info, results } = await getAllCharacter();
        const randomCharactersIndex = Math.floor(
          Math.random() * results.length
        );
        setCountOfAllCharacters(info?.count);
        setCharacter(results[randomCharactersIndex]);
      } catch {
        setIsError(true);
        setIsLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    const timer = setInterval(async () => {
      try {
        const randomCharacterId = Math.floor(
          Math.random() * (countOfAllCharacters + 1)
        );
        const data = await getCharacterById(randomCharacterId);
        setCharacter(data);
      } catch {
        setIsError(true);
        setIsLoading(false);
      }
    }, 5000);
    return () => clearInterval(timer);
  });

  return (
    <Box position="relative" w="90%" m="0 auto">
      <Flex
        justifyContent="space-between"
        alignItems="center"
        alignContent="center"
      >
        <Image
          pb="10px"
          src="https://i1.wp.com/placebo.lu/wp-content/uploads/2020/03/rick-and-morty-portal-headshop.png?fit=500%2C500&ssl=1"
          height="400px"
        />
        {isLoading ? (
          <Spinner />
        ) : isError ? (
          <ErrorBoundary />
        ) : (
          character?.name && (
            <CharacterItem
              name={character.name}
              status={character.status}
              species={character.species}
              gender={character.gender}
              location={character.location.name}
              image={character.image}
              onClick={() => {
                toggleModalVisibility(true);
                setCurrentCharacterId(character.id);
              }}
            />
          )
        )}
      </Flex>
      <Box backgroundColor="rgba(0, 0, 0, 0.9)" borderRadius="12px" p="20px">
        <Text messageId="rickAndMorty.main" color="white" fontSize="24px" />
      </Box>
      <ModalCharacterInfo
        characterId={currentCharacterId}
        onClose={() => toggleModalVisibility(false)}
        isOpen={modalVisibility}
      />
    </Box>
  );
};

export default HomePage;
