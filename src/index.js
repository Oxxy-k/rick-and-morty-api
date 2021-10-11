import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { ApiProvider } from "./contex/api";
import { ChakraProvider } from "@chakra-ui/react";
import { LngProvider } from "./contex/locale";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { theme } from "@chakra-ui/react";

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Router>
        <ApiProvider>
          <LngProvider>
            <App />
          </LngProvider>
        </ApiProvider>
      </Router>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
