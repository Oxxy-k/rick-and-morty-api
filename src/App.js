import "./App.css";
import React, { useEffect } from "react";
import Header from "./components/Header";

function App() {
  useEffect(() => {
    fetch("https://rickandmortyapi.com/api/character/?page=1")
      .then((response) => response.json())
      .then((jsonResponse) => console.log(jsonResponse));
  }, []);

  return (
    <div className="App">
      <Header />
    </div>
  );
}

export default App;
