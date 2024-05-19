// CheckoutPage.js
import React, { Fragment, useState } from "react";
import { useProductContext } from "../ProductContext";
import {
  Alert,
  Box,
  Button,
  Card,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useNavigate } from "react-router-dom";
import { Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import img7 from "../assets/airdot.webp";
import { decrementQ, incrementQ, removeFromCart,clearCart } from "../store/productsSlice";
import PdfDocument from "./PdfDocument";
import { ErrorToaster } from "./Toaster";
<link
  href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400&display=swap"
  rel="stylesheet"
></link>;

const CheckoutPage = () => {
  const businessName = localStorage.getItem("businessName");
  
  const [province, setProvince] = React.useState("");

  //* logic for apply redux
  const { cartItems } = useSelector((state) => state.productCount);
  let totalCount = 0;

  // const notify = () => toast("Information Submitted");

  let store_name;

  cartItems.forEach((item) => {
    let productTotal = item.price * item.qty;

    store_name = item.storeName;

    totalCount += productTotal;
  });

  const dispatch = useDispatch();

  const Navigate = useNavigate();

  const handleChange = (event) => {
    setProvince(event.target.value);
  };

  const [quantity, setQuantity] = useState(1);
  const [userProfit, setUserProfit] = useState(0);
  const [itemProfits, setItemProfits] = useState({});
  const [showItemProfits, setShowItemProfits] = useState({});
  const [showPDF, setShowPDF] = useState(false);
  const [pdfDialog, setPdfDialog] = useState(false);

  const handleClick = () => {
    setShowPDF(true);
    setPdfDialog(!pdfDialog);
  };

  const calculateItemProfit = (item, profitValue) => {
    setItemProfits((prevProfits) => ({
      ...prevProfits,
      [item._id]: profitValue,
    }));
    setShowItemProfits((prevProfits) => ({
      ...prevProfits,
      [item._id]: profitValue,
    }));
  };

  const handleIncQuantity = (item) => {
    let profitVal = (item?.qty + 1) * itemProfits[item._id];
    setShowItemProfits((prevProfits) => ({
      ...prevProfits,
      [item._id]: profitVal,
    }));
  };

  const handleDecQuantity = (item) => {
    let profitVal = (item?.qty - 1) * itemProfits[item._id];
    setShowItemProfits((prevProfits) => ({
      ...prevProfits,
      [item._id]: profitVal,
    }));
  };

  const totalProfit = Object.values(showItemProfits).reduce(
    (acc, profit) => acc + profit,
    0
  );

  const handleCancelButton = () => {
    dispatch(clearCart());
    Navigate("/");
  };

  const deliveryPrice = 120;

  const selectedProductPrice = cartItems && cartItems.price;
  const priceWithoutCurrency = selectedProductPrice
    ? +selectedProductPrice.replace("$", "")
    : 0;
  const totalPrice =
    priceWithoutCurrency * quantity + userProfit + deliveryPrice;

  const handleCheckout = async (event) => {
    const token = localStorage.getItem("token");
    if(cartItems.length === 0){
      ErrorToaster("Please Select Product");
      return
    }

    if (!token) {
      alert("PLEASE LOGIN FIRST TO PROCEED!");

      Navigate("/signIn");
      return;
    } else {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      try {
        const formdata = {
          name: data.get("username"),
          password: data.get("PhoneNumber"),
          province: province,
          city: data.get("city"),
          area: data.get("area"),
          street: data.get("street"),
          houseNo: data.get("houseNo"),
          postalCode: data.get("postalCode"),
        };

        const orderItems = cartItems.map((item) => {
          const profitValue = itemProfits[item._id];
          const formdata = {
            name: data.get("username"),
            phoneNumber: data.get("PhoneNumber"),
            province: province,
            city: data.get("city"),
            area: data.get("area"),
            street: data.get("street"),
            houseNo: data.get("houseNo"),
            postalCode: data.get("postalCode"),
          };
  
          return {
            productId: item._id,
            quantity: item.qty,
            storeName: store_name, // Default to an empty array if no store names found
            orderedBy: businessName,
            profit: profitValue,
            customerDetails: formdata
          };
        });
        console.log("🚀 ~ orderItems ~ orderItems:", orderItems)

        formdata.orderItems = orderItems;

        const response = await fetch(
          "http://localhost:3001/orders/placeOrder",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(orderItems),
          }
        );

        const responseData = await response.json();
        if(responseData?.message == "Orders has been placed"){
        toast("Orders has been placed");
        // event.currentTarget.reset();
        dispatch(clearCart());
        Navigate("/orders");
        }
        
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="parent">
      {showPDF && <PdfDocument open={pdfDialog} onClose={() => setPdfDialog(false)} data={cartItems}/>}
      <Grid container spacing={2} columns={16}>
        <Grid item xs={8}>
          <div style={{ padding: "20px" }} className="child1">
            <Typography variant="h6" gutterBottom>
              Shipping address
            </Typography>

            <form onSubmit={handleCheckout}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="username"
                    name="username"
                    label="Customer Name"
                    fullWidth
                    autoComplete="given-name"
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="PhoneNumber"
                    name="PhoneNumber"
                    label="Phone Number"
                    fullWidth
                    autoComplete="family-name"
                    variant="standard"
                  />
                </Grid>

                <Grid>
                  <FormControl sx={{ m: 2, minWidth: 120 }} size="small">
                    <InputLabel id="demo-select-small-label">
                      Province
                    </InputLabel>
                    <Select
                    variant="standard"
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                      value={province}
                      label="Age"
                      onChange={handleChange}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={"Sindh"}>Sindh</MenuItem>
                      <MenuItem value={"Punjab"}>Punjab</MenuItem>
                      <MenuItem value={"Kpk"}>Kpk</MenuItem>
                      <MenuItem value={"Balochistan"}>Balochistan</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="city"
                    name="city"
                    label="City"
                    fullWidth
                    autoComplete="shipping address-level2"
                    variant="standard"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    id="area"
                    name="area"
                    label="Sector/Block/Area Name"
                    fullWidth
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="houseNo"
                    name="houseNo"
                    label="House/Bulding/Apartment Number"
                    fullWidth
                    variant="standard"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    id="street"
                    name="street"
                    label="Road Name/Street Number"
                    fullWidth
                    variant="standard"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="postalCode"
                    name="postalCode"
                    label="Zip / Postal code"
                    fullWidth
                    autoComplete="shipping postal-code"
                    variant="standard"
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="secondary"
                        name="saveAddress"
                        value="yes"
                      />
                    }
                    label="Use this address for payment details"
                  />
                </Grid>
              </Grid>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "1rem",
                  padding: "10px",
                }}
              >
                <Button variant="contained" type="submit">
                  Checkout
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleCancelButton}
                >
                  Cancel
                </Button>
                <Button onClick={() => handleClick()} >Invoice</Button>
              </div>

              <ToastContainer />
            </form>
          </div>
        </Grid>
        <Grid item xs={8}>
          <div
            style={{ padding: "20px", fontFamily: "sans-serif" }}
            className="child2"
          >
            <Card
              style={{
                backgroundColor: "#fafafa",
                marginTop: "5rem",
                borderRadius: "5px",
              }}
              variant="outlined"
            >
              <h2>Order Summary</h2>
              {cartItems.length > 0 && (
                <Fragment>
                  {cartItems.map((item, index) => (
                    <Box>
                      <Box
                        key={index}
                        sx={{
                          display: "flex",
                          justifyContent: "space-evenly",
                          py: 1,
                        }}
                      >
                        <Box>
                          <img
                            src={item?.image[0]}
                            style={{ borderRadius: "5px", height: "100px" }}
                            alt="ProductImage"
                          />
                        </Box>
                        <Box>
                          <p>Name: {item.item}</p>
                          <p>Price: {item.price}</p>
                          <p>Delievery Price: {deliveryPrice}</p>
                          <p>Quantity: {item.qty}</p>
                          <Button
                            variant="outlined"
                            onClick={() => {
                              dispatch(incrementQ(item));
                              handleIncQuantity(item);
                            }}
                          >
                            +
                          </Button>
                          <Button
                            variant="outlined"
                            onClick={() => {
                              dispatch(decrementQ(item));
                              handleDecQuantity(item);
                            }}
                          >
                            -
                          </Button>
                        </Box>
                        <Box>
                          <Box pb={2}>
                            <p>My Profit: </p>
                            <TextField
                              value={itemProfits[item._id] || 0}
                              onChange={(event) =>
                                calculateItemProfit(
                                  item,
                                  parseFloat(event.target.value)
                                )
                              }
                            />
                            {/* <p>Total Price: {itemPr\ofits[index]}</p> */}
                          </Box>
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() => dispatch(removeFromCart(item))}
                          >
                            {" "}
                            Remove{" "}
                          </Button>
                        </Box>
                      </Box>
                      <Divider />
                    </Box>
                  ))}

                  <Box>
                    <p>SubTotal: {totalCount}</p>
                    <p>Total Profit: {totalProfit}</p>
                    <p>Delievery Charges: {deliveryPrice}</p>
                  </Box>

                  <div
                    style={{
                      display: "flex",
                      gap: "5px",
                      justifyContent: "center",
                      paddingTop: "16px",
                    }}
                  ></div>
                </Fragment>
              )}
            </Card>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default CheckoutPage;
