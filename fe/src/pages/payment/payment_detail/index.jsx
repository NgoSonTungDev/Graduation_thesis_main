import PaymentIcon from "@mui/icons-material/Payment";
import Box from "@mui/material/Box";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../../../api/axiosClient";
import Navbar from "../../../components/navbar";
import { toastify } from "../../../utils/common";
import "./style.scss";

export default function PaymentDetail() {
  const [dataUser, setDataUser] = useState({});
  const [loading, setLoading] = useState(false);
  const { ticketId, userId } = useParams();
  console.log("m", ticketId);
  console.log("fff", userId);

  return (
    <div>
      <Navbar loading={loading} />
      <div
        className="container_payment"
        style={{
          width: "90%",
          marginLeft: "5%",
          overflow: "hidden",
        }}
      >
        <div>
          <div
            className="image"
            style={{
              width: "100%",
              padding: "30px 0px 10px 0px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <PaymentIcon
              sx={{
                alignContent: "center",
                fontSize: "50px",
              }}
            />
          </div>
          <div style={{ textAlign: "center" }}>
            <b style={{ fontSize: "20px" }}>Thanh toán</b>
          </div>
          <div style={{ textAlign: "center" }}>
            <span>
              Vui lòng kiểm tra thông tin khách hàng và thông tin đơn hàng trước
              khi Đặt hàng.
            </span>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            overflow: "hidden",
            paddingTop: "10px",
          }}
        >
          <div style={{ width: "25%" }}>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <div style={{ margin: "10px 0px 8px 20px" }}>
                <b>Loại vé</b>
              </div>
              <div>
                <Box></Box>
              </div>
            </Box>
          </div>
          <div style={{ width: "70%" }}>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <div style={{ margin: "10px 0px 8px 20px" }}>
                <b>Thông tin đơn hàng</b>
              </div>
              <div>
                <div className="container_payment_body_input">
                  <div className="container_payment_body_input_information">
                    <form id="form" className="form">
                      <div className="form-control">
                        <label>Tên Khách Hàng</label>
                        <p>{dataUser?.userName}</p>
                      </div>
                      <div className="form-control">
                        <label>Email</label>
                        {/* <p>{da?.email}</p> */}
                      </div>
                      <div className="form-control">
                        <label>Giới tính</label>
                        {/* <p>{dataUser?.gender}</p> */}
                      </div>
                      <div className="form-control">
                        <label>Địa Chỉ</label>
                        <input
                          type="address"
                          placeholder="221 Hà Huy Tưởng"
                          id="address"
                          // value={Address}
                          // onChange={(e) => setAddress(e.target.value)}
                        />
                        <i className="fas fa-check-circle"></i>
                        <i className="fas fa-exclamation-circle"></i>
                        {/* <small>Error message</small> */}
                      </div>
                      <div className="form-control">
                        <label>Số Điện Thoại</label>
                        <input
                          type="tel"
                          placeholder="0510123456"
                          id="numberPhone"
                          // value={NumberPhone}
                          // onChange={(e) => setNumberPhone(e.target.value)}
                        />
                        <i className="fas fa-check-circle"></i>
                        <i className="fas fa-exclamation-circle"></i>
                        {/* <small>Error message</small> */}
                      </div>
                    </form>
                    {/* <LoadingButton
                      className="buttonCheck"
                      onClick={handleOnClickButtonGetInformation}
                      loading={Check}
                      variant="outlined"
                    >
                      Submit
                    </LoadingButton> */}
                  </div>
                </div>
              </div>
            </Box>
          </div>
        </div>
      </div>
      //{" "}
    </div>
  );
}
