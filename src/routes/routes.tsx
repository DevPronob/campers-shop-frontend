import { createBrowserRouter } from "react-router-dom";
import Home from "../../src/pages/Home/Home";
import Products from "../../src/pages/Products/Products";
import MainLayout from "../../src/components/layout/MainLayout";
import ProductsDetail from "@/pages/ProductDetails/ProductsDetail";
import Cart from "@/pages/Cart/Cart";
import Checkout from "@/pages/Checkout/Checkout";
import SuccessPage from "@/components/SuccessPage";
import Payment from "@/pages/Payment/Payment";
import About from "@/pages/About/About";
import Register from "@/pages/Auth/Register";
import Login from "@/pages/Auth/Login";
import OrderHistory from "@/pages/OrderHistory.tsx/OrderHisory";
import UserManagement from "@/pages/UserManagement/UserManagement";
import PrivateRoute from "@/components/layout/ProctectedRoute";
import  ProductManagement  from '@/pages/ProductManagement/ProductManagement';
import Wishlist from "@/pages/Wishlist/Wishlist";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: "/products",
                element: <Products></Products>
            },
            {
                path: "/product/:id",
                element: <PrivateRoute role="USER"><ProductsDetail /></PrivateRoute>
            },
            {
                path: "/cart",
                element: <PrivateRoute role="USER"><Cart /></PrivateRoute>
            },
            {
                path: "/checkout",
                element: <Checkout />
            },
            {
                path: "/payment",
                element: <PrivateRoute role="USER"><Payment /></PrivateRoute>
            },
            {
                path: "/productManagement",
                element: <PrivateRoute role="admin"><ProductManagement /></PrivateRoute>
            },
            {
                path: "/success",
                element: <SuccessPage />
            },
            {
                path: "/order-history",
                element: <PrivateRoute role="USER"><OrderHistory /></PrivateRoute>
            },
            {
                path: "/about",
                element: <About />
            },
             {
                path: "/users-management",
                element: <PrivateRoute role="admin"><UserManagement /></PrivateRoute>
            },
            {
                path: "/wishlist",
                element: <PrivateRoute role="USER"><Wishlist/></PrivateRoute>
            },
        ]
    },
]);
