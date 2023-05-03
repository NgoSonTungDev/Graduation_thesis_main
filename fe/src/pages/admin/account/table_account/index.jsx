import { yupResolver } from "@hookform/resolvers/yup";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  TextField,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import moment from "moment";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import axiosClient from "../../../../api/axiosClient";
import { toastify } from "../../../../utils/common";
import {
  getUserDataLocalStorage,
  setUserIdLocalStorage,
} from "../../../../utils/localstorage";
import "./style.scss";

const validationInput = yup.object().shape({
  new_password: yup
    .string()
    .min(6, "Mật khẩu ít nhất 6 ký tự !!!")
    .max(30, "Mật khẩu tối đa 30 ký tự !!!")
    .required("Mật khẩu không được để trống"),
  confirmPassword: yup
    .string()
    .required("Xác nhận mật khẩu không được để trống")
    .oneOf([yup.ref("new_password"), null], "Không trùng khớp."),
});

const AccountTable = ({
  data,
  callBackApi,
  handleLockAccount,
  handleUnlockAccount,
  callBackHandleDeleteData,
}) => {
  const [openChangePassword, setOpenChangePassword] = React.useState(false);
  const [openUpdateAccount, setOpenUpdateAccount] = React.useState(false);
  const [check, setCheck] = useState(false);
  const userIdStorage = getUserDataLocalStorage();

  const handleOpenChangePassword = () => {
    setOpenChangePassword(true);
  };

  const handleCloseChangePassword = () => {
    setOpenChangePassword(false);
  };
  const handleOpenUpdateAccount = () => {
    setOpenUpdateAccount(true);
  };

  const handleCloseUpdateAccount = () => {
    setOpenUpdateAccount(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      new_password: "",
      confirmPassword: "",
    },
    mode: "all",
    resolver: yupResolver(validationInput),
  });

  const handleBlockAcc = (userId) => {
    handleLockAccount(userId);
  };

  const handleUnlockAcc = (userId, email) => {
    handleUnlockAccount(userId, email);
  };

  const handleDeleteData = (userId) => {
    callBackHandleDeleteData(userId);
  };

  const handleChangePassword = (data) => {
    setCheck(true);
    axiosClient
      .put(`/user/change-password/${userIdStorage?._id}`, {
        password: data.new_password,
      })
      .then((res) => {
        setCheck(false);
        toastify("success", "Đổi mật khẩu thành công!!!");
        handleCloseChangePassword();
      })
      .catch((err) => {
        setCheck(false);
        toastify("error", err.response.data.message || "Lỗi hệ thông !");
      });
  };

  const handleUpdateAccount = (data) => {
    axiosClient
      .put(`/user/update/${"id"}`, {
        userName: data.username,
        isAdmin: data.quyen,
        gender: data.gender,
        address: data.address,
        numberPhone: data.phone,
      })
      .then((res) => {
        toastify("success", "Cập nhật thông tin cá nhân thành công!!!");
      })
      .catch((err) => {
        toastify("error", err.response.data.message || "Lỗi hệ thông !");
      });
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
                  {item.address ? item.address : "Chưa cập nhật"}
                </TableCell>
                <TableCell align="left" size="medium">
                  {item.numberPhone ? item.numberPhone : "Chưa cập nhật"}
                </TableCell>
                <TableCell align="left" size="medium">
                  {moment(item.createdAt).format("DD/MM/yyyy")}
                </TableCell>
                <TableCell
                  style={{ width: "300px" }}
                  align="left"
                  size="medium"
                >
                  <button
                    style={{
                      padding: "7px 15px",
                      width: "130px",
                      marginLeft: "10px",
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
                      padding: "7px 15px",
                      marginLeft: "10px",
                      marginTop: "10px",
                      width: "130px",
                      outline: "none",
                      border: "1px solid red",
                      cursor: "pointer",
                      borderRadius: "4px",
                      color: "red",
                      backgroundColor: "white",
                    }}
                    onClick={() => {
                      handleDeleteData(item._id);
                    }}
                  >
                    Xoá dữ liệu
                  </button>
                  <button
                    style={{
                      padding: "7px 15px",
                      marginTop: "10px",
                      marginLeft: "10px",
                      width: "130px",
                      outline: "none",
                      border: "1px solid green",
                      cursor: "pointer",
                      borderRadius: "4px",
                      color: "green",
                      backgroundColor: "white",
                    }}
                    onClick={handleOpenUpdateAccount}
                  >
                    Chỉnh sửa
                  </button>
                  <button
                    style={{
                      padding: "7px 15px",
                      margin: "5px",
                      marginTop: "10px",
                      marginLeft: "10px",
                      width: "130px",
                      outline: "none",
                      border: "1px solid #000",
                      cursor: "pointer",
                      borderRadius: "4px",
                      color: "#000",
                      backgroundColor: "white",
                    }}
                    onClick={handleOpenChangePassword}
                  >
                    Đổi mật khẩu
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* dialog đổi mật khẩu */}
      <Dialog
        open={openChangePassword}
        onClose={handleCloseChangePassword}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{ textAlign: "center", fontWeight: "600" }}
        >
          {"Đổi mật khẩu"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Box sx={{ width: "350px" }}>
              <TextField
                error={!!errors?.new_password}
                {...register("new_password")}
                helperText={errors.new_password?.message}
                type="password"
                size="small"
                sx={{ width: "350px", marginTop: "10px" }}
                label={"Nhập mật khẩu mới"}
              />
              <TextField
                error={!!errors?.confirmPassword}
                {...register("confirmPassword")}
                helperText={errors.confirmPassword?.message}
                type="password"
                size="small"
                sx={{ width: "350px", marginTop: "10px" }}
                label={"Nhập lại mật khẩu mới"}
              />
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseChangePassword}>Hủy</Button>
          <LoadingButton
            loading={check}
            onClick={handleSubmit(handleChangePassword)}
            autoFocus
          >
            Xác nhận
          </LoadingButton>
        </DialogActions>
      </Dialog>

      {/* Dialog chỉnh sửa thông tin tài khoản */}
      <Dialog
        open={openUpdateAccount}
        keepMounted
        onClose={handleCloseUpdateAccount}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle
          style={{ color: "#000", fontWeight: "600", textAlign: "center" }}
        >
          {"Thay đổi thông tin"}
        </DialogTitle>
        <DialogContent>
          <div style={{ padding: "10px" }}>
            <TextField
              error={!!errors?.username}
              {...register("username")}
              helperText={errors.username?.message}
              type="text"
              size="small"
              sx={{ width: "100%", marginTop: "10px" }}
              label={"Tên tài khoản"}
            />
          </div>
          <div style={{ padding: "10px", display: "flex" }}>
            <TextField
              style={{ width: "100%", height: "30px" }}
              select
              label="Giới Tính"
              name="gender"
              inputProps={register("gender")}
              size="small"
            >
              <MenuItem value="Nam">Nam</MenuItem>
              <MenuItem value="Nữ">Nữ</MenuItem>
              <MenuItem value="Khác">Khác</MenuItem>
            </TextField>
          </div>
          <div style={{ padding: "10px", display: "flex" }}>
            <TextField
              style={{ width: "100%", height: "30px" }}
              select
              label="Phân quyền"
              name="quyen"
              inputProps={register("quyen")}
              size="small"
            >
              <MenuItem value="1">Người dùng</MenuItem>
              <MenuItem value="2">Đại lý</MenuItem>
              <MenuItem value="3">Admin</MenuItem>
            </TextField>
          </div>
          <div style={{ padding: "10px" }}>
            <TextField
              error={!!errors?.address}
              {...register("address")}
              helperText={errors.address?.message}
              type="text"
              size="small"
              sx={{ width: "350px" }}
              label={"Địa chỉ"}
            />
          </div>
          <div style={{ padding: "10px" }}>
            <TextField
              error={!!errors?.phone}
              {...register("phone")}
              helperText={errors.phone?.message}
              type="text"
              size="small"
              sx={{ width: "100%" }}
              label={"Số điện thoại"}
            />
          </div>
        </DialogContent>
        <DialogActions style={{ paddingBottom: "15px" }}>
          <Button variant="outlined" onClick={handleCloseUpdateAccount}>
            Huỷ
          </Button>
          <LoadingButton
            // loading={loadingInformation}
            variant="outlined"
            onClick={handleSubmit(handleUpdateAccount)}
          >
            Cập nhật
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AccountTable;
