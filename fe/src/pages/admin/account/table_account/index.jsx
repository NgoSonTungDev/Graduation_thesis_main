import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import moment from "moment";
import { formatMoney, toastify } from "../../../../utils/common";
import { Button, Typography } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import "./style.scss";
import axiosClient from "../../../../api/axiosClient";

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

const AccountTable = ({ data, callBackApi }) => {
  const [open, setOpen] = React.useState(false);
  const [description, setDescription] = React.useState({});
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow sx={{ padding: "5px 0" }}>
              <TableCell align="left">Tên tài khoản</TableCell>
              <TableCell align="left">Phần quyền</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Giới tính</TableCell>
              <TableCell align="left">Địa chỉ</TableCell>
              <TableCell align="left">Số điện thoại</TableCell>
              <TableCell align="left">Ngày tham gia</TableCell>
              <TableCell align="left">Chức năng</TableCell>
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
                <TableCell align="left" size="medium">
                  {item.userName}
                </TableCell>
                <TableCell align="left" size="medium">
                  {item.isAdmin === 1 ? "Người dùng" : "Đại lý"}
                </TableCell>
                <TableCell align="left" size="medium">
                  {item.email}
                </TableCell>
                <TableCell align="left" size="medium">
                  {item.gender}
                </TableCell>
                <TableCell align="left" size="medium">
                  {item.address}
                </TableCell>
                <TableCell align="left" size="medium">
                  {item.numberPhone}
                </TableCell>
                <TableCell align="left" size="medium">
                  {item.createdAt}
                </TableCell>
                <TableCell align="left" size="medium">
                  <button
                    style={{
                      padding: "5px 25px",
                      outline: "none",
                      border: "1px solid red",
                      cursor: "pointer",
                      borderRadius: "4px",
                      color: "red",
                      backgroundColor: "white",
                    }}
                  >
                    Delete
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AccountTable;
