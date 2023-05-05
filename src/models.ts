export type Product = {
  name: string;
  price: number;
  id: number;
  description?: string;
  category?: Category;
};

export type ShoppingItem = {
  amount: number;
  product: Product;
};

export enum Category {
  SWEET = "Auto",
  ACCESSORIES = "Zubehoer",
  NON = "Keine Kategorie",
}

export type User = {
  firstName: string;
  houseNo: number;
  lastName: string;
  numberOfInstances: number;
  password: string;
  residence: string;
  street: string;
  zipCode: string;
  email: string;
};

export type Invoice = {
  id: number;
  product: string;
  quantity: number;
  totalPrice: number;
  priceWithoutVat: number;
  premiumCustomer: boolean;
};
