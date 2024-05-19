import { Avatar, Box, Button,  Container, CssBaseline, FormControl, Grid, InputLabel, Link,  MenuItem,  Select,  TextField, Typography } from '@mui/material';
import React from 'react'
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../store/AuthContext";
import { useContext } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { ErrorToaster } from "./Toaster";
import VerifyOtpDialog from './VerifyOtpDialog';


function Copyright(props) {
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright © "}
        <Link color="inherit" href="https://mui.com/">
          Your Website
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }
  
  // TODO remove, this demo shouldn't need to reset the theme.
  
  const defaultTheme = createTheme();
  
const ForgotPassword = () => {
  const navigate = useNavigate();

  const { setAccessToken, setRole } = useContext(AuthContext);
  const [response,setResponse] = React.useState(null);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  
  const [accountType, setAccountType] = React.useState(null);
  const handleChange = (event) => {
    setAccountType(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
};

  

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (accountType === null) {
      // If not selected, display an error message
      ErrorToaster("Please select an account type");
      return; // Stop further execution
    }
      try {
        let apiUrl;
        if(accountType === "wholeseller"){
          apiUrl = `http://localhost:3001/user/wholeSeller/getOTP/${data.get("email")}`
        }else{
          apiUrl = `http://localhost:3001/user/getOTP/${data.get("email")}`
        }
        const response = await fetch(apiUrl)
        if(response.ok){
            const responseData = await response.json();
            if(responseData?.success){
                console.log('Successful OTP send and received');
                setOpen(true);
            }
        }
      } catch (error) {
        ErrorToaster(error)
        console.error("There was a problem with the fetch operation:", error);
      }
  };

  React.useEffect(() => {
    
  }, [response]);

  
    return (
        <ThemeProvider theme={defaultTheme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
          <VerifyOtpDialog open={open} handleClose={handleClose} isForgot={true} accountType={accountType} />
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
                Forgot Password
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
                  id="email"
                  label="Enter Email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Submit
                </Button>
                <Grid container>
                  
                  <Grid item>
                    <Link href="/signIn" variant="body2">
                      {"Back to login"}
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

export default ForgotPassword