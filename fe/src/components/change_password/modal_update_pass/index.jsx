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
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import axiosClient from "../../../api/axiosClient";
import { toastify } from "../../../utils/common";
import { getUserDataLocalStorage } from "../../../utils/localstorage";

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

const ModalUpdatePassword = ({ open, handleClose }) => {
  const [check, setCheck] = useState(false);
  const userIdStorage = getUserDataLocalStorage();
  const navigation = useNavigate();

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

  const handleChangePassword = (data) => {
    setCheck(true);
    axiosClient
      .put(`/user/change-password/${userIdStorage?._id}`, {
        password: data.new_password,
      })
      .then((res) => {
        setCheck(false);
        toastify("success", "Đổi mật khẩu thành công!!!");
        handleClose();
      })
      .catch((err) => {
        setCheck(false);
        toastify("error", err.response.data.message || "Lỗi hệ thông !");
      });
  };

  return (
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
          <Button onClick={handleClose}>Hủy</Button>
          <LoadingButton
            loading={check}
            onClick={handleSubmit(handleChangePassword)}
            autoFocus
          >
            Xác nhận
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ModalUpdatePassword;
