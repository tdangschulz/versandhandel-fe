import { Grid, TextField, ThemeProvider } from "@mui/material";

import {
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { getProducts } from "../../../api/product";
import { useGlobalState } from "../../../context/globalContext";
import { Product } from "../../../models";
import theme from "../../commons/theme";
import withRoot from "../../hocs/withRoot";
import ShoppingCart from "../ShoppingCart/ShoppingCart";
import { ShopTable } from "./components/ShopTable";
import { LocaleContext } from "../../../context/localContext";
import { useProducts } from "../../hooks/useProducts";

const ShopPage: FC = () => {
  const { dispatch } = useGlobalState();
  const { locale } = useContext(LocaleContext);
  const { products } = useProducts();
  const inputRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const addProduct = useCallback((product: Product) => {
    dispatch({ type: "ADD_ITEM", payload: product });
  }, []);

  const table = useMemo(() => {
    return (
      <ShopTable
        addingProduct={addProduct}
        products={[...products].filter(
          (p) =>
            p.name.toLowerCase().startsWith(searchTerm.toLowerCase()) ||
            p.description?.toLowerCase().startsWith(searchTerm.toLowerCase())
        )}
      ></ShopTable>
    );
  }, [products, searchTerm]);

  return (
    <ThemeProvider theme={theme}>
      <Grid container alignItems="start">
        <Grid item sm={12}>
          <TextField
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.currentTarget.value)}
            placeholder={locale.search}
            inputRef={inputRef}
          ></TextField>
        </Grid>
        <Grid item xs={12} lg={8}>
          {table}
        </Grid>
        <Grid
          item
          xs={12}
          lg={4}
          sx={{ marginTop: { xs: 2, sm: 3, md: 4, lg: 0 } }}
        >
          <ShoppingCart></ShoppingCart>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default withRoot(ShopPage);
