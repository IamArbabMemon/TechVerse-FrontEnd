import AppRoutes from "./Routes";
import "./App.css";
import { ProductProvider } from "./ProductContext";
import SignUp from "./components/register";
import SignIn from "./components/login";
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import { AuthContext } from "./store/AuthContext";
import { useContext } from "react";
import { ToasterContainer } from "../src/components/Toaster";
import Layout from "./layout/Layout";
import ForgotPassword from "./components/ForgotPassword";
function App() {
  // const token = false;
  const token = localStorage.getItem("token");
  const{accessToken} = useContext(AuthContext)

  return (
    <div className="App">
      <ProductProvider>
      <ToasterContainer />
        <BrowserRouter>
          <Routes>
            <Route element={<Layout /> }>
              {AppRoutes.map((route, index) => (
              <Route key={index} path={route.path} element={route.component} />
            ))}
            </Route>
            <Route >
              <Route path="/register" element={<SignUp />} />
              <Route path="/signIn" element={<SignIn />} />
              <Route path="/forgot" element={<ForgotPassword />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ProductProvider>
    </div>
  );
}

export default App;
