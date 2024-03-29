import React, { useEffect, useState } from "react";
import { useNavigate, useNavigation } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { Button } from "antd";
import axiosClient from "../../../../api/axiosClient";
import { toastify } from "../../../../utils/common";
import { removeUserIdLocalStorage } from "../../../../utils/localstorage";

const validationInput = yup.object().shape({
  code_otp: yup
    .string()
    .required("OTP không được để trống")
    .min(6, "Mã OTP ít nhất 6 ký tự!!!")
    .max(6, "Mã OTP tối đa 6 ký tự!!!"),
  new_password: yup
    .string()
    .min(6, "Mật khẩu ít nhất 6 ký tự !!!")
    .max(30, "Mật khẩu tối đa 30 ký tự !!!")
    .required("Mật khẩu không được để trống"),
  confirm_password: yup
    .string()
    .required("Xác nhận mật khẩu không được để trống")
    .oneOf([yup.ref("new_password"), null], "Không trùng khớp."),
});

const ModalForgotPassword = ({ open, handleClose }) => {
  const [check, setCheck] = useState(false);
  const navigation = useNavigate();
  const [timeLeft, setTimeLeft] = useState(180);
  const id = localStorage.getItem("userId");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm({
    defaultValues: {
      code_otp: "",
      new_password: "",
      confirm_password: "",
    },
    mode: "all",
    resolver: yupResolver(validationInput),
  });

  const handleNewPassword = (data) => {
    setCheck(true);
    console.log("id:", id);
    axiosClient
      .put(`/user/update-password/${id}`, {
        codeOtp: data.code_otp,
        password: data.new_password,
      })
      .then((res) => {
        setCheck(false);
        handleClose();
        navigation("/login");
        removeUserIdLocalStorage();
        toastify("success", "Cập nhật mật khẩu thành công !!!");
        reset();
      })
      .catch((err) => {
        console.log("false");
        setCheck(false);
        console.log("false");
        toastify("error", err.response.data.message || "Lỗi hệ thống !");
      });
  };

  useEffect(() => {
    let countdownTimer = null;

    if (timeLeft > 0) {
      countdownTimer = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    }

    if (timeLeft === 0) {
      clearInterval(countdownTimer);
    }

    return () => clearInterval(countdownTimer);
  }, [timeLeft]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div>
      <div>
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
            {"Quên mật khẩu"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <Box sx={{ width: "400px" }}>
                Mã OTP có thời gian hiệu lực trong 3 phút sẽ được gửi về email
                của bạn dùng để xác thực tài khoảng của bạn.
                <p style={{ margin: "5px 0", fontSize: "13px" }}>
                  Thời gian hiệu lực còn lại :{" "}
                  <i style={{ fontWeight: "600" }}>{formatTime(timeLeft)}</i>
                </p>
              </Box>
              <Box sx={{ width: "400px" }}>
                <TextField
                  error={!!errors?.code_otp}
                  {...register("code_otp")}
                  helperText={errors.code_otp?.message}
                  type="text"
                  size="small"
                  sx={{ width: "100%", marginTop: "10px" }}
                  label={"Nhập mã OTP"}
                />
                <TextField
                  error={!!errors?.new_password}
                  {...register("new_password")}
                  helperText={errors.new_password?.message}
                  type="password"
                  size="small"
                  sx={{ width: "100%", marginTop: "10px" }}
                  label={"Nhập mật khẩu mới"}
                />
                <TextField
                  error={!!errors?.confirm_password}
                  {...register("confirm_password")}
                  helperText={errors.confirm_password?.message}
                  type="password"
                  size="small"
                  sx={{ width: "100%", marginTop: "10px" }}
                  label={"Nhập lại mật khẩu mới"}
                />
              </Box>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Hủy</Button>
            <LoadingButton
              loading={check}
              onClick={handleSubmit(handleNewPassword)}
              autoFocus
            >
              Xác nhận
            </LoadingButton>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default ModalForgotPassword;
