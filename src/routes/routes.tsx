import { createBrowserRouter } from "react-router-dom";
import Home from "@/pages/Home/Home";
import Products from "@/pages/Products/Products";
import MainLayout from "@/components/layout/MainLayout";
import ProductsDetail from "@/pages/ProductDetails/ProductsDetail";
import Cart from "@/pages/Cart/Cart";
import Checkout from "@/pages/Checkout/Checkout";
import SuccessPage from "@/components/SuccessPage";
import Payment from "@/pages/Payment/Payment";
import About from "@/pages/About/About";
import Register from "@/pages/Auth/Register";
import Login from "@/pages/Auth/Login"; // ← fixed folder & filename
import UserManagement from "@/pages/UserManagement/UserManagement";
import PrivateRoute from "@/components/layout/ProctectedRoute";
import ProductManagement from "@/pages/ProductManagement/ProductManagement";
import Wishlist from "@/pages/Wishlist/Wishlist";
import Contact from "@/pages/Contact/Contact";
import AddProduct from "@/pages/Admin/AddProduct";
import DashboardWapper from "@/utils/DashboardWapper";
import OrderHistory from "@/pages/OrderHistory/OrderHistory";



export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/",               element: <Home /> },
      { path: "/contact",        element: <Contact /> },
      { path: "/register",       element: <Register /> },
      { path: "/login",          element: <Login /> },
      { path: "/products",       element: <Products /> },
      { path: "/about",          element: <About /> },
      { path: "/success",        element: <SuccessPage /> },
      { path: "/checkout",       element: <Checkout /> },

      {
        path: "/product/:id",
        element: <PrivateRoute role={["USER", "admin"]}><ProductsDetail /></PrivateRoute>,
      },
      {
        path: "/cart",
        element: <PrivateRoute role={["USER", "admin"]}><Cart /></PrivateRoute>,
      },
      {
        path: "/wishlist",
        element: <PrivateRoute role={["USER", "admin"]}><Wishlist /></PrivateRoute>,
      },
      {
        path: "/payment",
        element: <PrivateRoute role="USER"><Payment /></PrivateRoute>,
      },
      {
        path: "/order-history",
        element: <PrivateRoute role="USER"><OrderHistory /></PrivateRoute>,
      },
      {
        path: "/dashboard",
        // ← role passed dynamically from auth state, not hardcoded "admin"
        element: <PrivateRoute role={["admin", "USER"]}><DashboardWapper /></PrivateRoute>,
      },
      {
        path: "/productManagement",
        element: <PrivateRoute role="admin"><ProductManagement /></PrivateRoute>,
      },
      {
        path: "/users-management",
        element: <PrivateRoute role="admin"><UserManagement /></PrivateRoute>,
      },
      {
        path: "/admin/add-product",
        element: <PrivateRoute role="admin"><AddProduct /></PrivateRoute>,
      },
    ],
  },
]);