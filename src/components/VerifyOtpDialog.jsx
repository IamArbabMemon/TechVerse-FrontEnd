import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {
  Box,
  DialogActions,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ErrorToaster, SuccessToaster } from "./Toaster";

function VerifyOtpDialog({ open, handleClose, accountType }) {
  console.log("🚀 ~ VerifyOtpDialog ~ accountType:", accountType)
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      let apiUrl;
      if(accountType === 'wholeseller'){
        console.log("wholesell")
        apiUrl = `http://localhost:3001/user/wholeSeller/updatePassword`
      }else{
        console.log("User==>")
        apiUrl = `http://localhost:3001/user/updatePassword`
      }
      const response = await fetch(
        apiUrl,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            otp: data.get("otp"),
            email: data.get("email"),
            password: data.get("password"),
          }),
        }
      );
      if (response.ok) {
        const responseData = await response.json();
        if (responseData?.success) {
          SuccessToaster("Password has been updated")
          window.location.href = "/signIn";
        }
      }
      if (response.status === 400) {
        const responseData = await response.json();
        ErrorToaster(responseData?.error)
        
      }
    } catch (error) {
      console.log("Otp Error===>",error)
      ErrorToaster(error)}
  };

  return (
    <Dialog open={open} maxWidth="xs" fullWidth>
      <DialogTitle id="otp-dialog-title">Enter OTP</DialogTitle>
      <DialogContentText id="otp-dialog-description" sx={{ px: 3 }}>
        Please enter the OTP (One-Time Password) sent to your email.
      </DialogContentText>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="otp"
            label="Enter OTP"
            name="otp"
            autoComplete="otp"
            autoFocus
          />
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
          <TextField
            margin="normal"
            required
            fullWidth
            type="password"
            id="password"
            label="Enter New Password"
            name="password"
            autoComplete="password"
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
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default VerifyOtpDialog;
