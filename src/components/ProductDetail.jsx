import React, { useEffect, useState } from "react";
import { Container, Box, Typography, Button, Grid } from "@mui/material";
import { styled } from "@mui/system";
import Carousel from "react-material-ui-carousel";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/productsSlice";
import { SuccessToaster } from "./Toaster";
import { AuthContext } from "../store/AuthContext";

const ProductDetail = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { role } = React.useContext(AuthContext);
  const [product, setProduct] = useState([]);
  console.log("🚀 ~ ProductDetail ~ product:", product);
  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/products/item_id/${productId}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("🚀 ~ fetchData ~ data:", data);
      setProduct(data);
      // console.log(allProducts);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h2>Product Detail</h2>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Carousel>
              {product?.image?.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Product image ${index + 1}`}
                  style={{ width: "450px", borderRadius: "8px" }}
                />
              ))}
            </Carousel>
          </Grid>
          <Grid item xs={12} md={6} mt={8}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: "left"}}>
              {product.item}
            </Typography>
            <Typography variant="body1" paragraph sx={{ textAlign: "left", maxWidth: "300px" }}>
              {product.description}
            </Typography>
            <Typography variant="h6" component="p" sx={{ textAlign: "left", mb: 2 }}>
              Rs. {product.price}
            </Typography>
            <Typography variant="h6" component="p" sx={{ textAlign: "left", mb: 2 }}>
              Quantity: {product.quantity}
            </Typography>
            {role !== "wholeseller" && (
              <Box sx={{width: "100%", display:"flex"}}>
                <Button
                  variant="outlined"
                  color="secondary"
                  sx={{ mt: 2, mx: 1 }}
                  onClick={() => {
                    let item = null;
                    item = { ...product, qty: 1 };
                    dispatch(addToCart(item));
                    SuccessToaster("Product Added");
                  }}
                >
                  Add to Cart
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2, mx: 1 }}
                  onClick={() => {
                    let item = null;
                    item = { ...product, qty: 1 };
                    dispatch(addToCart(item));
                    navigate("/checkout");
                  }}
                >
                  Buy Now
                </Button>
              </Box>
            )}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default ProductDetail;
