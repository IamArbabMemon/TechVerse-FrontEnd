import React, { Fragment, useState } from "react";
import {
    Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Rating,
  Tooltip,
  Typography,
} from "@mui/material";
import AddBoxIcon from '@mui/icons-material/AddBox';
import img7 from "../assets/airdot.webp";
import { useDispatch } from "react-redux";
import { AuthContext } from "../store/AuthContext";
import { useNavigate } from "react-router-dom";
import UpdateDialog from "./UpdateDialog";
import { ErrorToaster, SuccessToaster } from "../components/Toaster";
import DeleteDialog from "./DeleteDialog";

const WProducts = () => {
  const [allProducts, setAllProducts] = useState([]);
  const businessName = localStorage.getItem("businessName");

  const [value, setValue] = useState(2);
  const Navigate = useNavigate();
  const [displayedProducts, setDisplayedProducts] = useState(8); 
  const [updateDialog, setUpdateDialog] = useState(false);
  const [productId, setProductId] = useState('');
  const [orderId, setOrderId] = useState('');
  const [confirmDialog, setConfirmDialog] = useState(false);

  const fetchData = async () => {
    try {

      const response = await fetch(
        `http://localhost:3001/products/${businessName}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setAllProducts(data);
      // console.log(allProducts);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deleteProduct = async () => {
    try {
      const response = await fetch(`http://localhost:3001/products/deleteProduct/${orderId}`,{
        method: "DELETE",
      });
      console.log("🚀 ~ deleteProduct ~ response:", response)
      if (response.ok) {
        console.log("🚀 ~ deleteUser ~ response:", response)
        SuccessToaster("Product Deleted")
        fetchData();
      }
    } catch (error) {
      ErrorToaster(error)
    }
  }


  React.useEffect(() => {
    fetchData();
  }, []);

  const loadMoreProducts = () => {
    setDisplayedProducts(displayedProducts + 8); // Increase the number of displayed products by 8
  };

  const handleCardClick = (productId) => {
    
    Navigate(`/detail/${productId}`);
  };

  return (
    <Grid container>
      <UpdateDialog open={updateDialog} onClose={() => setUpdateDialog(false)} product={productId} fetchData={fetchData}/>
      <DeleteDialog open={confirmDialog} onClose={() => setConfirmDialog(false)} action={deleteProduct} />
        <Box sx={{ width:"100%", display:"flex", justifyContent:"space-between", pb:5}}>
          <Box></Box>
          <Box sx={{pl:10}}><Typography variant="h4">My Products</Typography></Box>
          <Box>
            <Button onClick={()=>Navigate('/create')} variant="outlined" startIcon={<AddBoxIcon />}>Create Product</Button>
          </Box>
        </Box>
        {allProducts.length?(
            <Fragment>
            {allProducts.slice(0, displayedProducts).map((product) => (
                <Grid key={product.id} item xs={12} md={4} lg={4}>
                  <Card style={{ marginTop: "1rem" }} sx={{ maxWidth: 400 }}>
                  <Box onClick={()=>{handleCardClick(product._id)}} sx={{cursor:"pointer"}}>
                    <CardMedia
                      component="img"
                      alt={product.item}
                      height="300"
                      image={product.image[0]} // Assuming the image path is a string
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {product.item}
                      </Typography>
                      <Typography
                        color="text.secondary"
                        gutterBottom
                        variant="h5"
                        component="div"
                      >
                        {product.price}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {product.description}
                      </Typography>
                      {/* <Rating
                        name="simple-controlled"
                        value={value}
                        onChange={(event, newValue) => {
                          setValue(newValue);
                        }}
                      /> */}
                    </CardContent>
                    </Box>
                    <CardActions>
                      <div style={{ display: "flex", gap: "7rem" }}>
                        <div>
                          <Button
                            variant="contained"
                            size="small"
                            onClick={() => { setProductId(product); setUpdateDialog(true) }}
                          >
                            Update Product
                          </Button>
                        </div>
                        <div>
                          <Button
                          color="error"
                            variant="contained"
                            size="small"
                            onClick={() => { setOrderId(product._id); setConfirmDialog(true) }}
                          >
                            Delete Product
                          </Button>
                        </div>
                      </div>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
              {displayedProducts < allProducts.length && (
                <Button onClick={loadMoreProducts}>Load More</Button>
              )}
              </Fragment>
        ):(
            <Grid item xs={12}> No Product Found</Grid>
        )}
        
    </Grid>
  );
};

export default WProducts;
