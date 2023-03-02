import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.scss";
import axios from "axios";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer, toast } from "react-toastify";
import LoadingButton from "@mui/lab/LoadingButton";
import { useForm } from "react-hook-form";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useDispatch } from "react-redux";

const validationInput = yup.object().shape({
  username: yup.string().required("Tên đăng nhập không được để trống"),
  // .matches(
  //   /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/,
  //   "Không đươc chứa ký tự đặt biệt !!!"
  // ),
  password: yup
    .string()
    .min(6, "Mật khẩu ít nhất 6 ký tự !!!")
    .max(30, "Mật khẩu tối đa 30 ký tự !!!")
    .required("Mật khẩu không được để trống"),
});

const Login = () => {
  const navigation = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [check, setCheck] = useState(false);
  const dispatch = useDispatch();

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "all",
    resolver: yupResolver(validationInput),
  });

  function onPress_ENTER(event) {
    var keyPressed = event.keyCode || event.which;
    if (keyPressed === 13) {
      keyPressed = null;
    } else {
      return false;
    }
  }

  return (
    <div>
      <div className="container_Login">
        <div className={`container_Login_form `}>
          <h3>Đăng Nhập</h3>
          <div className="container_Login_form_text">
            <TextField
              error={!!errors?.username}
              {...register("username")}
              type="text"
              label="Tên đăng nhập của bạn"
              size="small"
              sx={{ width: "60%", marginLeft: "20%" }}
              helperText={errors.username?.message}
            />
            <TextField
              error={!!errors?.password}
              {...register("password")}
              type={showPassword ? "text" : "password"}
              label="Mật khẩu của bạn"
              size="small"
              sx={{ width: "60%", marginLeft: "20%", marginTop: "20px" }}
              helperText={errors.password?.message}
              onKeyDown={(e) => onPress_ENTER(e)}
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
                navigation("/forgot-password");
              }}
            >
              Quên mật khẩu
            </span>
          </div>
          <LoadingButton
            className="buttonlogin"
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
