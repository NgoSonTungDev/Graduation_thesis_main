## Sử dụng yub check validate

- import thư viện
```javascript
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
```
- Đặt điều kiện

```javascript
const validationInput = yup.object().shape({
email (note: tên đã dc đăng ký ở TextField): yup
.string()
.required("Email không được để trống")
.email("Không đúng định dạng Email !!!"),
});
```

- Gửi nguyên chỉ thay đổi ở defaultValues (là giá trị ban đầu của input)

```javascript
const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({
      defaultValues: {
      email: "",
    },
      resolver: yupResolver(validationInput),
});
```
- Dùng TextField để app dụng vào để check lỗi 

```javascript
<TextField
    error={!!errors?.email}
    {...register("email")}
    type="text"
    label="Nhập email của bạn"
    size="small"
    sx={{ width: "80%" }} //sx = scss (style như scss bth)
    helperText={errors.email?.message}
/>
```
## Axios call api 

```javascript
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
```

## Thông tin test thanh toán ảo của Ngân hàng NCB

- Số thẻ: 9704198526191432198
- Tên chủ thẻ: NGUYEN VAN A
- Ngày phát hành: 07/15
- Mật khẩu OTP: 123456

## Thống kê VNPAY

[VNPAY](https://sandbox.vnpayment.vn/merchantv2/Users/Login.htm)

- mynameisontung@gmail.com | ngosontung0309@gmail.com
- 0309Tungdev!
