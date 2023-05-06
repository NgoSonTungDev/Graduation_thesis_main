import React, { useEffect } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import axiosClient from "../../../../api/axiosClient";
import { yupResolver } from "@hookform/resolvers/yup";
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
import LoadingButton from "@mui/lab/LoadingButton";
import { toastify } from "../../../../utils/common";

const validationInput = yup.object().shape({
  userName: yup
    .string()
    .min(6, "Tên đăng nhập ít nhất 6 ký tự !!!")
    .max(30, "Tên đăng nhập tối đa 30 ký tự !!!")
    .required("Tên đăng nhập không được để trống"),
  address: yup
    .string()
    .min(6, "Địa chỉ ít nhất 6 ký tự !!!")
    .max(30, "Địa chỉ tối đa 30 ký tự !!!")
    .required("Địa chỉ không được để trống"),
  numberPhone: yup
    .string()
    .min(10, "Số điện thoại ít nhất 10 ký tự !!!")
    .max(11, "Số điện thoại tối đa 11 ký tự !!!")
    .required("Số điện thoại không được để trống"),
});

function ModalUpdate({ open, handleClose, userId, dataUser }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      userName: dataUser?.userName,
      address: dataUser?.address,
      numberPhone: dataUser?.numberPhone,
    },
    mode: "all",
    resolver: yupResolver(validationInput),
  });

  const handleUpdateAccount = (data) => {
    axiosClient
      .put(`/user/update/${userId}`, {
        userName: data.userName,
        isAdmin: Number(data.isAdmin),
        address: data.address,
        numberPhone: data.numberPhone,
      })
      .then((res) => {
        toastify("success", "Cập nhật thông tin cá nhân thành công!!!");
        handleClose();
      })
      .catch((err) => {
        toastify("error", err.response.data.message || "Lỗi hệ thông !");
      });
  };

  

  return (
    <Dialog
      open={open}
      keepMounted
      onClose={handleClose}
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
            error={!!errors?.userName}
            {...register("userName")}
            helperText={errors.userName?.message}
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
            label="Phân quyền"
            name="quyen"
            inputProps={register("isAdmin")}
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
            error={!!errors?.numberPhone}
            {...register("numberPhone")}
            helperText={errors.numberPhone?.message}
            type="text"
            size="small"
            sx={{ width: "100%" }}
            label={"Số điện thoại"}
          />
        </div>
      </DialogContent>
      <DialogActions style={{ paddingBottom: "15px" }}>
        <Button variant="outlined" onClick={handleClose}>
          Huỷ
        </Button>
        <LoadingButton
          loading={false}
          variant="outlined"
          onClick={handleSubmit(handleUpdateAccount)}
        >
          Cập nhật
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

export default ModalUpdate;
