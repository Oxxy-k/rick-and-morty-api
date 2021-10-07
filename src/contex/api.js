import React from "react";

export const ApiContext = React.createContext();

export function ApiProvider({ children }) {
  const getResource = async (url) => {
    const data = await fetch(url);
    if (!data.ok) {
      throw new Error(`Could not fetch ${url}, recieved ${data.status}`);
    }
    const jsonData = await data.json();
    return jsonData;
  };

  const getAllCharacter = async (page) =>
    await getResource(
      `https://rickandmortyapi.com/api/character/?page=${page}`
    );

  const getCharacterById = async (id) =>
    await getResource(`https://rickandmortyapi.com/api/character/${id}`);

  const getCharacterByParams = async (params) =>
    await getResource(`https://rickandmortyapi.com/api/character/?${params}`);

  const getAllLocation = async (page) =>
    await getResource(`https://rickandmortyapi.com/api/location/?page=${page}`);

  const getLocationById = async (id) =>
    await getResource(`https://rickandmortyapi.com/api/location/${id}`);

  const getLocationByParams = async (params) =>
    await getResource(`https://rickandmortyapi.com/api/location/?${params}`);

  const getAllEpisodes = async (page) =>
    await getResource(`https://rickandmortyapi.com/api/episode?page=${page}`);

  const getEpisodesById = async (id) =>
    await getResource(`https://rickandmortyapi.com/api/location/${id}`);

  const getEpisodesByParams = async (params) =>
    await getResource(`https://rickandmortyapi.com/api/location/?${params}`);

  return (
    <ApiContext.Provider
      value={{
        getAllCharacter,
        getCharacterById,
        getCharacterByParams,
        getAllLocation,
        getLocationById,
        getLocationByParams,
        getAllEpisodes,
        getEpisodesById,
        getEpisodesByParams,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
}
