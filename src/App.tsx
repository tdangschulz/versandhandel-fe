import * as React from "react";
import { StrictMode } from "react";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import { configureDefaults } from "./api/axiosBase";
import {
  defaultGlobalState,
  DispatchStateContext,
  GlobalStateContext,
} from "./context/globalContext";
import { router } from "./route/routeConfig";
import { reducer } from "./context/reducer";

configureDefaults();

function App() {
  const [state, dispatch] = React.useReducer(reducer, defaultGlobalState);

  return (
    <StrictMode>
      <GlobalStateContext.Provider value={state}>
        <DispatchStateContext.Provider value={dispatch}>
          <RouterProvider router={router} />
        </DispatchStateContext.Provider>
      </GlobalStateContext.Provider>
    </StrictMode>
  );
}

export default App;
