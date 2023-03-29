import { yupResolver } from "@hookform/resolvers/yup";
import LoadingButton from "@mui/lab/LoadingButton";
import { TextField } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import * as yup from "yup";
import axiosClient from "../../../api/axiosClient";
import { toastify } from "../../../utils/common";
import { setOrderLocalStorage } from "../../../utils/localstorage";
import ModalForgotPassword from "./modal_newPassword";
import "./styles.scss";

const validationInput = yup.object().shape({
  email: yup
    .string()
    .required("Email không được để trống")
    .email("Không đúng định dạng Email !!!"),
});

const ForgotPassword = () => {
  const navigation = useNavigate();
  const [check, setCheck] = useState(false);
  const [openForgotPassword, setOpenForgotPassword] = React.useState(false);

  const handleOpenForgotPassword = () => {
    setOpenForgotPassword(true);
  };

  const handleCloseForgotPassword = () => {
    setOpenForgotPassword(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm({
    defaultValues: {
      email: "",
    },
    mode: "all",
    resolver: yupResolver(validationInput),
  });

  const handleSendMail = (data) => {
    setCheck(true);
    console.log("email", data.email);
    axiosClient
      .post("/email/send-code", {
        email: data.email,
      })
      .then((res) => {
        console.log("true");
        handleOpenForgotPassword();
        setCheck(false);

        setOrderLocalStorage("id", res.data.data);
      })
      .catch((err) => {
        console.log("false");
        setCheck(false);
        console.log("false");
        toastify("error", err.response.data.message || "Lỗi hệ thống !");
      });
  };

  return (
    <div>
      <div className="container_forgot_password">
        <div className="modal_forgotPassword">
          <p className="text">Nhập Email của bạn </p>
          <TextField
            style={{ padding: "5px 0", width: "90%" }}
            error={!!errors?.email}
            {...register("email")}
            helperText={errors.email?.message}
            size="small"
            autoFocus
            margin="dense"
            id="name"
            label="Email"
            type="email"
            fullWidth
            variant="standard"
          />
          <div className="buttonPassword">
            <LoadingButton
              className="buttonBack"
              onClick={() => {
                navigation("/home");
              }}
              variant="outlined"
            >
              Back
            </LoadingButton>
            <LoadingButton
              className="buttonSubmit"
              onClick={handleSubmit(handleSendMail)}
              loading={check}
              variant="outlined"
              disabled={!isDirty && !isValid}
            >
              Submit
            </LoadingButton>
          </div>
        </div>
      </div>
      <ToastContainer autoClose={1000} />

      <ModalForgotPassword
        open={openForgotPassword}
        handleClose={handleCloseForgotPassword}
      />
    </div>
  );
};

export default ForgotPassword;
