import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DeleteIcon from '@mui/icons-material/Delete';
import { ErrorToaster, SuccessToaster } from "../components/Toaster";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const navigate = useNavigate();
  const businessName = localStorage.getItem("businessName")

  const [productData, setProductData] = useState({
    item: "",
    price: "",
    quantity: "",
    description: "",
    storeName: businessName,
    image: null
  });

  const [categoryType, setCategoryType] = React.useState(null);

  const handleCategory = (event) => {
    setCategoryType(event.target.value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const [productImages, setProductImages] = useState([]);
  console.log("🚀 ~ CreateProduct ~ productImages:", productImages)

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && productImages.length < 4) {
      const newImages = [...productImages, e.target.files[0]];
      setProductImages(newImages);
    }
  };

  const handleImageDelete = (index) => {
    const newImages = productImages.filter((_, imgIndex) => imgIndex !== index);
    setProductImages(newImages);
  };

  // const handleImageChange = (e) => {
  //   console.log("image=>", e.target.files[0])
  //   setProductData({ ...productData, image: e.target.files[0] });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("item", productData.item);
      formDataToSend.append("category", categoryType);
      formDataToSend.append("price", productData.price);
      formDataToSend.append("quantity", productData.quantity);
      formDataToSend.append("description", productData.description);
      formDataToSend.append("storeName", productData.storeName);
      productImages.forEach((image, index) => {
        formDataToSend.append(`image`, image);
      });
      
      const response = await fetch("http://localhost:3001/products/addProduct",{
        method: "POST",
        body: formDataToSend,
      })
      if (response.ok) {
        // Handle success response
        console.log("Product created successfully");
        SuccessToaster("Product added")
        navigate('/wproducts')
      } else {
        const responeData = await response.json()
        console.log("🚀 ~ handleSubmit ~ responeData:", responeData)
        // Handle error response
        ErrorToaster("Make Sure Image is Uploaded")
        console.error("Failed to create product:", response);
      }
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
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
        <Grid item xs={12} md={6}  lg={6}>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <InputLabel id="account-type-label" sx={{ pr: 1 }}>
        Upload Image
      </InputLabel>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        disabled={productImages.length >= 4}
        style={{ display: 'none' }}
        id="icon-button-file"
      />
      <label htmlFor="icon-button-file">
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
          disabled={productImages.length >= 4}
        >
          <UploadFileIcon style={{fontSize:"36px"}}/>
        </IconButton>
      </label>
      </Box>
      {productImages.length >= 4 && (
          <Typography variant="body2" color="error">
            Maximum 4 images allowed.
          </Typography>
        )}
        </Grid>
        <Grid item xs={12}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {productImages.map((image, index) => (
            <Box key={index} sx={{ position: 'relative' }}>
              <img
                src={URL.createObjectURL(image)}
                alt={`Product ${index + 1}`}
                style={{ width: 75, height: 75, borderRadius: '4px', objectFit: 'cover' }}
              />
              <IconButton
                sx={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  backgroundColor: 'rgba(255, 255, 255, 0.7)',
                  borderRadius: '50%',
                  p: 0.5,
                }}
                onClick={() => handleImageDelete(index)}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          ))}
        </Box>
      </Grid>
        <Grid item xs={12} sx={{ mt:4}}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
          >
            Create
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default CreateProduct;
