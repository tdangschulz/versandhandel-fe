import { Button, Grid, ThemeProvider, useMediaQuery } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import * as React from "react";
import { getProducts } from "../../../api/product";
import { useGlobalState } from "../../../context/globalContext";
import { Product } from "../../../models";
import withRoot from "../../hocs/withRoot";
import ShoppingCart from "../ShoppingCart/ShopingCart";
import theme from "../../commons/theme";

const ProductPage: React.FC = () => {
  const { state, dispatch } = useGlobalState();
  const [products, setProducts] = React.useState<Product[]>([]);
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  React.useEffect(() => {
    const fetch = async () => {
      const avaiableProducts = await getProducts();
      setProducts(avaiableProducts);
    };
    fetch();
  }, []);

  const addProduct = (product: Product) => {
    state.shoppingCart.total += product.price;
    state.shoppingCart.priceWithoutVat +=
      (product.price * 100.0) / (100 + product.vatRate);
    const cartItem = state.shoppingCart.products.find(
      (p) => p.product.id === product.id
    );

    if (cartItem) {
      cartItem.amount += 1;
    } else {
      state.shoppingCart.products.push({ amount: 1, product });
    }

    if (dispatch) dispatch({ ...state });
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container>
        <Grid item xs={12} lg={8}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Id</TableCell>
                  <TableCell align="left">Product</TableCell>
                  <TableCell align="left">Description</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{
                      "&:last-child td, &:last-child th": {
                        border: 0,
                      },
                    }}
                  >
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.description}
                    </TableCell>
                    <TableCell align="right">{row.price} €</TableCell>
                    <TableCell padding="checkbox">
                      <Button onClick={() => addProduct(row)}>Add</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12} lg={4} sx={{ marginTop: isSmall ? 5 : 0 }}>
          <ShoppingCart></ShoppingCart>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default withRoot(ProductPage);
