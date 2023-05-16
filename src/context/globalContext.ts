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
    houseNo: number;
    residence: string;
  };
};

export type DefaultGlobalState = {
  userInfo?: Profile;
  shoppingCart: {
    total: number;
    priceWithoutVat: number;
    products: ShoppingItem[];
  };
};

export const defaultGlobalState = {
  shoppingCart: {
    total: 0,
    priceWithoutVat: 0,
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
