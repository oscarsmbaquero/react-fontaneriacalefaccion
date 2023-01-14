import * as React from "react";
//import '/Login.scss';
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { loginUser, useDispatchAuth } from "../../../context";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";

const loginInitialState = {
  email: "",
  password: "",
};

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://oit-gules.vercel.app/">
        App Developed by OSMB
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
  const navigate = useNavigate();

  const [loginForm, setLoginForm] = useState(loginInitialState);

  const handleLoginForm = (event) => {
    const { name, value } = event.target;
    setLoginForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const dispatch = useDispatchAuth();
  //console.log(dispatch,22);
  //enviar login al server
  const handleLogin = async (event) => {
    console.log(loginForm);
    event.preventDefault();
    try {
      loginUser(dispatch, loginForm).then((res) => {
        if (res === "The email & password combination is incorrect!") {
          Swal.fire({
            title: "Error!",
            text: "El email o el password no es correcto",
            icon: "error",
            confirmButtonText: "Ok",
          });
          console.log(res);
        } else {
          navigate("/avisos");
        }
      });

      setLoginForm(loginInitialState);
    } catch (error) {}
  };
  //   const handleSubmit = (event) => {
  //     event.preventDefault();
  //     const data = new FormData(event.currentTarget);
  //     console.log({
  //       email: data.get('email'),
  //       password: data.get('password'),
  //     });
  //   };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            paddingTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5"></Typography>
          <Box
            component="form"
            onSubmit={handleLogin}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={handleLoginForm}
              autoFocus
              sx={{ input: { color: "white" } }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={handleLoginForm}
              autoComplete="current-password"
              sx={{ input: { color: "white" } }}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item xs>
                <Link href="/users/register" variant="body2">
                  {"No tienes cuenta? Registrate"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
