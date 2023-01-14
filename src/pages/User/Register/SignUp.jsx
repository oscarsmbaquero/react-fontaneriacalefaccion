import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

//import { loginUser, useDispatchAuth } from "../../../context";
import { registerUser, useDispatchAuth } from '../../../context';
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const loginInitialState = {
  email: "",
  password: "",
  name: "",
  image:""
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
      <Link color="inherit" href="https://github.com/oscarsmbaquero">
       OIT -Soluciones y Servicios Tecnológicos.
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  //const navigate = useNavigate();
  const dispatch = useDispatchAuth();

  const [registerForm, setRegisterForm] = useState(loginInitialState);

  const handleRegisterForm = (event) => {
   
    const { name, value } = event.target;
    
    setRegisterForm((prevState) => ({ ...prevState, [name]: value }));
  };
   console.log(registerForm,'registerForm')
 
  //console.log(dispatch,22);
  //enviar login al server
  const handleRegister = async (event) => {
    event.preventDefault();
    try {
        registerUser(dispatch, registerForm);
        setRegisterForm(loginInitialState);
    } catch (error) {
        console.log(error);
    }
};

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
          <Typography component="h1" variant="h5">
           
          </Typography>
          <Box
            component="form"
            onSubmit={handleRegister}
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
              // autoComplete="email"
              onChange={handleRegisterForm}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="name"
              label="Name & Surname"
              type="name"
              id="name"
              onChange={handleRegisterForm}
              
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={handleRegisterForm}
              //autoComplete="current-password"
            />
            {/* <input type="file" alt="" name="image" className='edit__input'/> */}
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
              Sign Up
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Olvidaste contraseña?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/user/login" variant="body2">
                  {"Ya tienes cuenta? LogIn"}
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
