import { Button, Typography } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import moment from "moment";
import React from "react";
import axiosClient from "../../../api/axiosClient";
import { formatMoney, toastify } from "../../../utils/common";
import { setOrderLocalStorage } from "../../../utils/localstorage";
import ModalEvaluate from "../model_evaluate";
import "./style.scss";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const TableOrderUser = ({
  data,
  callBackApi,
  handleOpenLoading,
  handleCloseLoading,
  loading,
}) => {
  const [description, setDescription] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const [placeId, setPlaceId] = React.useState("");
  const [openEvaluate, setOpenEvaluate] = React.useState(false);

  const handleClickOpenEvaluate = () => {
    setOpenEvaluate(true);
  };

  const handleCloseEvaluate = () => {
    setOpenEvaluate(false);
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCancel = (id) => {
    axiosClient
      .put(`/order/update/${id}`, {
        status: 3,
      })
      .then((res) => {
        toastify("success", "Hủy đơn hàng thành công");
        callBackApi();
      })
      .catch((err) => {
        toastify("error", err.response.data.message || "Lỗi hệ thông !");
      });
  };

  const handlePaymentVnPay = (orderId, total) => {
    handleOpenLoading();
    axios
      .post("https://mafline-vnpay.onrender.com/api/vnPay/create-url", {
        orderId: orderId,
        amount: total,
      })
      .then((res) => {
        window.location.href = res.data.url;
        handleCloseLoading();
      })
      .catch((err) => {
        handleCloseLoading();
        toastify("error", err.response.data.message || "Lỗi hệ thông !");
      });
  };

  const renderStory = (number) => {
    if (number === 1) {
      return <p style={{ color: "#2ecc71" }}>Chờ xác nhận</p>;
    } else if (number === 2) {
      return <p style={{ color: "#2ecc71" }}>Đã xác nhận</p>;
    } else if (number === 3) {
      return <p style={{ color: "#c0392b" }}>Đã hủy</p>;
    } else {
      return <p style={{ color: "#3498db" }}>Đã thanh Toán</p>;
    }
  };

  const renderButton = (
    number,
    id,
    codeOrder,
    total,
    amount,
    numberTickets,
    email,
    placeId
  ) => {
    if (number === 1) {
      return (
        <div style={{ color: "#2ecc71" }}>
          <button
            className="button-check cancel"
            onClick={() => {
              handleCancel(id);
            }}
            disabled={loading}
          >
            Hủy
          </button>
        </div>
      );
    } else if (number === 2) {
      return (
        <>
          {amount > numberTickets ? (
            <p style={{ color: "#d63031" }}>Hết vé</p>
          ) : (
            <button
              className="button-check payment"
              onClick={() => {
                handlePaymentVnPay(codeOrder, total);
                setOrderLocalStorage({ orderId: id, email: email });
              }}
              disabled={loading}
            >
              Thanh toán
            </button>
          )}
        </>
      );
    } else if (number === 3) {
      return <p style={{ color: "#c0392b" }}>Đã hủy</p>;
    } else {
      return (
        <button
          className="button-check Evaluate"
          disabled={loading}
          onClick={() => {
            handleClickOpenEvaluate();
            setPlaceId(placeId);
          }}
        >
          Đánh giá
        </button>
      );
    }
  };
  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow sx={{ padding: "5px 0" }}>
              <TableCell>Mã đơn hàng</TableCell>
              <TableCell align="center">Tên khách hàng</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Địa điểm</TableCell>
              <TableCell align="center">Vé người lớn</TableCell>
              <TableCell align="center">Vé trẻ em</TableCell>
              <TableCell align="center">Ngày đi</TableCell>
              <TableCell align="center">Chi tiết</TableCell>
              <TableCell align="center">Ngày đặt</TableCell>
              <TableCell align="center">Tổng vé</TableCell>
              <TableCell align="center">Trạng thái</TableCell>
              <TableCell align="center">Tổng tiền</TableCell>
              <TableCell align="center">Chức năng</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((item) => (
              <TableRow
                key={"ksjd"}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell component="th" scope="row" size="medium">
                  {item.codeOrder}
                </TableCell>
                <TableCell align="center" size="medium">
                  {item?.userId?.userName}
                </TableCell>
                <TableCell align="center" size="medium">
                  {item?.userId?.email}
                </TableCell>
                <TableCell align="center" size="medium">
                  {item?.placeId?.name}
                </TableCell>
                <TableCell align="center" size="medium">
                  {item.adultTicket}
                </TableCell>
                <TableCell align="center" size="medium">
                  {item.childTicket}
                </TableCell>
                <TableCell align="center" size="medium">
                  {moment(item.dateTime).format("DD/MM/yyyy")}
                </TableCell>
                <TableCell align="center" size="medium">
                  {item.description ? (
                    <Button
                      onClick={() => {
                        setDescription({
                          name: item?.userId?.userName,
                          email: item?.userId?.email,
                          address: item?.userId?.address,
                          numberPhone: item?.userId?.numberPhone,
                          description: item.description,
                        });
                        handleOpen();
                      }}
                    >
                      Xem
                    </Button>
                  ) : (
                    "..."
                  )}
                </TableCell>
                <TableCell align="center" size="medium">
                  {moment(item.createdAt).format("DD/MM/yyyy")}
                </TableCell>
                <TableCell align="center" size="medium">
                  {item.amount}
                </TableCell>
                <TableCell align="center" size="medium">
                  {renderStory(item.status)}
                </TableCell>
                <TableCell align="center" size="medium" sx={{ color: "red" }}>
                  {formatMoney(item.total)}
                </TableCell>
                <TableCell align="center" size="medium">
                  {renderButton(
                    item.status,
                    item._id,
                    item.codeOrder,
                    item.total,
                    item.amount,
                    item?.ticketId?.numberTickets,
                    item?.userId?.email,
                    item?.placeId?._id
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              fontWeight={600}
            >
              Mô tả
            </Typography>
            <Typography
              id="transition-modal-description"
              sx={{ mt: 2, textTransform: "capitalize" }}
            >
              <span style={{ fontWeight: "bold" }}>Tên </span> :{" "}
              {description.name}
            </Typography>
            <Typography
              id="transition-modal-description"
              sx={{ mt: 2, textTransform: "capitalize" }}
            >
              <span style={{ fontWeight: "bold" }}>Email </span> :{" "}
              {description.email}
            </Typography>
            <Typography
              id="transition-modal-description"
              sx={{ mt: 2, textTransform: "capitalize" }}
            >
              <span style={{ fontWeight: "bold" }}>Địa chỉ </span> :{" "}
              {description.address}
            </Typography>
            <Typography
              id="transition-modal-description"
              sx={{ mt: 2, textTransform: "capitalize" }}
            >
              <span style={{ fontWeight: "bold" }}>Số điện thoại </span> :{" "}
              {description.numberPhone}
            </Typography>
            <Typography
              id="transition-modal-description"
              sx={{ mt: 2, textTransform: "capitalize" }}
            >
              <span style={{ fontWeight: "bold" }}> Ghi chú</span> :{" "}
              {description.description}
            </Typography>
          </Box>
        </Fade>
      </Modal>
      <ModalEvaluate
        open={openEvaluate}
        handleClose={handleCloseEvaluate}
        placeId={placeId}
      />
    </div>
  );
};

export default TableOrderUser;
