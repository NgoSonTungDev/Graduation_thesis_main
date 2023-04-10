import { yupResolver } from "@hookform/resolvers/yup";
import LoadingButton from "@mui/lab/LoadingButton";
import { Button, TextField } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { width } from "@mui/system";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import axiosClient from "../../../api/axiosClient";
import LoadingBar from "../../../components/loadding/loading_bar";
import { toastify } from "../../../utils/common";
import "./style.scss";

const validationInput = yup.object().shape({
  userName: yup
    .string()
    .required("Tên tài khoản không được để trống.")
    .min(5, "Tên tài khoản tối thiểu 5 ký tự.")
    .max(30, "Tên tài khoản tối đa 30 ký tự."),
  email: yup.string().required("Email không được để trống").email(),
  address: yup
    .string()
    .min(6, "Địa chỉ ít nhất 10 ký tự !!!")
    .max(30, "Địa chỉ tối đa 50 ký tự !!!")
    .required("Địa chỉ không được để trống"),
  phone: yup
    .string()
    .max(11, "Số điện thoại tối đa 11 ký tự!!!")
    .min(10, "Số điện thoại ít nhất 10 ký tự!!!")
    .required("Số điện thoại chưa được nhập!!!"),
  password: yup.string().required("Mật khẩu không được để trống"),
  confirmPassword: yup
    .string()
    .required("Xác nhận mật khẩu không được để trống")
    .oneOf([yup.ref("password"), null], "Không trùng khớp."),
});

const RegisterAgency = () => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [loadingPage, setLoadingPage] = React.useState(false);
  const [data, setData] = React.useState({});
  const [OTP, setOTP] = React.useState(0);
  const navigation = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      userName: "",
      email: "",
      address: "",
      phone: "",
      password: "",
      confirmPassword: "",
      codeOTP: "",
    },
    resolver: yupResolver(validationInput),
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSendEmailRegister = (data) => {
    setData(data);
    setLoading(true);
    axiosClient
      .post("/email/send-code-register", {
        userName: data.userName,
        email: data.email,
      })
      .then((res) => {
        toastify("success", "Tên đại lý và email hợp lệ !");
        handleClickOpen();
        setLoading(false);
      })
      .catch((err) => {
        toastify("error", err.response.data.message || "Lỗi hệ thông !");
        setLoading(false);
      });
  };

  const handleRegister = () => {
    if (OTP < 100000 || OTP > 999999) {
      alert("Mã OTP gồm 6 chữ số !");
    } else {
      setLoadingPage(true);

      axiosClient
        .post("/user/register", {
          codeOtp: OTP,
          userName: data.userName,
          email: data.email,
          address: data.address,
          numberPhone: data.phone,
          password: data.password,
          isAdmin: 2,
        })
        .then((res) => {
          console.log(res);
          toastify(
            "success",
            res.data.message || "Tạo tài khoảng thành công !"
          );
          handleClose();
          setLoadingPage(false);
          navigation("/login");
          reset();
        })
        .catch((err) => {
          toastify("error", err.response.data.message || "Lỗi hệ thông !");
          setLoadingPage(false);
        });
    }
  };

  return (
    <div className="register_container">
      <div className="register_container_box">
        <h3
          style={{
            fontSize: "20px",
            textAlign: "center",
            color: "#636e72",
            textTransform: "capitalize",
          }}
        >
          Chào mừng bạn gia nhập với cộng đồng MAFLINE
        </h3>
        <div
          style={{
            display: "flex",
            gap: "25px",
            flexDirection: "column",
            paddingBottom: "20px",
          }}
        >
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
            error={!!errors?.email}
            {...register("email")}
            type="text"
            label="Email của bạn"
            size="small"
            sx={{ width: "80%", marginLeft: "10%" }}
            helperText={errors.email?.message}
          />
          <TextField
            error={!!errors?.address}
            {...register("address")}
            type="text"
            label="Địa chỉ"
            size="small"
            sx={{ width: "80%", marginLeft: "10%" }}
            helperText={errors.address?.message}
          />{" "}
          <TextField
            error={!!errors?.phone}
            {...register("phone")}
            type="text"
            label="Số điện thoại"
            size="small"
            sx={{ width: "80%", marginLeft: "10%" }}
            helperText={errors.phone?.message}
          />
          <TextField
            error={!!errors?.password}
            {...register("password")}
            type="password"
            label="Nhập mật khẩu"
            size="small"
            sx={{ width: "80%", marginLeft: "10%" }}
            helperText={errors.password?.message}
          />
          <TextField
            error={!!errors?.confirmPassword}
            {...register("confirmPassword")}
            type="password"
            label="Xác nhận mật khẩu"
            size="small"
            sx={{ width: "80%", marginLeft: "10%" }}
            helperText={errors.confirmPassword?.message}
          />
        </div>

        <div
          style={{
            width: "80%",
            display: "flex",
            marginTop: "10px",
            marginLeft: "10%",
            justifyContent: "space-around",
          }}
        >
          <Button
            variant="outlined"
            onClick={() => {
              navigation("/");
            }}
          >
            Quay lại
          </Button>
          <LoadingButton
            loading={loading}
            loadingIndicator="Loading…"
            variant="outlined"
            onClick={handleSubmit(handleSendEmailRegister)}
          >
            Đăng ký
          </LoadingButton>
        </div>

        <LoadingBar loading={loadingPage} />
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Nhập mã OTP</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Mã OTP có thời gian hiệu lực trong 3 phút sẽ được gửi về email của
            bạn dùng để xác thực email hoặc tài khoản của bạn ! vì lí do bảo mật
            vui lòng không chia sẻ mã này dưới bất kì hình thức nào.{" "}
            <b>MAFLINE</b> cảm ơn bạn đã sử dụng dịch vụ của chung tôi 😉
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="OTP"
            type="number"
            fullWidth
            variant="standard"
            value={OTP}
            onChange={(e) => {
              setOTP(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <LoadingButton loading={loadingPage} onClick={handleRegister}>
            Gửi
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RegisterAgency;
