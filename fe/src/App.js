import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./pages/home";
import Register from "./pages/auth/register";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/navbar";

import Review from "./pages/review";
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/review" element={<Review />} />

          {/* <Route path="*" element={<PageNotFound />} /> */}
        </Routes>
        <ToastContainer
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <ToastContainer />
      </BrowserRouter>
    </div>
  );
};

export default App;
