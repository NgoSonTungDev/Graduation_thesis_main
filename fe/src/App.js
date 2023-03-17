import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ChatBox from "./components/chat_box";
import ChatBot from "./components/chat_gpt_fake";
import AdminHome from "./pages/admin/home";
import AdminMessage from "./pages/admin/message";
import Statistic from "./pages/admin/statistic";
import Register from "./pages/auth/register";
import Home from "./pages/home";
import NotFound from "./pages/not_found";
import Place from "./pages/place/index";
import Review from "./pages/review";
import HomeSaleAgent from "./pages/sale_agent/home";
import OrderSaleAgent from "./pages/sale_agent/order";
import { OpenChatBox } from "./redux/selectors";

const App = () => {
  const open = useSelector(OpenChatBox);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/place" element={<Place />} />
          <Route path="/review" element={<Review />} />

          {/* admin */}
          <Route path="/admin/home" element={<AdminHome />} />
          <Route path="/admin/message" element={<AdminMessage />} />
          <Route path="/admin/statistic" element={<Statistic />} />

          {/* saleAgent */}
          <Route path="/sale-agent/home" element={<HomeSaleAgent />} />
          <Route
            path="/sale-agent/order-management"
            element={<OrderSaleAgent />}
          />

          <Route path="*" element={<NotFound />} />
        </Routes>

        <ChatBot />
        <ChatBox openBox={open || false} />
        <ToastContainer
          autoClose={800}
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
