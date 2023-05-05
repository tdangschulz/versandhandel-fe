import * as React from "react";
import { StrictMode } from "react";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import { configureDefaults } from "./api/axiosBase";
import {
  DefaultGlobalState,
  defaultGlobalState,
  dispatchStateContext,
  globalStateContext,
} from "./context/globalContext";
import { router } from "./route/routeConfig";

configureDefaults();

function App() {
  const [state, dispatch] = React.useReducer(
    (state: DefaultGlobalState, newValue: DefaultGlobalState) => {
      return {
        ...state,
        ...newValue,
      };
    },
    defaultGlobalState
  );

  return (
    <StrictMode>
      <globalStateContext.Provider value={state}>
        <dispatchStateContext.Provider value={dispatch}>
          <RouterProvider router={router} />
        </dispatchStateContext.Provider>
      </globalStateContext.Provider>
    </StrictMode>
  );
}

export default App;
