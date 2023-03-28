import { yupResolver } from "@hookform/resolvers/yup";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import * as yup from "yup";
import axiosClient from "../../../api/axiosClient";
import { toastify } from "../../../utils/common";
import { getUserDataLocalStorage } from "../../../utils/localstorage";

const validationInput = yup.object().shape({
  password: yup
    .string()
    .min(6, "Mật khẩu ít nhất 6 ký tự !!!")
    .max(30, "Mật khẩu tối đa 30 ký tự !!!")
    .required("Mật khẩu không được để trống"),
});

const Login = () => {
  const [check, setCheck] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [openChangePassword, setOpenChangePassword] = React.useState(false);

  const userIdStorage = getUserDataLocalStorage();
  const id = userIdStorage._id;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenChangePassword = () => {
    setOpenChangePassword(true);
  };

  const handleCloseChangePassword = () => {
    setOpenChangePassword(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm({
    defaultValues: {
      userName: "",
      password: "",
    },
    mode: "all",
    resolver: yupResolver(validationInput),
  });

  const handleLogin = (data) => {
    setCheck(true);
    console.log("username", userIdStorage.userName);
    console.log("password", data.password);
    axiosClient
      .post("/user/login", {
        userName: userIdStorage.userName,
        password: data.password,
      })
      .then((res) => {
        setCheck(false);
        handleOpenChangePassword();
        console.log("true");
      })
      .catch((err) => {
        setCheck(false);
        console.log("false");
        toastify("error", err.response.data.message || "Lỗi hệ thông !");
      });
  };

  const handleChangePassword = (data) => {
    setCheck(true);
    axiosClient
      .put(`/user/change-password/${id}`, {
        password: data.new_password,
      })
      .then((res) => {
        setCheck(false);
        toastify("success", "Cập nhật thông tin cá nhân thành công!!!");
        handleCloseChangePassword();
      })
      .catch((err) => {
        setCheck(false);
        toastify("error", err.response.data.message || "Lỗi hệ thông !");
      });
  };

  return (
    <div>
      <button onClick={handleClickOpen}>onclick</button>
      <Dialog
        open={open}
        onClose={handleClose}
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
            <Box sx={{ minWidth: "300px" }}>
              <TextField
                error={!!errors?.password}
                {...register("password")}
                helperText={errors.password?.message}
                type="password"
                size="small"
                sx={{ width: "350px", marginTop: "10px" }}
                label={"Nhập mật khẩu cũ"}
              />
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <LoadingButton onClick={handleSubmit(handleLogin)} autoFocus>
            Xác nhận
          </LoadingButton>
        </DialogActions>
      </Dialog>

      {/* Dialog ChangePassword */}
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
            <Box sx={{ minWidth: "300px" }}>
              <TextField
                error={!!errors?.new_password}
                {...register("new_password")}
                helperText={errors.new_password?.message}
                type="password"
                size="small"
                sx={{ width: "350px", marginTop: "10px" }}
                label={"Nhập mật khẩu mới"}
              />
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseChangePassword}>Hủy</Button>
          <LoadingButton onClick={handleSubmit(handleChangePassword)} autoFocus>
            Xác nhận
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Login;
