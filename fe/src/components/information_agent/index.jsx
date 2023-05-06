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
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import axiosClient from "../../api/axiosClient";
import { toastify } from "../../utils/common";
import {
  getUserDataLocalStorage,
  setUserDataLocalStorage,
} from "../../utils/localstorage";
import LoadingBar from "../loadding/loading_bar";

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
  const [loadingGetApi, setLoadingGetApi] = useState(false);
  const [data, setData] = useState({});
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
      address: "",
      phone: "",
      username: "",
    },
    mode: "all",
    resolver: yupResolver(validationInput),
  });

  const handleCloseDialogAvt = () => {
    setImage("");
    setFile(null);
  };

  const handleUpdateInformation = (data, urlImage) => {
    axiosClient
      .put(`/user/update/${userIdStorage._id}`, {
        avt: urlImage ? urlImage : data.avt,
        userName: data.username,
        address: data.address,
        numberPhone: data.phone,
      })
      .then(() => {
        setLoading(false);
        setUserDataLocalStorage({
          ...userIdStorage,
          avt: urlImage ? urlImage : data.avt,
          userName: data.username,
          address: data.address,
          numberPhone: data.phone,
        });
        handleClose();
        toastify("success", "Cập nhật thông tin thành công!!!");
      })
      .catch((err) => {
        setLoading(false);
        handleClose();
        toastify("error", err.response.data.message || "Lỗi hệ thống !");
      });
  };

  const handleChangeFileImage = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };

  const handleSubmitAvt = async (data) => {
    setLoading(true);
    if (file === null) {
      handleUpdateInformation(data, "");
      return;
    }
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
        handleUpdateInformation(data, res.data.url);
      })
      .catch((error) => {
        handleCloseDialogAvt();
      });
  };

  const handleGetDataUser = async () => {
    setLoadingGetApi(true);
    axiosClient
      .get(`/user/get-an/${userIdStorage._id}`)
      .then((res) => {
        setData(res.data.data);
        setLoadingGetApi(false);
        reset({
          username: res.data.data.userName,
          address: res.data.data.address,
          phone: res.data.data.numberPhone,
        });
      })
      .catch((err) => {
        setLoadingGetApi(false);
        toastify("error", err.response.data.message || "Lỗi hệ thông !");
      });
  };

  useEffect(() => {
    handleGetDataUser();
  }, []);
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
        {loadingGetApi ? (
          <LoadingBar />
        ) : (
          <>
            <DialogContent>
              <div
                style={{
                  width: "400px",
                  height: "350px ",
                  display: "grid",
                  palignItems: "center",
                  border: "2px dashed #dedede",
                  backgroundImage: `url(${data.avt})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  overflow: "hidden",
                  overflowY: "scroll",
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
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "grid",
                      placeItems: "center",
                      backgroundColor: "#403e3ea3",
                    }}
                  >
                    <Button
                      //   variant="outlined"
                      component="label"
                      sx={{ color: "#fff", border: "1px dashed #fff" }}
                    >
                      Đổi ảnh đại diện
                      <input
                        type="file"
                        hidden
                        name="photo"
                        accept="image/*"
                        onChange={handleChangeFileImage}
                      />
                    </Button>
                  </div>
                )}
              </div>
              <div>
                {check ? (
                  <TextField
                    error={!!errors?.username}
                    {...register("username")}
                    helperText={errors.username?.message}
                    type="text"
                    size="small"
                    sx={{ width: "100%", marginTop: "12px" }}
                    label={"Tên đại lý"}
                  />
                ) : (
                  <span style={{ display: "flex" }}>
                    <p style={{ marginRight: "10px" }}>Tên đại lý:</p>
                    <p style={{ fontWeight: "600" }}>{data.userName}</p>
                  </span>
                )}
              </div>
              <div>
                {check ? (
                  <TextField
                    type="text"
                    size="small"
                    sx={{ width: "100%", marginTop: "12px" }}
                    label={"Email đại lý"}
                    value={data.email}
                    disabled
                  />
                ) : (
                  <span style={{ display: "flex" }}>
                    <p style={{ marginRight: "10px" }}>Email:</p>
                    <p style={{ fontWeight: "600" }}>{data.email}</p>
                  </span>
                )}
              </div>
              <div>
                {check ? (
                  <TextField
                    error={!!errors?.address}
                    {...register("address")}
                    helperText={errors.address?.message}
                    type="text"
                    size="small"
                    sx={{ width: "100%", marginTop: "12px" }}
                    label={"Địa chỉ"}
                  />
                ) : (
                  <span style={{ display: "flex" }}>
                    <p style={{ marginRight: "10px" }}>Địa chỉ:</p>
                    <p style={{ fontWeight: "600" }}>{data.address}</p>
                  </span>
                )}
              </div>
              <div>
                {check ? (
                  <TextField
                    error={!!errors?.phone}
                    {...register("phone")}
                    helperText={errors.phone?.message}
                    type="text"
                    size="small"
                    sx={{ width: "100%", marginTop: "12px" }}
                    label={"Số điện thoại"}
                  />
                ) : (
                  <span style={{ display: "flex" }}>
                    <p style={{ marginRight: "10px" }}>Số điện thoại:</p>
                    <p style={{ fontWeight: "600" }}>{data.numberPhone}</p>
                  </span>
                )}
              </div>
            </DialogContent>
            <DialogActions style={{ paddingBottom: "15px" }}>
              {!check ? (
                <>
                  <Button variant="outlined" onClick={handleClose}>
                    Huỷ
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setCheck(true);
                    }}
                  >
                    Chỉnh sửa
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setCheck(false);
                    }}
                  >
                    Huỷ
                  </Button>
                  <LoadingButton
                    loading={loading}
                    variant="outlined"
                    onClick={handleSubmit(handleSubmitAvt)}
                  >
                    Cập nhật
                  </LoadingButton>
                </>
              )}
            </DialogActions>
          </>
        )}
      </Dialog>
    </div>
  );
};

export default InformationAgent;
