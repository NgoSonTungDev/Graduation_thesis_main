import PaymentIcon from "@mui/icons-material/Payment";
import { Button, TextField } from "@mui/material";
import moment from "moment";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../../../api/axiosClient";
import Navbar from "../../../components/navbar";
import { toastify } from "../../../utils/common";
import "./style.scss";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

const validationInput = yup.object().shape({
  numberAdultTicket: yup.number().min(0, "Số lượng vé phải lớn hơn 0"),
  numberChildTicket: yup.string().min(0, "Số lượng vé phải lớn hơn 0"),
  addres: yup.string().required("Địa chỉ không được bỏ trống !!!"),
  numberPhone: yup.number().required("Số điện thoại không được bỏ trống !!!"),
});

export default function PaymentDetail() {
  const [dataUser, setDataUser] = useState({});
  const [dataTicket, setDataaTicket] = useState({});
  const [loading, setLoading] = useState(false);
  const { ticketId, userId } = useParams();
  const [numberPhone, setNumberPhone] = useState([]);
  const [address, setAddress] = useState([]);
  const [numberAdultTicket, setNumberAdultTicket] = useState([]);
  const [numberChildTicket, setNumberChildTicket] = useState([]);
  const [dateTime, setDateTime] = useState([]);
  const [sale, setSale] = useState([]);
  const [totalPrice, setTotalPrice] = useState([]);
  const totalPriceChildTicket = numberChildTicket * dataTicket?.childTicket;
  const totalPriceAdultTicket = numberAdultTicket * dataTicket?.adultTicket;
  const sumtotalPrice = totalPriceChildTicket + totalPriceAdultTicket;

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm({
    defaultValues: {
      numberAdultTicket: "",
      numberChildTicket: "",
      numberPhone: "",
      address: "",
    },
    mode: "all",
    resolver: yupResolver(validationInput),
  });

  const getApiUserID = () => {
    axiosClient
      .get(`/user/get-an/${userId}`)
      .then((res) => {
        setLoading(false);
        setDataUser(res.data.data);
      })
      .catch((err) => {
        setLoading(false);
        toastify("error", err.response.data.message || "Lỗi hệ thông !");
      });
  };

  const getApiTickID = () => {
    axiosClient
      .get(`/ticket/get-by-id/${ticketId}`)
      .then((res) => {
        setLoading(false);
        setDataaTicket(res.data.data);
      })
      .catch((err) => {
        setLoading(false);
        toastify("error", err.response.data.message || "Lỗi hệ thông !");
      });
  };

  const handleSubmitForm = (e) => {
    // if (numberAdultTicket === 0 && numberChildTicket === 0) {
    //   // toastify("error","nhập nít nhất 1 vé");
      alert("lỗi");
    // } else {
    // }
  };

  React.useEffect(() => {
    getApiUserID();
    getApiTickID();
  }, []);

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
          <div style={{ textAlign: "center", paddingBottom: "10px" }}>
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
            paddingTop: "20px",
          }}
        >
          <div style={{ width: "30%" }}>
            <div
              style={{
                width: "100%",
              }}
            >
              <div
                style={{
                  width: "100%",
                  border: "1px solid #dcdddd",
                }}
              >
                <div
                  style={{ textAlign: "center", margin: "10px 0px 10px 0px" }}
                >
                  <b>Thông tin đơn hàng</b>
                </div>
                <div
                  style={{ width: "100%", display: "flex", padding: "10px" }}
                >
                  <div style={{ width: "40%" }}>
                    <span>Tên địa điểm</span>
                  </div>
                  <div style={{ width: "45%" }}>
                    <TextField
                      disabled
                      sx={{ border: "none", outline: "none" }}
                      size="small"
                      label={dataTicket?.placeId?.name}
                    />
                  </div>
                </div>
                <div
                  style={{ width: "100%", display: "flex", padding: "10px" }}
                >
                  <div style={{ width: "40%" }}>
                    <span>Địa điểm</span>
                  </div>
                  <div style={{ width: "45%" }}>
                    <TextField
                      disabled
                      size="small"
                      label={dataTicket?.placeId?.location}
                    />
                  </div>
                </div>
                <div
                  style={{ width: "100%", display: "flex", padding: "10px" }}
                >
                  <div style={{ width: "40%" }}>
                    <span>Vé người lớn</span>
                  </div>
                  <div style={{ width: "45%" }}>
                    <TextField
                      // error={!!errors?.numberAdultTicket}
                      // {...register("numberAdultTicket")}
                      type="number"
                      sx={{
                        border: "none",
                        outline: "none",
                        borderColor: "#777",
                      }}
                      // helperText={errors.numberAdultTicket?.message}
                      size="small"
                      placeholder="0"
                      value={numberAdultTicket}
                      onChange={(e) => setNumberAdultTicket(e.target.value)}
                    />
                    <label htmlFor="">
                      Giá vé:{" "}
                      {totalPriceAdultTicket.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </label>
                  </div>
                </div>
                <div
                  style={{ width: "100%", display: "flex", padding: "10px" }}
                >
                  <div style={{ width: "40%" }}>
                    <span>Vé trẻ em</span>
                  </div>
                  <div style={{ width: "45%" }}>
                    <TextField
                      // error={!!errors?.numberChildTicket}
                      // {...register("numberChildTicket")}
                      type="number"
                      sx={{ border: "none", outline: "none" }}
                      // helperText={errors.numberChildTicket?.message}
                      size="small"
                      value={numberChildTicket}
                      onChange={(e) => setNumberChildTicket(e.target.value)}
                      placeholder="0"
                    />
                    <label htmlFor="">
                      Giá vé:{" "}
                      {totalPriceChildTicket.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </label>
                  </div>
                </div>

                <div
                  style={{ width: "100%", display: "flex", padding: "10px" }}
                >
                  <div style={{ width: "40%" }}>
                    <span>Ngày đặt vé</span>
                  </div>
                  <div style={{ width: "60%" }}>
                    <TextField
                      type="date"
                      sx={{ border: "none", outline: "none" }}
                      size="small"
                      value={dateTime}
                      onChange={(e) => setDateTime(e.target.value)}
                      placeholder="0"
                    />
                  </div>
                </div>
                <div
                  style={{ width: "100%", display: "flex", padding: "10px" }}
                >
                  <div style={{ width: "40%" }}>
                    <span>Mã khuyến mãi</span>
                  </div>
                  <div style={{ width: "45%" }}>
                    <TextField
                      sx={{ border: "none", outline: "none" }}
                      size="small"
                      value={sale}
                      onChange={(e) => setSale(e.target.value)}
                    />
                  </div>
                </div>
                <div
                  style={{ width: "100%", display: "flex", padding: "10px" }}
                >
                  <div style={{ width: "40%" }}>
                    <span>Tổng thành tiền</span>
                  </div>
                  <div style={{ width: "45%" }}>
                    <TextField
                      disabled
                      type="number"
                      sx={{ border: "none", outline: "none" }}
                      size="small"
                      label={sumtotalPrice.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    />
                  </div>
                </div>

                <div
                  style={{ textAlign: "center", padding: "10px 0px 10px 0px" }}
                >
                  <Button
                    sx={{ width: "90%" }}
                    variant="outlined"
                    // label={!isDirty && !isValid}
                    // onClick={handleSubmit(handleSubmitForm)}
                  >
                    Xác nhận
                  </Button>
                </div>
              </div>
            </div>

            <div
              style={{
                width: "100%",
                paddingTop: "30px",
              }}
            >
              <div
                style={{
                  width: "100%",
                  border: "1px solid #dcdddd",
                }}
              >
                <div
                  style={{ textAlign: "center", margin: "10px 0px 10px 0px" }}
                >
                  <b>Thông tin vé</b>
                </div>
                {/* <div
                  style={{ width: "100%", display: "flex", padding: "10px" }}
                >
                  <div style={{ width: "40%" }}>
                    <span>Tên địa điểm</span>
                  </div>
                  <div style={{ width: "45%" }}>
                    <TextField
                      disabled
                      sx={{ border: "none", outline: "none" }}
                      size="small"
                      label={dataTicket?.placeId?.name}
                    />
                  </div>
                </div>
                <div
                  style={{ width: "100%", display: "flex", padding: "10px" }}
                >
                  <div style={{ width: "40%" }}>
                    <span>Địa điểm</span>
                  </div>
                  <div style={{ width: "45%" }}>
                    <TextField
                      disabled
                      size="small"
                      label={dataTicket?.placeId?.location}
                    />
                  </div>
                </div> */}
                <div
                  style={{ width: "100%", display: "flex", padding: "10px" }}
                >
                  <div style={{ width: "40%" }}>
                    <span>Giá vé người lớn</span>
                  </div>
                  <div style={{ width: "45%" }}>
                    <TextField
                      sx={{
                        border: "none",
                        outline: "none",
                        borderColor: "#777",
                      }}
                      disabled
                      size="small"
                      // label={dataTicket?.adultTicket.toLocaleString("vi-VN", {
                      //   style: "currency",
                      //   currency: "VND",
                      // })}
                    />
                  </div>
                </div>
                <div
                  style={{ width: "100%", display: "flex", padding: "10px" }}
                >
                  <div style={{ width: "40%" }}>
                    <span>Giá vé trẻ em</span>
                  </div>
                  <div style={{ width: "45%" }}>
                    <TextField
                      sx={{ border: "none", outline: "none" }}
                      disabled
                      size="small"
                      // label={dataTicket?.childTicket.toLocaleString("vi-VN", {
                      //   style: "currency",
                      //   currency: "VND",
                      // })}
                    />
                  </div>
                </div>

                <div
                  style={{ width: "100%", display: "flex", padding: "10px" }}
                >
                  <div style={{ width: "40%" }}>
                    <span>Số lượng vé còn</span>
                  </div>
                  <div style={{ width: "45%" }}>
                    <TextField
                      sx={{ border: "none", outline: "none" }}
                      disabled
                      size="small"
                      label={dataTicket?.numberTickets}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ width: "67%", marginLeft: "2%" }}>
            <div>
              <div className="container_payment_body_input">
                <div className="container_payment_body_input_information">
                  <form id="form" className="form">
                    <div style={{ textAlign: "center" }}>
                      <b>Thông tin khách hàng</b>
                    </div>
                    <div className="form-control">
                      <label>Tên Khách Hàng</label>
                      <p>{dataUser?.userName}</p>
                    </div>
                    <div className="form-control">
                      <label>Email</label>
                      <p>{dataUser?.email}</p>
                    </div>
                    <div className="form-control">
                      <label>Giới tính</label>
                      <p>{dataUser?.gender}</p>
                    </div>
                    <div className="form-control">
                      <label>Địa Chỉ</label>
                      <input
                        error={!!errors?.address}
                        {...register("adress")}
                        style={{ paddingTop: "10px" }}
                        type="address"
                        placeholder="242 Tô Hiệu"
                        id="address"
                        // value={address}
                        // onChange={(e) => setAddress(e.target.value)}
                        helperText={errors.address?.message}
                      />
                    </div>
                    <div className="form-control">
                      <label>Số Điện Thoại</label>
                      <input
                        error={!!errors?.numberPhone}
                        {...register("numberPhone")}
                        type="tel"
                        placeholder="0835129813"
                        id="numberPhone"
                        value={numberPhone}
                        onChange={(e) => setNumberPhone(e.target.value)}
                        helperText={errors.numberPhone?.message}
                      />
                    </div>
                    <div
                      style={{
                        textAlign: "center",
                        padding: "10px 0px 10px 0px",
                      }}
                    >
                      <Button
                        sx={{ width: "100%" }}
                        variant="outlined"
                        label={!isDirty && !isValid}
                        onClick={handleSubmit(handleSubmitForm)}

                      >
                        Xác nhận đơn hàng
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
