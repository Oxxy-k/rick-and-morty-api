import "./App.css";
import React from "react";
import Header from "./components/Header";
import LocationsPage from "./components/Pages/Locations";
import CharactersPage from "./components/Pages/Characters";
import EpisodesPage from "./components/Pages/Episodes";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/episodes" render={() => <EpisodesPage />} />
          <Route exact path="/characters" render={() => <CharactersPage />} />
          <Route exact path="/locations" render={() => <LocationsPage />} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
