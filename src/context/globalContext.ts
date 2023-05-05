import * as React from "react";
import { ShoppingItem } from "../models";

export type DefaultGlobalState = {
  userInfo?: {
    auth?: string;
    name: string;
    isAdmin: boolean;
    address: {
      street: string;
      zipCode: string;
      city: string;
      email: string;
    };
  };
  shoppingCart: {
    shipping: number;
    total: number;
    products: ShoppingItem[];
  };
};

export const defaultGlobalState = {
  shoppingCart: {
    total: 0,
    shipping: 6,
    products: [],
  },
} as DefaultGlobalState;
export const globalStateContext = React.createContext(defaultGlobalState);
export const dispatchStateContext = React.createContext<
  React.Dispatch<DefaultGlobalState> | undefined
>(undefined);

export const useGlobalState = () => ({
  state: React.useContext(globalStateContext),
  dispatch: React.useContext(dispatchStateContext),
});
