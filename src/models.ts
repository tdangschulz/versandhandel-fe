export type Product = {
  name: string;
  price: number;
  id: number;
  description?: string;
  category?: Category;
  vatRate: number;
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
  id?: number;
  firstName: string;
  houseNo: number;
  lastName?: string;
  numberOfInstances?: number;
  password?: string;
  residence: string;
  street: string;
  zipCode: string;
};

export type Invoice = {
  product: { id: number };
  customer: User;
  quantity: number;
  totalPrice: number;
  priceWithoutVat: number;
  isPremiumCustomer: boolean;
};
