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
import axiosClient from "../../api/axiosClient";
import { toastify } from "../../utils/common";
import { getUserDataLocalStorage } from "../../utils/localstorage";
import ModalUpdatePassword from "./modal_update_pass";

const validationInput = yup.object().shape({
  password: yup
    .string()
    .min(6, "Mật khẩu ít nhất 6 ký tự !!!")
    .max(30, "Mật khẩu tối đa 30 ký tự !!!")
    .required("Mật khẩu không được để trống"),
});

const ChangePassword = ({ open, handleClose }) => {
  const [check, setCheck] = useState(false);
  const [openChangePassword, setOpenChangePassword] = React.useState(false);

  const userIdStorage = getUserDataLocalStorage();

  const handleOpenChangePassword = () => {
    setOpenChangePassword(true);
  };

  const handleCloseChangePassword = () => {
    setOpenChangePassword(false);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: "",
    },
    mode: "all",
    resolver: yupResolver(validationInput),
  });

  const handleLogin = (data) => {
    setCheck(true);
    axiosClient
      .post("/user/login", {
        userName: userIdStorage.userName,
        password: data.password,
      })
      .then((res) => {
        setCheck(false);
        handleOpenChangePassword();
        handleClose();
        reset();
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
          {"Xác nhận mật khẩu cũ"}
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
          <LoadingButton
            loading={check}
            onClick={handleSubmit(handleLogin)}
            autoFocus
          >
            Xác nhận
          </LoadingButton>
        </DialogActions>
      </Dialog>

      <ModalUpdatePassword
        open={openChangePassword}
        handleClose={handleCloseChangePassword}
      />
    </div>
  );
};

export default ChangePassword;
