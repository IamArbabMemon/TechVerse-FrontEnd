import React from 'react'
import { Box, Dialog, IconButton, DialogContent, Typography, Button,FormControl, Grid,InputLabel,
    MenuItem,
    Select,
    TextField, } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { useState } from 'react';
import { useEffect } from 'react';
import { ErrorToaster, SuccessToaster } from '../components/Toaster';


const UpdateDialog = ({open, onClose, product, fetchData}) => {
    console.log("🚀 ~ UpdateDialog ~ product:", product)
    const [productData, setProductData] = useState({
        item: "",
        price: "",
        quantity: "",
        description: "",
        storeName: "",
        productId: "",
        image:"",
      });

      useEffect(() => {
        if (product) {
          setProductData({
            item: product.item || "",
            price: product.price || "",
            quantity: product.quantity || "",
            description: product.description || "",
            storeName: product.storeName || "",
            productId: product._id || "",
            image:product.image || "",
          });
          setCategoryType(product.category || "");
        }
      }, [product]);
    const [categoryType, setCategoryType] = React.useState("");

  const handleCategory = (event) => {
    setCategoryType(event.target.value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const dataToSend = JSON.stringify({
            item: productData.item,
            category: categoryType,
            price: productData.price,
            quantity: productData.quantity,
            description: productData.description,
            storeName: productData.storeName,
            productId: productData.productId, 
            image: productData.image,
          });
        console.log("🚀 ~ handleSubmit ~ dataToSend:", dataToSend)

      const response = await fetch("http://localhost:3001/products/updateProduct",{
        method: "POST",
        headers: {
            "Content-Type": "application/json", 
          },
          body: dataToSend,
      })
      if (response.ok) {
        // Handle success response
        console.log("Product updated successfully");
        SuccessToaster("Product Updated")
        onClose()
        fetchData()
      } else {
        const responeData = await response.json()
        // Handle error response
        ErrorToaster("Make Sure Image is Uploaded")
      }
      
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };
  return (
    <Dialog
      open={open}
      onClose={() => {
        setProductData({
          item: "",
          price: "",
          quantity: "",
          description: "",
          storeName: "",
        });
        setCategoryType("");
        onClose();
      }}
      PaperProps={{
        style: {
          borderRadius: "6px",
          minWidth: "600px",
          maxWidth: "600px"
        },
      }}>

      <Box display="flex" justifyContent="space-between">
        <Box></Box>
        {/* <DialogTitle variant='h5' fontWeight="bold">Delete This User?</DialogTitle> */}
        <IconButton onClick={onClose} sx={{ "&:hover": { backgroundColor: "#ffffff" } }}>
          <CancelIcon sx={{ fontSize: '26px', color: "red", mr: 1, "&:hover": { color: "red" } }} />
        </IconButton>
      </Box>
      <DialogContent sx={{ pt: 1 }}>
        <Box display="flex" justifyContent="center" p={1}>
          <Typography variant='h5' fontWeight="bold">Update Product</Typography>
        </Box>
        <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">Create Product</Typography>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <TextField
            fullWidth
            required
            name="item"
            label="Item Name"
            value={productData.item}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}  lg={6}>
        <FormControl fullWidth required>
              <InputLabel id="account-type-label">Category</InputLabel>
              <Select
              required
                labelId="account-type-label"
                id="account-type-select"
                value={categoryType}
                label="Category"
                onChange={handleCategory}
              >
                <MenuItem value="Laptop">Laptop</MenuItem>
                <MenuItem value="Peripherals">Peripherals</MenuItem>
                <MenuItem value="PC Parts">PC Parts</MenuItem>
                <MenuItem value="Gaming PC">Gaming PC</MenuItem>
              </Select>
            </FormControl>
          {/* Laptop, Peripherals, PC Parts, Gaming PC */}
        </Grid>
        <Grid item xs={12} md={6}  lg={6}>
          <TextField
            fullWidth
            required
            name="price"
            label="Price"
            type="number"
            value={productData.price}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}  lg={6}>
          <TextField
            fullWidth
            required
            name="quantity"
            label="Quantity"
            type="number"
            value={productData.quantity}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}  lg={6}>
          <TextField
            fullWidth
            required
            name="description"
            label="Description"
            multiline
            rows={4}
            value={productData.description}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}  lg={6}>
          <TextField
          disabled
            fullWidth
            required
            name="storeName"
            label="Store Name"
            value={productData.storeName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sx={{ mt:4}}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
          >
            Update
          </Button>
        </Grid>
      </Grid>
    </form>
        
      </DialogContent>
    </Dialog>
  )
}

export default UpdateDialog