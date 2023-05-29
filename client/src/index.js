import React from "react";
import ReactDOM from "react-dom/client";
import thunk from "redux-thunk";
import {Provider} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import reducers from "./reducers/index";
import {ChakraProvider} from "@chakra-ui/react";
import App from "./App";

const store = configureStore({
  reducer: reducers,
  middleware: [thunk],
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </Provider>
);
