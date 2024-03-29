import { Button, Grid } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import * as React from "react";
import { Product } from "../../../models";
import withRoot from "../../hocs/withRoot";
import { ProductDialog } from "./ProductDialog";
import { useGlobalState } from "../../../context/globalContext";
import { LocaleContext } from "../../../context/localContext";
import { useProducts } from "../../hooks/useProducts";

const ProductDetails: React.FC = () => {
  const [showDialog, setShowDialog] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState<Product>();
  const { dispatch } = useGlobalState();
  const { locale } = React.useContext(LocaleContext);
  const { products } = useProducts();

  const addProduct = () => {
    setSelectedProduct(undefined);
    setShowDialog(true);
  };

  const afterSubmit = (product: Product) => {
    dispatch({ type: "UPSERT_PRODUCT", payload: product });
    setShowDialog(false);
    setSelectedProduct(undefined);
  };

  const afterDelete = (product: Product) => {
    dispatch({ type: "DELETE_PRODUCT", payload: product });
    setSelectedProduct(undefined);
    setShowDialog(false);
  };

  return (
    <>
      <ProductDialog
        product={selectedProduct}
        open={showDialog}
        afterSubmit={afterSubmit}
        afterDelete={afterDelete}
        onCancel={() => {
          setSelectedProduct(undefined);
          setShowDialog(false);
        }}
        showDeleteButton={false}
      ></ProductDialog>
      <Grid container justifyContent="flex-end">
        <Button variant="outlined" onClick={addProduct} sx={{ mb: 2 }}>
          {locale.newProduct}
        </Button>
        <Grid item xs={12} lg={12}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Id</TableCell>
                  <TableCell align="left">{locale.product}</TableCell>
                  <TableCell align="left">{locale.description}</TableCell>
                  <TableCell sx={{ width: 100 }} align="right">
                    {locale.price}
                  </TableCell>
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
                      <Button
                        onClick={() => {
                          setSelectedProduct(row);
                          setShowDialog(true);
                        }}
                      >
                        Edit
                      </Button>
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
