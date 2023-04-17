import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import moment from "moment";
import React from "react";
import "./style.scss";

const AccountTable = ({
  data,
  callBackApi,
  handleLockAccount,
  handleUnlockAccount,
}) => {
  const [open, setOpen] = React.useState(false);

  const handleBlockAcc = (userId) => {
    handleLockAccount(userId);
  };

  const handleUnlockAcc = (userId, email) => {
    handleUnlockAccount(userId, email);
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow sx={{ padding: "5px 0" }}>
              <TableCell style={{ fontWeight: "600" }} align="left">
                Tên tài khoản
              </TableCell>
              <TableCell style={{ fontWeight: "600" }} align="left">
                Phần quyền
              </TableCell>
              <TableCell style={{ fontWeight: "600" }} align="left">
                Email
              </TableCell>
              <TableCell style={{ fontWeight: "600" }} align="left">
                Giới tính
              </TableCell>
              <TableCell style={{ fontWeight: "600" }} align="left">
                Địa chỉ
              </TableCell>
              <TableCell style={{ fontWeight: "600" }} align="left">
                Số điện thoại
              </TableCell>
              <TableCell style={{ fontWeight: "600" }} align="left">
                Ngày tham gia
              </TableCell>
              <TableCell
                style={{ fontWeight: "600", textAlign: "center" }}
                align="left"
              >
                Chức năng
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <TableRow
                key={index}
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
                  {item.address ? item.address : "Chua cap nhat"}
                </TableCell>
                <TableCell align="left" size="medium">
                  {item.numberPhone}
                </TableCell>
                <TableCell align="left" size="medium">
                  {/* {item.createdAt} */}
                  {moment(item.createdAt).format("DD/MM/yyyy")}
                </TableCell>
                <TableCell align="left" size="medium">
                  <button
                    style={{
                      padding: "5px 15px",
                      width: "130px",
                      outline: "none",
                      border: "1px solid #f39c12",
                      cursor: "pointer",
                      borderRadius: "4px",
                      color: "#f39c12",
                      backgroundColor: "white",
                    }}
                    onClick={() => {
                      !item.isLock
                        ? handleBlockAcc(item._id)
                        : handleUnlockAcc(item._id, item.email);
                    }}
                  >
                    {!item.isLock ? "Khoá tài khoản" : "Mở tài khoản"}
                  </button>
                  <button
                    style={{
                      padding: "5px 15px",
                      margin: "5px",
                      outline: "none",
                      border: "1px solid red",
                      cursor: "pointer",
                      borderRadius: "4px",
                      color: "red",
                      backgroundColor: "white",
                    }}
                  >
                    Xoá dữ liệu
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
