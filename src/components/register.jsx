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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

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

export default function SignUp() {
  // const [signupError, setSignupError] = React.useState(null);

  const navigate = useNavigate();
  const [accountType, setAccountType] = React.useState("");
  const [numData, setNumData] = React.useState({
    accountNumber: "",
    mobileNumber: "",
  });

  const [formSubmitted, setFormSubmitted] = React.useState(false);

  const handleChange = (event) => {
    setAccountType(event.target.value);
  };

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    setNumData({ ...numData, [name]: value });
  };

  const handleError = (err) => {
    toast.error(err, {
      position: "bottom-left",
    });
  };

  const handleSuccess = (msg) => {
    toast.success("Account has been successfully created", {
      position: toast.POSITION.TOP_CENTER,
    });

  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setFormSubmitted(true);
    let apiUrl;
    if (accountType === "wholeseller") {
      apiUrl = "http://localhost:3001/user/wholeSellerSignUp";
    } else {
      apiUrl = "http://localhost:3001/user/signUp";
    }
    try {
      if (
        numData.accountNumber.length !== 14 ||
        numData.mobileNumber.length !== 11
      ) {
        handleError("Invalid phone number or account number");
        return;
      }
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.get("Username"),
          email: formData.get("email"),
          businessName: formData.get("Buisness_Name"),
          address: formData.get("adress"),
          accountType: accountType,
          // accountType: formData.get("account_type"),
          accountNumber: formData.get("accountNumber"),
          mobileNumber: formData.get("mobileNumber"),
          password: formData.get("password"),
        }),
      });
      if (response.ok) {
        const responseData = await response.json();

        var { success, message } = responseData;

        handleSuccess(message);
        navigate("/signIn");
      }
    } catch (err) {
      handleError(err);
    }
  };

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
          <ToastContainer />

          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography component="h1" variant="h5">
            Sign up
          </Typography>

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="Username-name"
                  name="Username"
                  required
                  fullWidth
                  id="Username"
                  label="Username"
                  autoFocus
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  type="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="Buisness_Name"
                  label="Buisness Name"
                  name="Buisness_Name"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="adress"
                  label="Address"
                  name="adress"
                  autoComplete="adress"
                  type="text"
                />
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth required>
                  <InputLabel id="account-type-label">Account Type</InputLabel>
                  <Select
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
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="accountNumber"
                  label="Account Number"
                  // type="tel"
                  name="accountNumber"
                  autoComplete="accountNumber"
                  onChange={handleNumberChange}
                  error={formSubmitted && numData.accountNumber.length !== 14}
                  helperText={
                    formSubmitted && numData.accountNumber.length !== 14
                      ? "Account number must be 14 digits long"
                      : null
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="mobileNumber"
                  label="Mobile Number"
                  // type="number"
                  name="mobileNumber"
                  autoComplete="mobileNumber"
                  onChange={handleNumberChange}
                  error={formSubmitted && numData.mobileNumber.length !== 11} // Conditionally apply error style
                  helperText={
                    formSubmitted && numData.mobileNumber.length !== 11
                      ? "Mobile number must be 11 digits long"
                      : null
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/SignIn" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
