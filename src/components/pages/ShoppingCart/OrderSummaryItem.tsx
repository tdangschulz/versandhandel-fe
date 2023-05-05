import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../../../context/globalContext";
import * as React from "react";
import { ShoppingItem } from "../../../models";

const useStyles = {
  root: {
    position: "sticky",
    top: "1rem",
    minWidth: "275",
  },

  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

export default function OrderSummaryItem() {
  const { state, dispatch } = useGlobalState();

  const navigate = useNavigate();

  const showInvoce = () => {
    navigate("/checkout");
  };

  const deleteItem = (item: ShoppingItem) => {
    state.shoppingCart.total -= item.product.price;
    const cartItem = state.shoppingCart.products
      .filter(Boolean)
      .find((p) => p.product.id === item.product.id);

    if (cartItem) {
      cartItem.amount -= 1;

      if (cartItem.amount <= 0) {
        const index = state.shoppingCart.products.indexOf(cartItem);
        delete state.shoppingCart.products[index];
        state.shoppingCart.products =
          state.shoppingCart.products.filter(Boolean);
      }
    }

    if (dispatch) dispatch({ ...state });
  };

  return (
    <Card sx={useStyles.root}>
      <CardContent>
        <Typography color="textSecondary" gutterBottom sx={useStyles.title}>
          Shopping Cart
        </Typography>
        <Typography variant="caption" component="h1">
          Order Summary
        </Typography>
        <Typography variant="subtitle2">
          <hr />
        </Typography>
        <Grid container>
          {state.shoppingCart.products.map((item) => (
            <React.Fragment key={item.product.id}>
              <Grid item xs={11} sm={11} md={11} lg={9}>
                <Typography
                  key={item.product.id}
                  variant="body1"
                  component="div"
                  align="left"
                >
                  {item.product.name}
                  {item.amount > 1 ? `(${item.amount})` : ""}
                  <Button onClick={() => deleteItem(item)}>del</Button>
                </Typography>
              </Grid>
              <Grid item xs={1} sm={1} md={1} lg={3}>
                <Typography variant="h6" component="div" align="right">
                  {item.product.price * item.amount} €
                </Typography>
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
        <hr />
        <Grid container>
          <Grid item xs={11} sm={11} md={11} lg={9}>
            <Typography variant="body1" component="div" align="left">
              Total
            </Typography>
          </Grid>
          <Grid item xs={1} sm={1} md={1} lg={3}>
            <Typography variant="h6" component="div" align="right">
              {state.shoppingCart.total.toFixed(2)} €
            </Typography>
          </Grid>
        </Grid>
      </CardContent>

      <CardActions>
        <Button
          disabled={state.shoppingCart.products.length === 0}
          size="large"
          color="primary"
          onClick={showInvoce}
        >
          BUY NOW
        </Button>
      </CardActions>
    </Card>
  );
}
