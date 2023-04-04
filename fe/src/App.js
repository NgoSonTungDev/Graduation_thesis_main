import React, { useEffect } from "react";
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
import Login from "./pages/auth/login";
import NotFound from "./pages/not_found";
import Place from "./pages/place/index";
import Profile from "./pages/profile";
import Review from "./pages/review";
import Explore from "./components/explore";
import { OpenChatBox } from "./redux/selectors";
import HomeSaleAgent from "./pages/sale_agent/home";
import OrderSaleAgent from "./pages/sale_agent/order";
import Voucher from "./pages/voucher";
import Order from "./pages/order";
import ThankCustomer from "./pages/thank_customer";
import OrderManagement from "./pages/admin/order";
import PaymentDetail from "./pages/payment/payment_detail";
import VoucherManagement from "./pages/admin/voucher";
import TicketSaleAgent from "./pages/sale_agent/ticket";
import ws from "./socket";
import PlaceDetail from "./pages/place_detail";
import RegisterAgency from "./pages/auth/register_agency";
import ForgotPassword from "./pages/auth/forgot_password";
import ChangePassword from "./components/change_password";
import TicketManagement from "./pages/admin/ticket";
import SaleAgentStatistic from "./pages/sale_agent/statistic";
import { getUserDataLocalStorage } from "./utils/localstorage";

const App = () => {
  const open = useSelector(OpenChatBox);
  const userIdStorage = getUserDataLocalStorage();

  useEffect(() => {
    ws.initialize();
    if (userIdStorage && userIdStorage.isAdmin === 1) {
      ws.joinRoom(userIdStorage?.roomId);
      ws.joinRoomNotify(userIdStorage?._id);
    } else if (userIdStorage && userIdStorage.isAdmin === 2) {
      ws.joinRoom(userIdStorage?.roomId);
    }
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register-agency" element={<RegisterAgency />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/place" element={<Place />} />
          <Route path="/review" element={<Review />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/voucher" element={<Voucher />} />
          <Route path="/order/:id" element={<Order />} />
          <Route path="/place/:id" element={<PlaceDetail />} />
          <Route path="/page/thank-customer" element={<ThankCustomer />} />
          <Route path="/payment/:ticketId" element={<PaymentDetail />} />

          {/* admin */}
          <Route path="/admin/home" element={<AdminHome />} />
          <Route path="/admin/message" element={<AdminMessage />} />
          <Route path="/admin/statistic" element={<Statistic />} />
          <Route path="/admin/order" element={<OrderManagement />} />
          <Route path="/admin/voucher" element={<VoucherManagement />} />
          <Route path="/admin/ticket" element={<TicketManagement />} />

          {/* saleAgent */}
          <Route path="/sale-agent/home" element={<HomeSaleAgent />} />
          <Route
            path="/sale-agent/order-management"
            element={<OrderSaleAgent />}
          />
          <Route
            path="/sale-agent/ticket-management"
            element={<TicketSaleAgent />}
          />
          <Route
            path="/sales-agent/statistic"
            element={<SaleAgentStatistic />}
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
