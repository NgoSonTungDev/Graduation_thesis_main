import { yupResolver } from "@hookform/resolvers/yup";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import axiosClient from "../../api/axiosClient";
import { toastify } from "../../utils/common";
import {
  getUserDataLocalStorage,
  setUserDataLocalStorage,
} from "../../utils/localstorage";

const validationInput = yup.object().shape({
  username: yup
    .string()
    .min(6, "Tên đại lý ít nhất 6 ký tự !!!")
    .max(30, "Tên đại lý tối đa 30 ký tự !!!")
    .required("Tên đại lý không được để trống"),
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
});

const InformationAgent = ({ open, handleClose }) => {
  const [check, setCheck] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openDialogAvt, setOpenDialogAvt] = React.useState(false);
  const [image, setImage] = useState("");
  const [file, setFile] = useState(null);

  const userIdStorage = getUserDataLocalStorage();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: "",
    },
    mode: "all",
    resolver: yupResolver(validationInput),
  });

  //   const handleOpenDialog = () => {
  //     setOpenDialogInformation(true);
  //   };

  //   const handleCloseDialog = () => {
  //     setOpenDialogInformation(false);
  //   };

  const handleCloseDialogAvt = () => {
    setImage("");
    setFile(null);
    setOpenDialogAvt(false);
  };

  const handleUpdateInformation = (data, urlImage) => {
    setLoading(true);

    axiosClient
      .put(`/user/update/${userIdStorage._id}`, {
        avt: urlImage,
        userName: data.username,
        address: data.address,
        numberPhone: data.phone,
      })
      .then((res) => {
        setLoading(false);
        console.log("true");
        // handleClose();
        handleSubmitAvt();
        toastify("success", "Cập nhật thông tin cá nhân thành công!!!");
      })
      .catch((err) => {
        setLoading(false);
        console.log("true");
        // handleClose();
        toastify("error", err.response.data.message || "Lỗi hệ thống !");
      });
  };

  const handleChangeFileImage = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };

  const handleSubmitAvt = async () => {
    const api = "https://api.cloudinary.com/v1_1/djo1gzatx/image/upload";
    const presetName = "mafline-upload";
    const folderName = "mafline";

    const formData = new FormData();
    formData.append("upload_preset", presetName);
    formData.append("folder", folderName);
    formData.append("file", file);

    axios
      .post(api, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        handleCloseDialogAvt();
        setUserDataLocalStorage({ ...userIdStorage, avt: res.data.url });
        toastify("success", "Cập nhật ảnh đại diện thành công!!!");
        handleUpdateInformation(res.data.url);
      })
      .catch((error) => {
        handleCloseDialogAvt();
      });
  };

  return (
    <div>
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle
          style={{ color: "#000", fontWeight: "600", textAlign: "center" }}
        >
          {"Thay đổi thông tin đại lý"}
        </DialogTitle>
        <DialogContent>
          <div
            style={{
              width: "400px",
              height: "350px ",
              display: "grid",
              palignItems: "center",
              border: "2px dashed #dedede",
            }}
          >
            {image ? (
              <img
                style={{
                  width: "100%",
                  height: "350px",
                  objectFit: "cover",
                }}
                src={image}
                alt=""
              />
            ) : (
              <Button variant="text" component="label" disabled={loading}>
                Thêm ảnh
                <input
                  type="file"
                  hidden
                  name="photo"
                  accept="image/*"
                  onChange={handleChangeFileImage}
                />
              </Button>
            )}
          </div>
          <div style={{ padding: "10px" }}>
            <span>
              <label style={{ fontSize: "14px", fontWeight: "600" }}>
                Tên đại lý
              </label>
            </span>
            <br />
            <TextField
              error={!!errors?.address}
              {...register("username")}
              helperText={errors.username?.message}
              type="text"
              size="small"
              sx={{ width: "350px", marginTop: "10px" }}
              label={"Tên đại lý"}
            />
          </div>
          <div style={{ padding: "10px" }}>
            <span>
              <label style={{ fontSize: "14px", fontWeight: "600" }}>
                Địa chỉ
              </label>
            </span>
            <br />
            <TextField
              error={!!errors?.address}
              {...register("address")}
              helperText={errors.address?.message}
              type="text"
              size="small"
              sx={{ width: "350px", marginTop: "10px" }}
              label={"Địa chỉ"}
            />
          </div>
          <div style={{ padding: "10px" }}>
            <span>
              <label style={{ fontSize: "14px", fontWeight: "600" }}>
                Số điện thoại
              </label>
            </span>
            <TextField
              error={!!errors?.phone}
              {...register("phone")}
              helperText={errors.phone?.message}
              type="text"
              size="small"
              sx={{ width: "100%", marginTop: "10px" }}
              label={"Số điện thoại"}
            />
          </div>
        </DialogContent>
        <DialogActions style={{ paddingBottom: "15px" }}>
          <LoadingButton variant="outlined" onClick={handleClose}>
            Huỷ
          </LoadingButton>
          <LoadingButton
            //   loading={loadingInformation}
            variant="outlined"
            onClick={handleSubmit(handleUpdateInformation)}
          >
            Cập nhật
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default InformationAgent;
