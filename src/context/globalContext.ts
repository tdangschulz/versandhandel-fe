import * as React from "react";
import { ShoppingItem } from "../models";

export type Profile = {
  auth?: string;
  id?: number;
  password?: string;
  firstName: string;
  lastName?: string;
  isAdmin: boolean;
  address: {
    street: string;
    zipCode: string;
    city: string;
    email: string;
    houseNo: number;
    residence: string;
  };
};

export type DefaultGlobalState = {
  userInfo?: Profile;
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
