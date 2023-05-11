import { Button, Grid } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import * as React from "react";
import { getProducts } from "../../../api/product";
import { Product } from "../../../models";
import withRoot from "../../hocs/withRoot";
import { ProductDialog } from "./ProductDialog";

const ProductDetails: React.FC = () => {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [showDialog, setShowDialog] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState<Product>();

  React.useEffect(() => {
    const fetch = async () => {
      const avaiableProducts = await getProducts();
      setProducts(avaiableProducts);
    };
    fetch();
  }, []);

  const addProduct = () => {
    setSelectedProduct(undefined);
    setShowDialog(true);
  };

  const afterSubmit = (product: Product) => {
    const index = products.findIndex((p) => p.id === product.id);
    if (index > 0) {
      products[index] = product;
    } else {
      products.push(product);
    }

    setProducts(products);
    setShowDialog(false);
    setSelectedProduct(undefined);
  };

  const afterDelete = (product: Product) => {
    const index = products.findIndex((p) => p.id === product.id);
    delete products[index];
    setProducts(products.filter(Boolean));
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
      ></ProductDialog>
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
                  <TableCell sx={{ width: 100 }} align="right">
                    Price
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
