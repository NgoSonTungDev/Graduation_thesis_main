import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import moment from "moment";
import { formatMoney } from "../../../../utils/common";
import { Button, Typography } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
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

const OrderTableAdmin = ({ data }) => {
  const [open, setOpen] = React.useState(false);
  const [description, setDescription] = React.useState({});
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow sx={{ padding: "5px 0" }}>
              <TableCell>Mã đơn hàng</TableCell>
              <TableCell>Đại lý</TableCell>
              <TableCell align="left">Tên khách hàng</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Địa điểm</TableCell>
              <TableCell align="left">Vé người lớn</TableCell>
              <TableCell align="left">Vé trẻ em</TableCell>
              <TableCell align="left">Ngày đi</TableCell>
              <TableCell align="left">Chi tiết</TableCell>
              <TableCell align="left">Ngày đặt</TableCell>
              <TableCell align="left">Tổng vé</TableCell>
              <TableCell align="left">Trạng thái</TableCell>
              <TableCell align="left">Tổng tiền</TableCell>
              <TableCell align="left">Ghi chú</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow
                key={"ksjd"}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell component="th" scope="row" size="medium">
                  {item.codeOrder}
                </TableCell>
                <TableCell component="th" scope="row" size="medium">
                  {item?.salesAgentId?.userName}
                </TableCell>
                <TableCell align="left" size="medium">
                  {item?.userId?.userName}
                </TableCell>
                <TableCell align="left" size="medium">
                  {item?.userId?.email}
                </TableCell>
                <TableCell align="left" size="medium">
                  {item?.placeId ? (
                    item.placeId.name
                  ) : (
                    <p style={{ color: "red" }}>Không còn tồn tại</p>
                  )}
                </TableCell>
                <TableCell align="left" size="medium">
                  {item.adultTicket}
                </TableCell>
                <TableCell align="left" size="medium">
                  {item.childTicket}
                </TableCell>
                <TableCell align="left" size="medium">
                  {moment(item.dateTime).format("DD/MM/yyyy")}
                </TableCell>
                <TableCell align="left" size="medium">
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
                <TableCell align="left" size="medium">
                  {moment(item.createdAt).format("DD/MM/yyyy")}
                </TableCell>
                <TableCell align="left" size="medium">
                  {item.amount}
                </TableCell>
                <TableCell align="left" size="medium">
                  {renderStory(item.status)}
                </TableCell>
                <TableCell align="left" size="medium" sx={{ color: "red" }}>
                  {formatMoney(item.total)}
                </TableCell>
                <TableCell align="left" size="medium">
                  {!item.placeId || !item.ticketId ? (
                    <p style={{ color: "red" }}>Đã có vấn đề về đơn hàng</p>
                  ) : (
                    "Không"
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
              <span style={{ fontWeight: "bold" }}>Tên khách hàng</span> :{" "}
              {description.name}
            </Typography>
            <Typography
              id="transition-modal-description"
              sx={{ mt: 2, textTransform: "capitalize" }}
            >
              <span style={{ fontWeight: "bold" }}>Email khách hàng</span> :{" "}
              {description.email}
            </Typography>
            <Typography
              id="transition-modal-description"
              sx={{ mt: 2, textTransform: "capitalize" }}
            >
              <span style={{ fontWeight: "bold" }}>Địa chỉ khách hàng</span> :{" "}
              {description.address}
            </Typography>
            <Typography
              id="transition-modal-description"
              sx={{ mt: 2, textTransform: "capitalize" }}
            >
              <span style={{ fontWeight: "bold" }}>
                Số điện thoại khách hàng
              </span>{" "}
              : {description.numberPhone}
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
    </div>
  );
};

export default OrderTableAdmin;
