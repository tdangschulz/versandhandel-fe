import LockOutlinedIcon from "@mui/icons-material/ShoppingCart";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import { ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";
import theme from "../../commons/theme";
import { getAdminInfo, getUserInfo } from "../../../api/userApi";
import { useGlobalState } from "../../../context/globalContext";
import { useNavigate } from "react-router-dom";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://bredex.de/">
        bredex
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export const LoginPage: React.FC = () => {
  const { state, dispatch } = useGlobalState();
  const navigate = useNavigate();

  const login = async (
    userId: string | undefined,
    password: string | undefined
  ) => {
    let user;
    if (userId && password) {
      localStorage.setItem("auth", window.btoa(`${userId}:${password}`));
      localStorage.setItem("userId", userId);

      user = await getAdminInfo(userId.toString());

      navigate("/products");
    } else if (userId) {
      localStorage.setItem("auth", window.btoa(`${userId}:`));
      localStorage.setItem("userId", userId);
      user = await getUserInfo(userId.toString());
    }

    if (dispatch && user) {
      dispatch({
        ...state,
        userInfo: {
          firstName: user.firstName,
          isAdmin: false,
          address: {
            city: user.residence,
            street: user.street,
            zipCode: user.zipCode,
            email: user.email,
            houseNo: user.houseNo,
            residence: user.residence,
          },
        },
      });
      navigate("/shop");
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const userId = data.get("id");
    const password = data.get("password");

    login(userId?.toString(), password?.toString());
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Versand 73!
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="id"
              label="User Id"
              name="id"
              autoComplete="id"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: "secondary.main" }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
};
