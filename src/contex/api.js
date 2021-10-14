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

  const getCharacterByParams = async (params, page) => {
    let { name, status, species, type, gender } = params;
    name = name === "" ? "" : `&name=${name}`;
    status = status === "All" ? "" : `&status=${status}`;
    species = species === "All" ? "" : `&species=${species}`;
    type = type === "All" ? "" : `&type=${type}`;
    gender = gender === "All" ? "" : `&gender=${gender}`;
    return await getResource(
      `https://rickandmortyapi.com/api/character/?page=${page}${name}${status}${species}${type}${gender}  `
    );
  };

  const getAllLocations = async (page) =>
    await getResource(`https://rickandmortyapi.com/api/location/?page=${page}`);

  const getLocationById = async (id) =>
    await getResource(`https://rickandmortyapi.com/api/location/${id}`);

  const getLocationByParams = async (params, page) => {
    const { name, type } = params;
    const queryName = name === "" ? "" : `&name=${name}`;
    const queryType = type === "All" ? "" : `&type=${type}`;

    return await getResource(
      `https://rickandmortyapi.com/api/location/?page=${page}${queryName}${queryType}`
    );
  };

  const getAllEpisodes = async (page) =>
    await getResource(`https://rickandmortyapi.com/api/episode?page=${page}`);

  const getEpisodeById = async (id) =>
    await getResource(`https://rickandmortyapi.com/api/episode/${id}`);

  const getEpisodeByParams = async (params, page) => {
    const { season, episode, name } = params;
    const queryEpisode =
      season && episode
        ? `&episode=S0${season}E${episode < 10 ? `0${episode}` : episode}`
        : "";
    const queryName = name ? `&name=${name}` : "";
    return await getResource(
      `https://rickandmortyapi.com/api/episode/?page=${page}${queryEpisode}${queryName}`
    );
  };

  return (
    <ApiContext.Provider
      value={{
        getAllCharacter,
        getCharacterById,
        getCharacterByParams,
        getAllLocations,
        getLocationById,
        getLocationByParams,
        getAllEpisodes,
        getEpisodeById,
        getEpisodeByParams,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
}
