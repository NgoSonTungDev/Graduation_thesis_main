import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../api/axiosClient";
import Navbar from "../../components/navbar";
import { addNotify } from "../../redux/notify/notifySlice";
import ws from "../../socket";
import { toastify } from "../../utils/common";
import {
  getUserDataLocalStorage,
  removeOrderLocalStorage,
} from "../../utils/localstorage";
import "./style.scss";

const ThankCustomer = () => {
  const [loading, setLoading] = useState(false);
  const orderId = localStorage.getItem("order");
  const checkPayment = window.location.href.split("&")[1];
  const userIdStorage = getUserDataLocalStorage();
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const movePageHome = () => {
    navigation("/");
    removeOrderLocalStorage();
  };

  const sendNotify = async () => {
    const NotifyData = {
      room: userIdStorage?._id,
      content: "Đơn hàng của bạn đã được thanh toán thành công",
      status: true,
      dateTime: Number(new Date()),
    };

    ws.sendNotify(NotifyData);
    dispatch(addNotify(NotifyData));
  };

  const handleSendEmail = () => {
    axiosClient
      .post(`/email/send-payment`, {
        email: userIdStorage?.email,
      })
      .then((res) => {
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        toastify("error", err.response.data.message || "Lỗi hệ thông !");
      });
  };

  const handleChangeDataPayment = () => {
    axiosClient
      .put(`/order/update-story-success/${orderId}`)
      .then((res) => {
        handleSendEmail();
        sendNotify();
      })
      .catch((err) => {
        setLoading(false);
        toastify("error", err.response.data.message || "Lỗi hệ thông !");
      });
  };

  const handleData = () => {
    if (checkPayment === "vnp_BankCode=NCB") {
      handleChangeDataPayment();
    } else {
      setLoading(false);
      toastify("error", "Đặt hàng thất bại !");
    }
  };

  useEffect(() => {
    setLoading(true);
    handleData();
  }, []);

  return (
    <div>
      <div className="container_thankyou">
        <Navbar loading={loading} />
        {checkPayment === "vnp_BankCode=NCB" ? (
          <div className="container_thankyou_box_successfully">
            <div className="container_thankyou_box_successfully_icon">
              <i className="fa-sharp fa-solid fa-circle-check"></i>
              <p>Thanh toán thành công! </p>
            </div>
            <div className="container_thankyou_box_successfully_text">
              <span>
                Đơn hàng của bạn đã được thanh toán thành công! Đơn hàng sẻ được
                giao tới bạn trong 3 - 5 ngày từ lúc đặt hàng ! <b>MAFLINE</b>{" "}
                cảm ơn bạn đã sử dụng dịch vụ của chung tôi 😉
              </span>
            </div>
            <button onClick={movePageHome}>về lại trang chủ</button>
          </div>
        ) : (
          <div className="container_thankyou_box_failure">
            <div className="container_thankyou_box_failure_icon">
              <i className="fa-solid fa-circle-xmark"></i>
              <p>Thanh toán không thành công! </p>
            </div>
            <div className="container_thankyou_box_failure_text">
              <span>
                Đơn hàng của bạn thanh toán không thành công vì một lý do nào đó
                ! Bạn vui lòng đặt lại hoặc liên hệ với chúng tôi để được trợ
                giúp. <b>MAFLINE</b> cảm ơn bạn đã sử dụng dịch vụ của chung tôi
                😉
              </span>
            </div>
            <button disabled={loading} onClick={movePageHome}>
              về lại trang chủ
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ThankCustomer;
