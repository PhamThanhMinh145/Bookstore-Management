import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./Customer/context/AuthContext";
import BookDetail from "./Customer/pages/BookDetailPage/BookDetails";
import Cart from "./Customer/pages/CartPage/Cart";
import FieldDetail from "./Customer/pages/FieldPage/FieldDetail";
import Home from "./Customer/pages/HomePage/Home";
import OrderDetail from "./Customer/pages/OrderDetailPage/OrderDetail";
import Profile from "./Customer/pages/ProfilePage/Profile";
import SignIn from "./Customer/pages/SignInPage/SignIn";

//For cart
import Cancel from "./Customer/pages/CancelPage/Cancel";
import Success from "./Customer/pages/SuccessPage/Success";

export default function App() {
    useEffect(() => {
        // 👇️ scroll to top on page load
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }, []);

    return (
        <AuthContextProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signIn" element={<SignIn />} />
                    <Route path="/field/:fieldId" element={<FieldDetail />} />
                    <Route path="/bookDetail/:bookId" element={<BookDetail />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/orderDetail/:orderId" element={<OrderDetail />} />

                    {/* For cart payment */}
                    <Route path="success" element={<Success />} />
                    <Route path="cancel" element={<Cancel />} />
                </Routes>
            </BrowserRouter>
        </AuthContextProvider>
    );
}
