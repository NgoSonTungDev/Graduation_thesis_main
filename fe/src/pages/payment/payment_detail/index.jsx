import { yupResolver } from "@hookform/resolvers/yup";
import PaymentIcon from "@mui/icons-material/Payment";
import LoadingButton from "@mui/lab/LoadingButton";
import { Button, TextField } from "@mui/material";
import { Input, message } from "antd";
import moment from "moment";
import queryString from "query-string";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import axiosClient from "../../../api/axiosClient";
import Footer from "../../../components/footer";
import Navbar from "../../../components/navbar";
import { formatMoney, toastify } from "../../../utils/common";
import { getUserDataLocalStorage } from "../../../utils/localstorage";
import ModalUpateUser from "../modale-payment";

import "./style.scss";

const validationInput = yup.object().shape({
  numberAdultTicket: yup
    .number()
    .typeError("Số lượng vé phải lớn hơn hoặc bằng 0 ")
    .required("Không được bỏ trống trường này")
    .min(0, "Số lượng vé người lớn phải lớn hơn hoặc bằng 0!")
    .max(20, "Số lượng vé đặt không quá 20 vé!"),
  numberChildTicket: yup
    .number()
    .typeError("Số lượng vé phải lớn hơn hoặc bằng 0")
    .required("Không được bỏ trống trường này")
    .min(0, "Số lượng vé người lớn phải lớn hơn hoặc bằng 0!")
    .max(20, "Số lượng vé đặt không quá 20 vé!"),
});

