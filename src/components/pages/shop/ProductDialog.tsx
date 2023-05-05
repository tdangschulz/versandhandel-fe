import {
  DialogActions,
  DialogContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import * as React from "react";
import { createProduct } from "../../../api/product";

export interface ProductDialogProps {
  open: boolean;
  selectedValue?: string;
  afterSubmit?: () => void;
  onCancel?: () => void;
}

export function ProductDialog(props: ProductDialogProps) {
  const { onCancel, afterSubmit, open } = props;

  const [category, setCategory] = React.useState<string>();
  const [name, setName] = React.useState<string>();
  const [price, setPrice] = React.useState<string>();
  const [description, setDescription] = React.useState<string>();
  const [vatRate, setVat] = React.useState<number>(19);

  const handleClose = () => {
    //onClose(selectedValue);
  };

  const handleListItemClick = (value: SelectChangeEvent) => {
    // onClose(value);
    setCategory(value.target.value);
  };

  const create = async () => {
    //onClose(selectedValue);

    const product = {
      name,
      description,
      price,
      vatRate,
      category,
    };

    console.log(product);

    await createProduct(product);
    //afterSubmit();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>New Product</DialogTitle>

      <DialogContent>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={category}
            label="Category"
            onChange={handleListItemClick}
            variant="standard"
          >
            <MenuItem value={"CAR"}>Auto</MenuItem>
            <MenuItem value={"ACCESSORIES"}>Zubehoer</MenuItem>
            <MenuItem value={"NON"}>Keine Kategorie</MenuItem>
          </Select>
        </FormControl>

        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          type="text"
          fullWidth
          variant="standard"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <TextField
          autoFocus
          margin="dense"
          id="price"
          label="Price"
          type="number"
          fullWidth
          variant="standard"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
        />
        <TextField
          autoFocus
          margin="dense"
          id="description"
          label="Description"
          type="text"
          fullWidth
          variant="standard"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <TextField
          autoFocus
          margin="dense"
          id="vatRate"
          label="Vat"
          type="text"
          fullWidth
          variant="standard"
          value={vatRate}
          onChange={(event) => setVat(Number(event.target.value))}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={create}>Create</Button>
      </DialogActions>
    </Dialog>
  );
}
