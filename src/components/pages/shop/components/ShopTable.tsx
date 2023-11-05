import { Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useContext, useEffect, useState } from "react";
import { Product } from "../../../../models";
import { LocaleContext } from "../../../../context/localContext";

type Props = {
  products: Product[];
  addProduct: (product: Product) => void;
};

export const ShopTable: React.FC<Props> = ({ products, addProduct }) => {
  const [selected, setSelected] = useState<Product>();
  const { locale } = useContext(LocaleContext);

  useEffect(() => {
    console.log("rendering shop table");
  });

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "a" && selected) {
        addProduct(selected);
      }
    };

    document.addEventListener("keypress", handler);

    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, [selected]);

  return (
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
              selected={row.id === selected?.id}
              onClick={() => setSelected(row)}
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
  );
};
