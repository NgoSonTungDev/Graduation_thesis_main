import { yupResolver } from "@hookform/resolvers/yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import * as yup from "yup";
import axiosClient from "../../../api/axiosClient";
import ws from "../../../socket";
import { toastify } from "../../../utils/common";
import {
  getUserDataLocalStorage,
  setUserDataLocalStorage,
} from "../../../utils/localstorage";
import "./style.scss";

const validationInput = yup.object().shape({
  userName: yup.string().required("Tên đăng nhập không được để trống"),
  password: yup
    .string()
    .min(6, "Mật khẩu ít nhất 6 ký tự !!!")
    .max(30, "Mật khẩu tối đa 30 ký tự !!!")
    .required("Mật khẩu không được để trống"),
});

const Login = () => {
  const [check, setCheck] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const userIdStorage = getUserDataLocalStorage();
  const navigation = useNavigate();

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

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

  // function onPress_ENTER(event) {
  //   var keyPressed = event.keyCode || event.which;
  //   if (keyPressed === 13) {
  //     handleLogin();
  //     keyPressed = null;
  //   } else {
  //     return false;
  //   }
  // }

  const joinRoom = (id) => {
    ws.joinRoom(id);
  };

  const handleLogin = (data) => {
    setCheck(true);
    axiosClient
      .post("/user/login", {
        userName: data.userName,
        password: data.password,
      })
      .then((res) => {
        setUserDataLocalStorage(res.data.data);
        setCheck(false);
        navigation("/home");
        joinRoom(res.data.data.roomId);
      })
      .catch((err) => {
        setCheck(false);
        toastify("error", err.response.data.message || "Lỗi hệ thông !");
      });
  };

  return (
    <div>
      <div className="container_Login">
        <div className={`container_Login_form `}>
          <h3>Đăng Nhập</h3>
          <div className="container_Login_form_text">
            <TextField
              error={!!errors?.userName}
              {...register("userName")}
              type="text"
              label="Tên đăng nhập của bạn"
              size="small"
              sx={{ width: "80%", marginLeft: "10%" }}
              helperText={errors.userName?.message}
            />
            <TextField
              error={!!errors?.password}
              {...register("password")}
              type={showPassword ? "text" : "password"}
              label="Mật khẩu của bạn"
              size="small"
              sx={{ width: "80%", marginLeft: "10%", marginTop: "20px" }}
              helperText={errors.password?.message}
              // onKeyDown={(e) => onPress_ENTER(e)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className="back_home">
            <span
              onClick={() => {
                navigation("/profile");
              }}
            >
              Quên mật khẩu
            </span>
          </div>
          <LoadingButton
            className="buttonlogin"
            onClick={handleSubmit(handleLogin)}
            loading={check}
            variant="outlined"
            disabled={!isDirty && !isValid}
          >
            Submit
          </LoadingButton>
          <p className="text">
            Nếu bạn chưa có tài khoản ?{" "}
            <span
              onClick={() => {
                navigation("/register");
              }}
            >
              Đăng Ký
            </span>
          </p>
        </div>
      </div>

      <ToastContainer autoClose={500} />
    </div>
  );
};

export default Login;
