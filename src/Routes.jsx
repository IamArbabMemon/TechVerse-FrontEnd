// Routes.jsx
import React, { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/Home";
// import Login from './components/Login-page';
import SignUp from "./components/register";
// import Private_route from './private_routes/Private_route';
import Checkout from "./components/Checkout";
import PaymentForm from "./components/paymentForm";
import SignIn from "./components/login";
import Products from "./components/Products";
import Layout from "./layout/Layout";
import { Body } from "./layout/Body";
import Orders from "./components/Orders";
import WProducts from "./pages/WProducts";
import CreateProduct from "./pages/CreateProduct";
import ProductDetail from "./components/ProductDetail";

const AppRoutes = [
  {
    path: "/",
    component: <Dashboard />,
  },
  {
    path:"/detail/:productId",
    component: <ProductDetail />,
  },
  {
    path: "/wproducts",
    component: <WProducts />,
  },
  {
    path: "/orders",
    component: <Orders />,
  },
  {
    path: "/products",
    component: <Products />,
  },
  {
    path: "/checkout/payment",
    component: <PaymentForm />,
  },
  {
    path: "/checkout",
    component: <Checkout />,
  },
  {
    path: "/create",
    component: <CreateProduct />,
  }
]

export default AppRoutes;
