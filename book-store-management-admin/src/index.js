import React from "react";
import ReactDOM from "react-dom";


import "./index.css";
import App from "./App";
import { ContextProvider } from "./contexts/ContextProvider";

import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

// ReactDOM.render(
//   <ContextProvider>
//     <App />
//   </ContextProvider>,
//   document.getElementById("root")
// );

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading="null" persistor={persistor}>
      <ContextProvider>
        <App />
      </ContextProvider>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
