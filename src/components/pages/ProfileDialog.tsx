import {
  DialogActions,
  DialogContent,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import * as React from "react";
import { Profile, useGlobalState } from "../../context/globalContext";
import { saveAdminProfile } from "../../api/userApi";
import { mapUserInfo } from "../hocs/WithAuth";

export interface ProfileDialogProps {
  open: boolean;
  afterSubmit?: (product: Profile) => void;
  afterDelete?: (product: Profile) => void;
  onCancel?: () => void;
  profile?: Profile;
}

export function ProfileDialog(props: ProfileDialogProps) {
  const { onCancel, afterSubmit, open, profile, afterDelete } = props;
  const { state, dispatch } = useGlobalState();
  const [firstName, setFirstName] = React.useState<string>();
  const [street, setStreet] = React.useState<string>();

  const [houseNo, setHouseNo] = React.useState<Number>();
  const [lastName, setLastName] = React.useState<string>();
  const [residence, setResidence] = React.useState<string>();
  const [password, setPassword] = React.useState<string>();

  const [zipCode, setZipCode] = React.useState<string>();
  const [id, setId] = React.useState<number>();

  React.useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      setId(Number(userId));
    }
  }, []);

  React.useEffect(() => {
    setFirstName(profile?.firstName);
    setStreet(profile?.address.street);
    setHouseNo(Number(profile?.address.houseNo));
    setLastName(profile?.lastName);
    setResidence(profile?.address.residence);
    setPassword(profile?.password);
    setZipCode(profile?.address.zipCode);
  }, [profile]);

  const deleting = async () => {};

  const save = async () => {
    let response;
    if (state.userInfo?.isAdmin) {
      response = await saveAdminProfile({
        id,
        firstName,
        houseNo,
        lastName,
        residence,
        password,
        zipCode,
        street,
      });
    }

    if (typeof afterSubmit === "function" && dispatch && state.userInfo) {
      const profile = mapUserInfo(response, state.userInfo.isAdmin);
      dispatch({
        ...state,
        userInfo: profile,
      });

      afterSubmit(profile);
    }
  };

  return (
    <Dialog open={open}>
      <DialogTitle>Profile</DialogTitle>

      <DialogContent>
        <TextField
          autoFocus
          margin="normal"
          id="name"
          label="Name"
          type="text"
          fullWidth
          variant="standard"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
        />

        <TextField
          autoFocus
          margin="normal"
          id="lastName"
          label="Nachname"
          type="text"
          fullWidth
          variant="standard"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
        />
        <TextField
          autoFocus
          margin="normal"
          id="street"
          label="Straße"
          type="text"
          fullWidth
          variant="standard"
          value={street}
          onChange={(event) => setStreet(event.target.value)}
        />
        <TextField
          autoFocus
          margin="normal"
          id="houseNo"
          label="Hausnummer"
          type="text"
          fullWidth
          variant="standard"
          value={houseNo}
          onChange={(event) => setHouseNo(Number(event.target.value))}
        />
        <TextField
          autoFocus
          margin="normal"
          id="zipCode"
          label="PLZ"
          type="text"
          fullWidth
          variant="standard"
          value={zipCode}
          onChange={(event) => setZipCode(event.target.value)}
        />
        <TextField
          autoFocus
          margin="normal"
          id="zipCode"
          label="PLZ"
          type="text"
          fullWidth
          variant="standard"
          value={residence}
          onChange={(event) => setResidence(event.target.value)}
        />
        <TextField
          autoFocus
          margin="normal"
          id="password"
          label="Passwort"
          type="text"
          fullWidth
          variant="standard"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={deleting} sx={{ mr: 5 }}>
          Delete
        </Button>
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={save}>Speichern</Button>
      </DialogActions>
    </Dialog>
  );
}