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
