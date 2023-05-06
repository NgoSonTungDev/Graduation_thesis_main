import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ChangePassword from "./components/change_password";
import ChatBox from "./components/chat_box";
import ChatBot from "./components/chat_gpt_fake";
import Explore from "./components/explore";
import AdminHome from "./pages/admin/home";
import AdminMessage from "./pages/admin/message";
import OrderManagement from "./pages/admin/order";
import PlaceMangement from "./pages/admin/place";
import Statistic from "./pages/admin/statistic";
import TicketManagement from "./pages/admin/ticket";
import VoucherManagement from "./pages/admin/voucher";
import AccountManagement from "./pages/admin/account";
import PostManagement from "./pages/admin/posts";
import ForgotPassword from "./pages/auth/forgot_password";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import RegisterAgency from "./pages/auth/register_agency";
import Forbidden from "./pages/forbidden";
import Home from "./pages/home";
import NotFound from "./pages/not_found";
import Order from "./pages/order";
import PaymentDetail from "./pages/payment/payment_detail";
import Place from "./pages/place/index";
import PlaceDetail from "./pages/place_detail";
import Profile from "./pages/profile";
import Review from "./pages/review";
import HomeSaleAgent from "./pages/sale_agent/home";
import OrderSaleAgent from "./pages/sale_agent/order";
import SaleAgentStatistic from "./pages/sale_agent/statistic";
import TicketSaleAgent from "./pages/sale_agent/ticket";
import ThankCustomer from "./pages/thank_customer";
import Voucher from "./pages/voucher";
import { OpenChatBox } from "./redux/selectors";
import { setUser } from "./redux/user/userSlice";
import ws from "./socket";
import { getUserDataLocalStorage } from "./utils/localstorage";
import InformationAgent from "./components/information_agent";
import Favourite from "./pages/favourite";

const AdminLayout = ({ children }) => {
  const { user } = useSelector((state) => state.User);

  if (!user) {
    return <Navigate to="/login" replace />;
  } else if (user.isAdmin === 3) {
    return <div>{children}</div>;
  } else {
    return <Navigate to="/forbidden" replace />;
  }
};

const SaleAgentLayout = ({ children }) => {
  const { user } = useSelector((state) => state.User);

  if (!user) {
    return <Navigate to="/login" replace />;
  } else if (user.isAdmin === 2) {
    return <div>{children}</div>;
  } else {
    return <Navigate to="/forbidden" replace />;
  }
};

const UserLayout = ({ children }) => {
  const { user } = useSelector((state) => state.User);

  if (!user) {
    return <Navigate to="/login" replace />;
  } else if (user.isAdmin === 1) {
    return <div>{children}</div>;
  } else {
    return <Navigate to="/forbidden" replace />;
  }
};

const MainLayout = ({ children }) => {
  const { user } = useSelector((state) => state.User);
  if (user && user.isAdmin === 3) {
    return <Navigate to="/admin/home" replace />;
  }

  if (user && user.isAdmin === 2) {
    return <Navigate to="/sale-agent/home" replace />;
  }

  return children;
};

const App = () => {
  const open = useSelector(OpenChatBox);

  useEffect(() => {
    const userIdStorage = getUserDataLocalStorage();

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
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />
        <Route
          path="/home"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />
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
        <Route
          path="/order/:id"
          element={
            <UserLayout>
              <Order />
            </UserLayout>
          }
        />
        <Route
          path="/favourite/:id"
          element={
            <UserLayout>
              <Favourite />
            </UserLayout>
          }
        />
        <Route path="/place/:id" element={<PlaceDetail />} />
        <Route
          path="/page/thank-customer"
          element={
            <UserLayout>
              <ThankCustomer />
            </UserLayout>
          }
        />
        <Route
          path="/payment/:ticketId"
          element={
            <UserLayout>
              <PaymentDetail />
            </UserLayout>
          }
        />

        {/* admin */}
        <Route
          path="/admin/home"
          element={
            <AdminLayout>
              <AdminHome />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/message"
          element={
            <AdminLayout>
              <AdminMessage />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/statistic"
          element={
            <AdminLayout>
              <Statistic />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/order"
          element={
            <AdminLayout>
              <OrderManagement />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/voucher"
          element={
            <AdminLayout>
              <VoucherManagement />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/ticket"
          element={
            <AdminLayout>
              <TicketManagement />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/place"
          element={
            <AdminLayout>
              <PlaceMangement />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/account"
          element={
            <AdminLayout>
              <AccountManagement />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/post"
          element={
            <AdminLayout>
              <PostManagement />
            </AdminLayout>
          }
        />
        {/* saleAgent */}
        <Route
          path="/sale-agent/home"
          element={
            <SaleAgentLayout>
              <HomeSaleAgent />
            </SaleAgentLayout>
          }
        />
        <Route
          path="/sale-agent/order-management"
          element={
            <SaleAgentLayout>
              <OrderSaleAgent />
            </SaleAgentLayout>
          }
        />
        <Route
          path="/sale-agent/ticket-management"
          element={
            <SaleAgentLayout>
              <TicketSaleAgent />
            </SaleAgentLayout>
          }
        />
        <Route
          path="/sales-agent/statistic"
          element={
            <SaleAgentLayout>
              <SaleAgentStatistic />
            </SaleAgentLayout>
          }
        />

        <Route path="/forbidden" element={<Forbidden />} />
        <Route path="/information-agent" element={<InformationAgent />} />
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
    </div>
  );
};

export default App;
