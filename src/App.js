import React from "react";
import { useDisclosure } from "@chakra-ui/react";
import Header from "./components/Header";
import LocationsPage from "./components/Pages/Locations";
import CharactersPage from "./components/Pages/Characters";
import EpisodesPage from "./components/Pages/Episodes";
import { Switch, Route } from "react-router-dom";

import "./App.css";

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div className="app">
      <Header onOpen={onOpen} />
      <div className="container">
        <Switch>
          <Route
            exact
            path="/episodes"
            render={() => <EpisodesPage isOpen={isOpen} onClose={onClose} />}
          />
          <Route
            exact
            path="/characters"
            render={() => <CharactersPage isOpen={isOpen} onClose={onClose} />}
          />
          <Route
            exact
            path="/locations"
            render={() => <LocationsPage isOpen={isOpen} onClose={onClose} />}
          />
        </Switch>
      </div>
    </div>
  );
}

export default App;
