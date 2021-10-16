import React from "react";

export const ApiContext = React.createContext();

export function ApiProvider({ children }) {
  const getResource = async (url) => {
    const data = await fetch(`https://rickandmortyapi.com/api/${url}`);
    if (!data.ok) {
      throw new Error(`Could not fetch ${url}, recieved ${data.status}`);
    }
    const jsonData = await data.json();
    return jsonData;
  };

  const getAllCharacter = async (page) =>
    await getResource(`character/?page=${page}`);

  const getCharacterById = async (id) => await getResource(`character/${id}`);

  const getCharacterByParams = async (params, page) => {
    const inititalUrlRequest = "character/?";
    const inititalSearchParams = `page=${page}`;
    const searchParams = new URLSearchParams(inititalSearchParams);
    for (let key in params) {
      if (params[key] && params[key] !== "All") {
        searchParams.set(key, params[key]);
      }
    }

    return await getResource(inititalUrlRequest + searchParams.toString());
  };

  const getAllLocations = async (page) =>
    await getResource(`location/?page=${page}`);

  const getLocationById = async (id) => await getResource(`location/${id}`);

  const getLocationByParams = async (params, page) => {
    const inititalUrlRequest = "location/?";
    const inititalSearchParams = `page=${page}`;
    const searchParams = new URLSearchParams(inititalSearchParams);
    for (let key in params) {
      if (params[key] && params[key] !== "All") {
        searchParams.set(key, params[key]);
      }
    }

    return await getResource(inititalUrlRequest + searchParams.toString());
  };

  const getAllEpisodes = async (page) =>
    await getResource(`episode?page=${page}`);

  const getEpisodeById = async (id) => await getResource(`episode/${id}`);

  const getEpisodeByParams = async (params, page) => {
    const { season, episode, name } = params;
    const queryEpisode =
      season && episode
        ? `&episode=S0${season}E${episode < 10 ? `0${episode}` : episode}`
        : "";
    const queryName = name ? `&name=${name}` : "";
    return await getResource(
      `episode/?page=${page}${queryEpisode}${queryName}`
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
