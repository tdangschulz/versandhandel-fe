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

const ShopPage: FC = () => {
  const { dispatch, state } = useGlobalState();
  const { locale } = useContext(LocaleContext);
  const [sorted, setSorted] = useState<Product[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const availableProducts = await getProducts();
      dispatch({ type: "AVAILABLE_PRODUCTS", payload: availableProducts });
    };

    if (state.products.length === 0) {
      fetch();
    }
  }, []);

  useEffect(() => {
    const sortedProducts = state.products.sort((a, b) =>
      b.name > a.name ? -1 : 1
    );
    setSorted(sortedProducts);
  }, [state.products]);

  const inputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const addProduct = useCallback((product: Product) => {
    dispatch({ type: "ADD_ITEM", payload: product });
  }, []);

  const table = useMemo(() => {
    return <ShopTable addingProduct={addProduct} products={sorted}></ShopTable>;
  }, [sorted]);

  return (
    <ThemeProvider theme={theme}>
      <Grid container alignItems="start">
        <Grid item sm={12}>
          <TextField
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