export default function PaymentDetail() {
  const [dataUser, setDataUser] = useState({});
  const [dataTicket, setDataaTicket] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadingPayment, setLoadingPayment] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [check, setCheck] = useState(true);
  const { ticketId } = useParams();
  const [dataOrder, setDataOrder] = useState({});
  const [dateTime, setDateTime] = useState("");
  const [voucher, setVoucher] = useState("");
  const [dataVoucher, setDataVoucher] = useState(0);
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const userIdStorage = getUserDataLocalStorage();

  const totalPriceChildTicket =
    dataOrder.numberChildTicket * dataTicket?.childTicket;

  const totalPriceAdultTicket =
    dataOrder.numberAdultTicket * dataTicket?.adultTicket;

  const sumTicket =
    Number(dataOrder.numberChildTicket) + Number(dataOrder.numberAdultTicket);

  const sumTotalPrice = Math.max(
    totalPriceChildTicket +
      totalPriceAdultTicket +
      Number(sumTicket > 2 ? 0 : 30000) -
      Number(dataVoucher ? dataVoucher : 0),
    0
  );

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm({
    defaultValues: {
      numberAdultTicket: 0,
      numberChildTicket: 0,
      mode: "all",
    },
    resolver: yupResolver(validationInput),
  });

  const getApiUserID = () => {
    axiosClient
      .get(`/user/get-an/${userIdStorage._id}`)
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

  const getApiVoucher = () => {
    axiosClient
      .get(
        `/voucher/find-voucher?${queryString.stringify({
          codeVoucher: voucher,
          placeId: dataTicket?.placeId?._id,
        })}`
      )
      .then((res) => {
        setLoading(false);
        setDataVoucher(res.data.data.price);
        toastify("success", res.data.message || "Áp dụng mã thành công !");
      })
      .catch((err) => {
        setLoading(false);
        toastify("error", err.response.data.message || "Lỗi hệ thông !");
      });
  };

  const handleSubmitForm = (data) => {
    if (data.numberAdultTicket + data.numberChildTicket < 1) {
      toastify("error", "Bạn phải chọn ít nhất 1 vé");
    } else {
      if (dateTime === "") {
        toastify("error", "Ngày không được bỏ trống");
      } else {
        setDataOrder(data);
        setCheck(false);

        if (voucher !== "") {
          return getApiVoucher();
        }
      }
    }
  };

  const handleOrder = (data) => {
    if (
      dataTicket.numberTickets === 0 ||
      dataTicket.numberTickets < sumTicket
    ) {
      return toastify("error", "Số lượng vé còn lại không đủ !");
    }

    if (dataUser.address === "" || dataUser.numberPhone === "") {
      message.error("Vui lòng nhập đầy đủ thông tin");
      setOpenModal(true);
    } else {
      setLoadingPayment(true);
      axiosClient
        .post("/order/add", {
          adultTicket: dataOrder.numberAdultTicket,
          childTicket: dataOrder.numberChildTicket,
          total: sumTotalPrice,
          description: content ? content : "Không có ghi chú !",
          dateTime: Number(new Date()),
          userId: userIdStorage?._id,
          placeId: dataTicket?.placeId?._id,
          salesAgentId: dataTicket?.salesAgentId?._id,
          ticketId: ticketId,
        })
        .then((res) => {
          toastify("success", "Đặt vé thành công !");
          setContent("");
          setLoadingPayment(false);
          navigate("/home");
        })
        .catch((err) => {
          toastify("error", err.response.data.message || "Lỗi hệ thông !");
          setLoadingPayment(false);
        });
    }
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
                  borderRadius: "5px",
                }}
              >
                <div
                  style={{ textAlign: "center", margin: "10px 0px 10px 0px" }}
                >
                  <b>Thông Tin Đơn Hàng</b>
                </div>
                <div
                  style={{ width: "100%", display: "flex", padding: "10px" }}
                >
                  <div style={{ width: "40%", margin: "10px 0px 0px 15px" }}>
                    <span>Tên Địa Điểm</span>
                  </div>
                  <div style={{ width: "45%" }}>
                    <TextField
                      disabled
                      sx={{
                        border: "none",
                        outline: "none",
                        "& label": {
                          color: "red",
                        },
                      }}
                      size="small"
                      label={dataTicket?.placeId?.name}
                    />
                  </div>
                </div>
                <div
                  style={{ width: "100%", display: "flex", padding: "10px" }}
                >
                  <div style={{ width: "40%", margin: "10px 0px 0px 15px" }}>
                    <span>Địa Điểm</span>
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
                  <div style={{ width: "40%", margin: "10px 0px 0px 15px" }}>
                    <span>Vé Người Lớn</span>
                  </div>
                  <div style={{ width: "45%" }}>
                    <TextField
                      error={!!errors?.numberAdultTicket}
                      {...register("numberAdultTicket")}
                      type="number"
                      sx={{
                        border: "none",
                        outline: "none",
                        borderColor: "#777",
                      }}
                      helperText={errors.numberAdultTicket?.message}
                      size="small"
                      onChange={(e) => {
                        setCheck(true);
                      }}
                      placeholder="0"
                    />
                    <label style={{ paddingTop: "5px", fontSize: "14px" }}>
                      Thành Tiền:{" "}
                      {totalPriceAdultTicket
                        ? formatMoney(totalPriceAdultTicket)
                        : "0"}
                    </label>
                  </div>
                </div>
                <div
                  style={{ width: "100%", display: "flex", padding: "10px" }}
                >
                  <div style={{ width: "40%", margin: "10px 0px 0px 15px" }}>
                    <span>Vé Trẻ Em</span>
                  </div>
                  <div style={{ width: "45%" }}>
                    <TextField
                      error={!!errors?.numberChildTicket}
                      {...register("numberChildTicket")}
                      type="number"
                      sx={{ border: "none", outline: "none" }}
                      helperText={errors.numberChildTicket?.message}
                      size="small"
                      onChange={(e) => {
                        setCheck(true);
                      }}
                      placeholder="0"
                    />
                    <label style={{ paddingTop: "5px", fontSize: "14px" }}>
                      Thành Tiền:{" "}
                      {totalPriceChildTicket
                        ? formatMoney(totalPriceChildTicket)
                        : "0"}
                    </label>
                  </div>
                </div>

                <div
                  style={{ width: "100%", display: "flex", padding: "10px" }}
                >
                  <div style={{ width: "40%", margin: "10px 0px 0px 15px" }}>
                    <span>Ngày Đi</span>
                  </div>
                  <div style={{ width: "60%", marginLeft: "10px" }}>
                    <input
                      style={{
                        height: "30px",
                        width: "75%",
                        border: "1px solid #c4c4c4",
                        borderRadius: "5px",
                        outline: "none",
                        padding: "5px",
                        color: "#c4c4c4",
                      }}
                      type="date"
                      name="startDay"
                      value={dateTime}
                      min={moment(new Date()).format("yyyy-MM-DD")}
                      onChange={(e) => {
                        setDateTime(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div
                  style={{ width: "100%", display: "flex", padding: "10px" }}
                >
                  <div style={{ width: "40%", margin: "10px 0px 0px 15px" }}>
                    <span>Mã khuyến mãi</span>
                  </div>
                  <div style={{ width: "45%" }}>
                    <TextField
                      sx={{ border: "none", outline: "none" }}
                      size="small"
                      value={voucher}
                      onChange={(e) => setVoucher(e.target.value)}
                    />
                  </div>
                </div>
                <div
                  style={{ width: "100%", display: "flex", padding: "10px" }}
                >
                  <div style={{ width: "40%", margin: "10px 0px 0px 15px" }}>
                    <span>Tổng thành tiền</span>
                  </div>
                  <div style={{ width: "45%" }}>
                    <TextField
                      disabled
                      type="number"
                      sx={{ border: "none", outline: "none" }}
                      size="small"
                      label={sumTotalPrice ? formatMoney(sumTotalPrice) : "0"}
                    />
                  </div>
                </div>

                <div
                  style={{ textAlign: "center", padding: "10px 0px 10px 0px" }}
                >
                  <Button
                    sx={{ width: "85%" }}
                    variant="outlined"
                    label={!isDirty && !isValid}
                    onClick={handleSubmit(handleSubmitForm)}
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
                  borderRadius: "5px",
                }}
              >
                <div
                  style={{ textAlign: "center", margin: "10px 0px 10px 0px" }}
                >
                  <b>Thông tin vé</b>
                </div>
                <div
                  style={{ width: "100%", display: "flex", padding: "10px" }}
                >
                  <div style={{ width: "40%", margin: "10px 0px 0px 15px" }}>
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
                      label={
                        dataTicket?.adultTicket
                          ? dataTicket.adultTicket.toLocaleString("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            })
                          : ""
                      }
                    />
                  </div>
                </div>
                <div
                  style={{ width: "100%", display: "flex", padding: "10px" }}
                >
                  <div style={{ width: "40%", margin: "10px 0px 0px 15px" }}>
                    <span>Giá vé trẻ em</span>
                  </div>
                  <div style={{ width: "45%" }}>
                    <TextField
                      sx={{ border: "none", outline: "none" }}
                      disabled
                      size="small"
                      label={
                        dataTicket?.childTicket
                          ? dataTicket.childTicket.toLocaleString("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            })
                          : ""
                      }
                    />
                  </div>
                </div>

                <div
                  style={{ width: "100%", display: "flex", padding: "10px" }}
                >
                  <div style={{ width: "40%", margin: "10px 0px 0px 15px" }}>
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
                      <b>Thông tin đơn hàng</b>
                    </div>
                    <div className="form-control">
                      <label>Tên Khách Hàng</label>
                      <input disabled placeholder={dataUser?.userName} />
                    </div>
                    <div className="form-control">
                      <label>Email</label>
                      <input disabled placeholder={dataUser?.email} />
                    </div>
                    <div className="form-control">
                      <label>Giới Tính</label>
                      <input disabled placeholder={dataUser?.gender} />
                    </div>
                    <div className="form-control">
                      <label>Địa Chỉ</label>
                      <input
                        disabled
                        placeholder={
                          dataUser?.address
                            ? dataUser?.address
                            : "Chưa cập nhật"
                        }
                      />
                    </div>
                    <div className="form-control">
                      <label>Số Điện Thoại</label>
                      <input
                        disabled
                        placeholder={
                          dataUser?.numberPhone
                            ? dataUser?.numberPhone
                            : "Chưa cập nhật"
                        }
                      />
                    </div>
                    <div className="form-control">
                      <label>Tên Địa Điểm</label>
                      <input disabled placeholder={dataTicket?.placeId?.name} />
                    </div>
                    <div className="form-control">
                      <label>Địa Điểm</label>
                      <input
                        disabled
                        placeholder={dataTicket?.placeId?.location}
                      />
                    </div>
                    <div className="form-control">
                      <label>Vé Người Lớn</label>
                      <input
                        disabled
                        placeholder={dataOrder.numberAdultTicket}
                      />
                    </div>
                    <div className="form-control">
                      <label>Vé Trẻ Em</label>
                      <input
                        disabled
                        placeholder={dataOrder.numberChildTicket}
                      />
                    </div>
                    <div className="form-control">
                      <label>Ngày đi</label>
                      <input disabled placeholder={dateTime} />
                    </div>
                    <div className="form-control">
                      <label>Tổng Vé</label>
                      <input
                        disabled
                        placeholder={
                          sumTicket
                            ? Number(dataOrder?.numberAdultTicket) +
                              Number(dataOrder?.numberChildTicket)
                            : "0"
                        }
                      />
                    </div>
                    <div className="form-control">
                      <label>Phí Ship</label>
                      <input
                        disabled
                        placeholder={
                          sumTicket <= 2 ? `${formatMoney(30000)}` : "Miến phí"
                        }
                      />
                    </div>
                    <div className="form-control">
                      <label>Voucher</label>
                      <input
                        disabled
                        placeholder={
                          dataVoucher
                            ? `- ${formatMoney(dataVoucher)}`
                            : "Chưa áp dụng được mã"
                        }
                      />
                    </div>
                    <div className="form-control">
                      <label>Tổng Tiền</label>
                      <input
                        disabled
                        placeholder={
                          sumTotalPrice
                            ? formatMoney(sumTotalPrice)
                            : "0"
                        }
                      />
                    </div>
                    <div className="form-control">
                      <h3 className="title">Chú Thích</h3>
                      <Input.TextArea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Nhập chú thích "
                        autoSize={{ maxRows: 4, minRows: 4 }}
                      />
                    </div>

                    <div
                      style={{
                        textAlign: "center",
                        padding: "10px 0px 10px 0px",
                      }}
                    >
                      <LoadingButton
                        sx={{ width: "100%" }}
                        variant="outlined"
                        label={!isDirty && !isValid}
                        disabled={check}
                        onClick={handleOrder}
                        loading={loadingPayment}
                      >
                        Xác nhận đơn hàng
                      </LoadingButton>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalUpateUser
        open={openModal}
        handleClose={handleCloseModal}
        callBackApi={getApiUserID}
      />
      <Footer />
    </div>
  );
}
