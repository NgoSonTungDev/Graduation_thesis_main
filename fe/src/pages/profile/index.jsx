import { yupResolver } from "@hookform/resolvers/yup";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EmailIcon from "@mui/icons-material/Email";
import HomeIcon from "@mui/icons-material/Home";
import PhoneIcon from "@mui/icons-material/Phone";
import WcIcon from "@mui/icons-material/Wc";
import LoadingButton from "@mui/lab/LoadingButton";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Image } from "antd";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Skeleton,
  TextField,
} from "@mui/material";
import axios from "axios";
import _ from "lodash";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../../api/axiosClient";
import ErrorEmpty from "../../components/emty_data";
import CardPost from "../../components/explore/card_post";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import { toastify } from "../../utils/common";
import {
  getUserDataLocalStorage,
  setUserDataLocalStorage,
} from "../../utils/localstorage";
import "./style.scss";

const validation = yup.object().shape({
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

const Profile = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [dataPost, setDataPost] = useState({});
  const [loading, setLoading] = useState(true);
  const [loadingImage, setLoadingImage] = useState(false);
  const [loadingInformation, setLoadingInformation] = useState(false);
  const [openDialogAvt, setOpenDialogAvt] = React.useState(false);
  const [openDialogInformation, setOpenDialogInformation] =
    React.useState(false);
  const [file, setFile] = useState(null);
  const userIdStorage = getUserDataLocalStorage();
  const [image, setImage] = useState("");

  const handleOpenDialogAvt = () => {
    setOpenDialogAvt(true);
  };

  const handleCloseDialogAvt = () => {
    setImage("");
    setFile(null);
    setOpenDialogAvt(false);
  };

  const handleOpenDialogInformation = () => {
    setOpenDialogInformation(true);
  };

  const handleCloseDialogInformation = () => {
    setOpenDialogInformation(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      gender: "Nam",
      address: "",
      phone: "",
    },
    resolver: yupResolver(validation),
    // mode: "all",
  });

  const getApiAllPost = () => {
    setLoading(true);
    axiosClient
      .get(`/post/get-id-user/${id}`)
      .then((res) => {
        setDataPost(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        toastify("error", err.response.data.message || "Lỗi hệ thông !");
      });
  };

  const fetchData = async () => {
    setLoading(true);
    axiosClient
      .get(`/user/get-an/${id}`)
      .then((res) => {
        setData(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        toastify("error", err.response.data.message || "Lỗi hệ thông !");
      });
  };

  const handleUpdateInformation = (data) => {
    setLoadingInformation(true);
    console.log("data", data);
    axiosClient
      .put(`/user/update/${id}`, {
        gender: data.gender,
        address: data.address,
        numberPhone: data.phone,
      })
      .then((res) => {
        setLoadingInformation(false);
        fetchData();
        handleCloseDialogInformation();
        toastify("success", "Cập nhật thông tin cá nhân thành công!!!");
      })
      .catch((err) => {
        setLoadingInformation(false);
        handleCloseDialogInformation();
        toastify("error", err.response.data.message || "Lỗi hệ thông !");
      });
  };

  const handleChangeFileImage = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };

  const handleSubmitAvt = async () => {
    setLoadingImage(true);
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
        setLoadingImage(false);
      })
      .catch((error) => {
        handleCloseDialogAvt();
        setLoadingImage(false);
      });
  };

  useEffect(() => {
    getApiAllPost();
    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-bg">
            <div className="profile-avatar">
              <Image
                style={{
                  objectFit: "cover",
                }}
                src={userIdStorage?.avt}
              />
              {userIdStorage._id === id && (
                <IconButton
                  sx={{
                    position: "absolute",
                    bottom: "0",
                    right: "0",
                  }}
                  variant=""
                  component="label"
                  disabled={loading}
                >
                  <AddAPhotoIcon onClick={handleOpenDialogAvt} />
                </IconButton>
              )}
            </div>
          </div>
          <div className="profile-name">
            <span style={{ fontSize: "20px", fontWeight: "500" }}>
              {data.userName}
            </span>
          </div>
        </div>
        <hr style={{ width: "80%", marginLeft: "10%", color: "gray" }} />
        <div className="profile-body">
          <div className="profile-main">
            <div className="profile-information">
              <p className="text">Bảng thông tin</p>
              <div className="information-details">
                <div className="details">
                  <span>
                    <AccountCircleIcon className="icon" />
                    Username
                  </span>
                  <span className="text-detail">{data?.userName}</span>
                </div>
                <div className="details">
                  <span>
                    <WcIcon className="icon" />
                    Giới tính
                  </span>
                  <span className="text-detail">{data?.gender}</span>
                </div>
                <div className="details">
                  <span>
                    <EmailIcon className="icon" />
                    Email
                  </span>

                  <span className="text-detail">{data?.email}</span>
                </div>
                <div className="details">
                  <span>
                    <HomeIcon className="icon" />
                    Địa chỉ
                  </span>
                  <span className="text-detail">
                    {data.address ? data.address : "Chưa cập nhật"}
                  </span>
                </div>
                <div className="details">
                  <span>
                    <PhoneIcon className="icon" />
                    Số điện thoại
                  </span>

                  <span className="text-detail">
                    {data.numberPhone ? data.numberPhone : "Chưa cập nhật"}
                  </span>
                </div>
                <div className="details">
                  <span>
                    <CalendarMonthIcon className="icon" />
                    Ngày tham gia
                  </span>

                  <span className="text-detail">
                    {moment(data.createdAt).format("DD/MM/yyyy")}
                  </span>
                </div>
                {id === userIdStorage._id && (
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      paddingBottom: "10px",
                    }}
                  >
                    <Button onClick={handleOpenDialogInformation}>
                      Chỉnh sửa
                    </Button>
                  </div>
                )}
              </div>
            </div>
            {loading ? (
              <div className="profile-content">
                {[1, 2, 3, 4, 5, 6].map((item, index) => (
                  <Skeleton
                    key={index}
                    variant="rectangular"
                    sx={{ width: "300px", height: "385px", margin: "38px" }}
                  />
                ))}
              </div>
            ) : (
              <div className="profile-content">
                <div className="card-post">
                  {_.isEmpty(dataPost) ? (
                    <ErrorEmpty />
                  ) : (
                    dataPost?.map((item, index) => (
                      <CardPost data={item} key={index} />
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        <Footer />

        {/* Dialog đổi ảnh đại diện */}
        <Dialog
          open={openDialogAvt}
          keepMounted
          onClose={handleCloseDialogAvt}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle
            style={{ color: "#000", fontWeight: "600", textAlign: "center" }}
          >
            {"Cập nhật ảnh đại diện"}
          </DialogTitle>
          <DialogContent className="edit-profile">
            <div
              style={{
                width: "500px",
                height: "427px ",
                display: "grid",
                palignItems: "center",
                border: "2px dashed #dedede",
              }}
            >
              {image ? (
                <img
                  style={{
                    width: "100%",
                    height: "427px",
                    objectFit: "contain",
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
          </DialogContent>
          <DialogActions style={{ paddingBottom: "20px" }}>
            <LoadingButton variant="outlined" onClick={handleCloseDialogAvt}>
              Huỷ
            </LoadingButton>
            <LoadingButton
              loading={loadingImage}
              variant="outlined"
              onClick={handleSubmitAvt}
            >
              Xác nhận
            </LoadingButton>
          </DialogActions>
        </Dialog>

        {/* Dialog đổi thông tin người dùng */}
        <Dialog
          open={openDialogInformation}
          keepMounted
          onClose={handleCloseDialogInformation}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle
            style={{ color: "#000", fontWeight: "600", textAlign: "center" }}
          >
            {"Thay đổi thông tin"}
          </DialogTitle>
          <DialogContent>
            <div style={{ padding: "10px", display: "flex" }}>
              <span>
                <label style={{ fontSize: "14px", fontWeight: "600" }}>
                  Giới tính
                </label>
              </span>
              <TextField
                style={{ width: "110px", height: "30px", marginLeft: "5px" }}
                select
                label="Giới Tính"
                name="gender"
                inputProps={register("gender")}
                size="small"
              >
                <MenuItem value="Nam">Nam</MenuItem>
                <MenuItem value="Nữ">Nữ</MenuItem>
                <MenuItem value="Khác">Khác</MenuItem>
              </TextField>
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
            <LoadingButton
              variant="outlined"
              onClick={handleCloseDialogInformation}
            >
              Huỷ
            </LoadingButton>
            <LoadingButton
              loading={loadingInformation}
              variant="outlined"
              onClick={handleSubmit(handleUpdateInformation)}
            >
              Cập nhật
            </LoadingButton>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default Profile;
