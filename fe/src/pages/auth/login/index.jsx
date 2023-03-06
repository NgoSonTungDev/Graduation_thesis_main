import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import LoadingButton from "@mui/lab/LoadingButton";
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import * as yup from "yup";
import axiosClient from "../../../api/axiosClient";
import TextInputControl from "../../../hook-form/form_input";
import { toastify } from "../../../utils/common";

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
  const navigation = useNavigate();

  const {
    control,
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

  const handleLogin = (data) => {
    setCheck(true);
    axiosClient
      .post("/user/login", {
        userName: data.userName,
        password: data.password,
      })
      .then((res) => {
        console.log("log", res.data);
        setCheck(false);
        navigation("/profile");
        toastify("success", "Đăng nhập thành công!");
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
          <div
            style={{
              width: "80%",
              marginLeft: "10%",
              gap: "10px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <TextInputControl
              control={control}
              name="username"
              label="Tên đăng nhập"
              type={"text"}
            />
            <TextInputControl
              control={control}
              name="password"
              label="Mật khẩu"
              type={"password"}
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
            onClick={handleLogin}
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
