import { Button, Grid } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import * as React from "react";
import withRoot from "../../hocs/WithRoute";
import ShoppingCart from "../ShoppingCart/ShopingCart";
import { useGlobalState } from "../../../context/globalContext";
import { Product } from "../../../models";
import { getProducts } from "../../../api/product";
import { ProductDialog } from "./ProductDialog";

const ProductDetails: React.FC = () => {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [showDialog, setShowDialog] = React.useState(false);

  React.useEffect(() => {
    const fetch = async () => {
      const avaiableProducts = await getProducts();
      setProducts(avaiableProducts);
    };
    fetch();
  }, []);

  const addProduct = () => {
    setShowDialog(true);
  };

  return (
    <>
      <ProductDialog open={showDialog}></ProductDialog>
      <Grid container justifyContent="flex-end">
        <Button onClick={addProduct} sx={{ mb: 1 }}>
          New
        </Button>
        <Grid item xs={12} lg={12}>
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
                      <Button onClick={() => addProduct(row)}>Edit</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
};

export default withRoot(ProductDetails);
