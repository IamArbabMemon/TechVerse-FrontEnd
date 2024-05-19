import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
// import Link from '@mui/material/Link';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  List,
  Rating,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Link } from "react-router-dom"; // Import BrowserRouter
import img1 from "../assets/Hero_Homepage_Accessories_Family_Q4FY22_VP2-859x540.avif";
import img2 from "../assets/microsoft-surface-500x500.webp";
import img3 from "../assets/c43c33fbadc434d69e14ce0ea87066dd.jpg";
import img4 from "../assets/four.jpg";
import img5 from "../assets/five.webp";
import img6 from "../assets/download_4__1_3.jpg.jpeg";
import img7 from "../assets/airdot.webp";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Keyboard,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Image } from "react-bootstrap";

import { useProductContext } from "../ProductContext";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decreaseCartQuantity,
  increaseCartQuantity,
} from "../store/productsSlice";
import { AuthContext } from "../store/AuthContext";
import { SuccessToaster } from "./Toaster";

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

export default function Dashboard() {
  const [allProducts, setAllProducts] = React.useState([]);
  const [myProducts, setMyProducts] = React.useState([
    {id:1,item:"The product Item",price:123, description:"beautiful beautiful product"}
  ])
  const navigate = useNavigate()

  const handleCardClick = (productId) => {
    console.log("id => productId", )
    navigate(`/detail/${productId}`);
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/products/allProducts");
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

    fetchData();
  }, []); 

  const isSmallerScreen = useMediaQuery("(max-width:500px)");

  //* logic for apply redux
  const { cartItems } = useSelector((state) => state.productCount);
  const dispatch = useDispatch();
  const { role } = React.useContext(AuthContext);

  const [value, setValue] = React.useState(2);
  const Navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const { setSelectedProduct } = useProductContext();

  const downloadImage = (imageSrc, imageName) => {
    const link = document.createElement("a");
    link.href = imageSrc;
    link.download = imageName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };



  return (
    <Box>
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={isSmallerScreen ? 50 : 100}
        slidesPerView={isSmallerScreen ? 1 : 3}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
      >
        <SwiperSlide>
          <Image src={img1} width={isSmallerScreen ? 300 : 500}></Image>
        </SwiperSlide>
        <SwiperSlide>
          <Image src={img2} width={isSmallerScreen ? 300 : 500}></Image>
        </SwiperSlide>
        <SwiperSlide>
          <Image src={img3} width={isSmallerScreen ? 300 : 500}></Image>
        </SwiperSlide>
        <SwiperSlide>
          <Image src={img4} width={isSmallerScreen ? 300 : 500}></Image>
        </SwiperSlide>
        <SwiperSlide>
          <Image src={img5} width={isSmallerScreen ? 300 : 500}></Image>
        </SwiperSlide>
        ...
      </Swiper>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8} lg={9}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 270,
              }}
            >
              <Image style={{ overflow: "hidden" }} src={img6}></Image>
            </Paper>
          </Grid>
          {/* Recent Deposits */}
          <Grid item xs={12} md={4} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 270,
              }}
            >
              <Image src={img7}></Image>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <h1>Hot Products</h1>
            </Paper>
          </Grid>

          <Grid container spacing={3}>
            {allProducts.length > 0 ? (
              <>
                {allProducts.slice(0, 8).map((product) => (
                  <Grid key={product._id} item xs={12} md={4} lg={4}>
                    <Card style={{ marginTop: "1rem" }} sx={{ maxWidth: 445  }}>
                      <Box onClick={()=>{handleCardClick(product._id)}} sx={{cursor:"pointer"}}>
                      <CardMedia
                        component="img"
                        alt={product.item}
                        height="250"
                        image={product.image[0]} // Assuming the image path is a string
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h6" component="div" sx={{display: "inline-block", width: 350, }}>
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
                        <Typography variant="body2" color="text.secondary"
                        >
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
                        <div style={{ display: "flex", justifyContent:"space-evenly", alignItems:"center", width:"100%" }}>
                          {role !== "wholeseller" && 
                          <>
                          <Button
                          variant="outlined" color="secondary"
                            size="small"
                            onClick={() => {
                              let item = null;
                              item = { ...product, qty: 1 };
                              dispatch(addToCart(item));
                              SuccessToaster("Product Added")
                            }}
                          >
                            Add Product
                          </Button>
                          <Button variant="contained" color="primary"
                            size="small"
                            onClick={() => {
                              let item = null;
                              item = { ...product, qty: 1 };
                              dispatch(addToCart(item));
                              navigate("/checkout")
                            }}
                          >
                            Buy Now
                          </Button>
                          </>
                           }
                          {/* onClick={() => HandlePlaceOrder(product)} */}
                          <Tooltip title="Download Product">
                            <ArrowDownwardIcon
                              onClick={() =>
                                downloadImage(product.image[0], product.item)
                              }
                            />
                          </Tooltip>
                        </div>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </>
            ) : (
              <Typography>...Loading</Typography>
            )}
          </Grid>
        </Grid>

        <Divider />
        <div style={{ marginTop: "5rem" }}>
          <Link to="/products">See All</Link>
        </div>

        <Copyright sx={{ pt: 4 }} />
      </Container>
    </Box>
  );
}
