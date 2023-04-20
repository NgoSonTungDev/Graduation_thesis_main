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
import { setUserDataLocalStorage } from "../../../utils/localstorage";
import "./style.scss";
import { setUser } from "../../../redux/user/userSlice";
import { useDispatch } from "react-redux";

const validationInput = yup.object().shape({
  email: yup
    .string()
    .required("Email đăng nhập không được để trống")
    .email("Chưa đúng định dạng email"),
  password: yup
    .string()
    .min(6, "Mật khẩu ít nhất 6 ký tự !!!")
    .max(30, "Mật khẩu tối đa 30 ký tự !!!")
    .required("Mật khẩu không được để trống"),
});

const Login = () => {
  const [check, setCheck] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isDirty, isValid },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "all",
    resolver: yupResolver(validationInput),
  });

  function onPress_ENTER(event) {
    var keyPressed = event.keyCode || event.which;
    if (keyPressed === 13) {
      const { email, password } = watch();
      handleLogin({ email, password });
      keyPressed = null;
    } else {
      return false;
    }
  }

  const joinRoom = (id) => {
    ws.joinRoom(id);
  };

  const handleLogin = (data) => {
    setCheck(true);
    axiosClient
      .post("/user/login", {
        email: data.email,
        password: data.password,
      })
      .then((res) => {
        setUserDataLocalStorage(res.data.data);
        dispatch(setUser(res.data.data));
        setCheck(false);
        joinRoom(res.data.data.roomId);
        ws.joinRoomNotify(res.data.data._id);
        if (res.data.data.isAdmin === 1) {
          navigation("/home");
        } else if (res.data.data.isAdmin === 2) {
          navigation("/sale-agent/home");
        } else {
          navigation("/admin/home");
        }
      })
      .catch((err) => {
        dispatch(setUser(null));
        setCheck(false);
        toastify("error", err.response.data.message || "Lỗi hệ thông !");
      });
  };

  return (
    <div>
      <div className="container_Login">
        <div className={`container_Login_form `}>
          <p
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "28px",
              color: "#636e72",
            }}
          >
            Chào mừng bạn trở lại
          </p>
          <div className="container_Login_form_text">
            <TextField
              error={!!errors?.email}
              {...register("email")}
              type="text"
              label="Email đăng nhập của bạn"
              size="small"
              sx={{ width: "80%", marginLeft: "10%" }}
              helperText={errors.email?.message}
            />
            <TextField
              error={!!errors?.password}
              {...register("password")}
              type={showPassword ? "text" : "password"}
              label="Mật khẩu của bạn"
              size="small"
              sx={{ width: "80%", marginLeft: "10%", marginTop: "20px" }}
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
            onClick={handleSubmit(handleLogin)}
            loading={check}
            variant="outlined"
            disabled={!isDirty && !isValid}
          >
            Đăng nhập
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
