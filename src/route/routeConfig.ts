import { createBrowserRouter } from "react-router-dom";
import { Invoice } from "../components/pages/invoice/Invoice";
import ProductPage from "../components/pages/shop/ProductPage";
import { LoginPage } from "../components/pages/login/Login";
import withAuth from "../components/hocs/WithAuth";
import CustomerInvoice from "../components/pages/invoice/CustomerInvoice";
import ProductList from "../components/pages/shop/ProductList";
import CustomersList from "../components/pages/user/CustomersList";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LoginPage,
  },
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/shop",
    Component: withAuth(ProductPage),
  },
  {
    path: "/checkout",
    Component: withAuth(Invoice),
  },
  {
    path: "/customer/invoice",
    Component: withAuth(CustomerInvoice),
  },
  {
    path: "/products",
    Component: withAuth(ProductList),
  },
  {
    path: "/customers",
    Component: withAuth(CustomersList),
  },
]);
