import axios from "axios";
import React, { useEffect, useState } from "react";
import RingLoader from "react-spinners/RingLoader";
import Navbar from "../../components/navbar";
import "./style.scss";

const ThankCustomer = () => {
  const [loading, setLoading] = useState(false);

  const checkPayment = window.location.href.split("&")[1];

  return (
    <div>
      <div className="container_thankyou">
        <Navbar loading={false} />
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
            <button>về lại trang chủ</button>
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
            <button>về lại trang chủ</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ThankCustomer;
