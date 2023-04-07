<!-- import -->

<!-- import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup"; -->

<!-- Sử dụng yub để check validate -->

<!-- const validationInput = yup.object().shape({
email (note: tên đã dc đăng ký ở TextField): yup
.string()
.required("Email không được để trống")
.email("Không đúng định dạng Email !!!"),
}); -->

<!-- gửi nguyên chỉ thay đổi ở defaultValues (là giá trị ban đầu của input) -->

<!-- const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({
      defaultValues: {
      email: "",
    },
      resolver: yupResolver(validationInput),
}); -->

<!-- không đổi -->

<!-- <TextField
    error={!!errors?.email}
    {...register("email")}
    type="text"
    label="Nhập email của bạn"
    size="small"
    sx={{ width: "80%" }} //sx = scss (style như scss bth)
    helperText={errors.email?.message}
/> -->
<!--
axiosClient
.post("/email/send-code-register", {
userName: data.userName,
email: data.email,
})
.then((res) => {
toastify("success", res.data.message || "Tên người dùng và email hợp lệ !");
})
.catch((err) => {
toastify("error", err.response.data.message || "Lỗi hệ thông !");
});
-->

# Thông tin test thanh toán ảo của Ngân hàng NCB

- Số thẻ: 9704198526191432198
- Tên chủ thẻ: NGUYEN VAN A
- Ngày phát hành: 07/15
- Mật khẩu OTP: 123456

# Thống kê VNPAY

https://sandbox.vnpayment.vn/merchantv2/Users/Login.htm

- mynameisontung@gmail.com | ngosontung0309@gmail.com
- 0309Tungdev!
