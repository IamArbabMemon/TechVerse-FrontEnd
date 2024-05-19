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
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../store/AuthContext";
import { useContext } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { ErrorToaster } from "./Toaster";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="http://localhost:3000">
        TechVerse
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignIn() {
  const navigate = useNavigate();
  const { setAccessToken, setRole } = useContext(AuthContext);
  const [accountType, setAccountType] = React.useState(null);
  const [response,setResponse] = React.useState(null);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const handleChange = (event) => {
    setAccountType(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (accountType === null) {
      // If not selected, display an error message
      ErrorToaster("Please select an account type");
      return; // Stop further execution
    }
    if (accountType === "wholeseller") {
      try {
        const response = await fetch(
          "http://localhost:3001/user/wholeSellerLogin",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              businessName: data.get("businessName"),
              password: data.get("password"),
            }),
          }
        );

        if(response.ok){
          const responseData = await response.json();

        if(responseData?.error == "Wrong Password"){
          ErrorToaster(responseData?.message) 
        }else{
          setIsLoggedIn(true);
          setResponse(responseData);
        }
        }
        if(response.status === 404){ErrorToaster("Wrong user or Password")}
      } catch (error) {
        ErrorToaster(error)
        console.error("There was a problem with the fetch operation:", error);
      }
    } else {
      try {
        const response = await fetch("http://localhost:3001/user/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            businessName: data.get("businessName"),
            password: data.get("password"),
          }),
        });
        if(response.status === 200){
          const responseData = await response.json();
        if(responseData?.message == "Wrong Password"){
          ErrorToaster(responseData?.message) 
        }else{
          setIsLoggedIn(true);
          setResponse(responseData);
        }
        }
        if(response.status === 404){ErrorToaster("Wrong user or Password")}
      } catch (error) {
        ErrorToaster(error)
        console.error("There was a problem with the fetch operation:", error);
      }
    }
  };

  React.useEffect(() => {
    if(isLoggedIn){
      if(accountType === 'wholeseller'){
        localStorage.setItem("token", response?.token);
        setAccessToken(response?.token);
        setRole(response?.userData?.accountType);
        localStorage.setItem("role", response?.userData?.accountType);
        localStorage.setItem("businessName", response?.userData?.businessName);
        localStorage.setItem("accountNumber",response?.userData?.accountNumber);
        navigate("/");
    }else{
      localStorage.setItem("token", response?.token);
        setAccessToken(response?.token);
        setRole(response?.userData[0]?.accountType);
        localStorage.setItem("role", response?.userData[0]?.accountType);
        localStorage.setItem("businessName",response?.userData[0]?.businessName);
        localStorage.setItem("accountNumber", response?.userData[0]?.accountNumber);
        navigate("/");
    }
    }
  }, [response]);

  return (
    <ThemeProvider theme={defaultTheme}>
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
           <Link href="/" underline="none">
            <Box
              component="img"
              src="/logo.jpg"
              alt="Logo"
              sx={{
                width: 200, 
                height: 100,
                marginBottom: 2,
              }}
            />
          </Link>
          {/* <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar> */}
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <FormControl fullWidth required>
              <InputLabel id="account-type-label">Account Type</InputLabel>
              <Select
              required
                labelId="account-type-label"
                id="account-type-select"
                value={accountType}
                label="Account Type"
                onChange={handleChange}
              >
                <MenuItem value="wholeseller">Wholeseller</MenuItem>
                <MenuItem value="user">User</MenuItem>
              </Select>
            </FormControl>

            <TextField
              margin="normal"
              required
              fullWidth
              id="businessName"
              label="BusinessName"
              name="businessName"
              autoComplete="BusinessName"
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
                  <Link href="/forgot"  variant="body2">
                  Forgot password?
                </Link>
                
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
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
