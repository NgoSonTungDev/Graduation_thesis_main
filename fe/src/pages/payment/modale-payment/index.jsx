import { yupResolver } from "@hookform/resolvers/yup";
import CloseIcon from "@mui/icons-material/Close";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import * as React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import axiosClient from "../../../api/axiosClient";
import { toastify } from "../../../utils/common";
import { getUserDataLocalStorage } from "../../../utils/localstorage";

const validationInput = yup.object().shape({
  address: yup.string().required("Please provide plan cost."),
  numberPhone: yup
    .string()
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Không đúng định dạng số điện thoại"
    ),
});

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

export default function ModalUpateUser({ open, handleClose,callBackApi }) {
  const [loading, setLoading] = useState(false);
  const userIdStorage = getUserDataLocalStorage();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      address: "",
      numberPhone: "",
    },
    mode: "all",
    resolver: yupResolver(validationInput),
  });

  const updateApiUser = (data) => {
    axiosClient
      .put(`/user/update/${userIdStorage._id}`, {
        address: data.address,
        numberPhone: data.numberPhone,
      })
      .then((res) => {
        setLoading(false);
        reset();
        handleClose()
        callBackApi();
      })
      .catch((err) => {
        setLoading(false);
        toastify("error", err.response.data.message || "Lỗi hệ thông !");
      });
  };
  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          <p
            style={{
              textAlign: "center",
              fontWeight: "600",
              margin: 0,
              padding: 0,
              textTransform: "capitalize",
            }}
          >
            Cập nhật thông tin người dùng
          </p>
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <div
            style={{
              minWidth: "400px",
              gap: "20px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <TextField
              error={!!errors?.address}
              {...register("address")}
              type="text"
              label="Nhập dịa chỉ của bạn"
              size="small"
              sx={{ width: "80%", marginLeft: "10%" }}
              helperText={errors.address?.message}
            />

            <TextField
              error={!!errors?.numberPhone}
              {...register("numberPhone")}
              type="text"
              label="Nhập số điện thoại của bạn"
              size="small"
              sx={{ width: "80%", marginLeft: "10%" }}
              helperText={errors.numberPhone?.message}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleSubmit(updateApiUser)}>
            Cập nhật
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
