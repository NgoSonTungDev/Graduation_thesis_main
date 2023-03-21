import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CreateIcon from "@mui/icons-material/Create";
import EmailIcon from "@mui/icons-material/Email";
import WcIcon from "@mui/icons-material/Wc";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeIcon from "@mui/icons-material/Home";
import LoadingButton from "@mui/lab/LoadingButton";
import ErrorIcon from "@mui/icons-material/Error";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Skeleton,
  TextField,
} from "@mui/material";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../../api/axiosClient";
import ErrorEmpty from "../../components/emty_data";
import CardPost from "../../components/explore/card_post";
import Navbar from "../../components/navbar";
import moment from "moment";
import { formatDate, toastify } from "../../utils/common";
import "./style.scss";
import axios from "axios";
import {
  getUserDataLocalStorage,
  setUserDataLocalStorage,
} from "../../utils/localstorage";

const validationUsername = yup.object().shape({
  username: yup
    .string()
    .min(6, "Tên tài khoản ít nhất 6 ký tự !!!")
    .max(30, "Tên tài khoản  tối đa 30 ký tự !!!")
    .required("Tên tài khoản không được để trống")
    .matches(
      /^[a-zA-Z0-9_]+$/,
      "Tên đăng nhập không được được chứa kí tự đặc biệt!"
    ),
});

const Profile = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [dataPost, setDataPost] = useState({});
  const [loading, setLoading] = useState(true);
  const [loadingImage, setLoadingImage] = useState(false);
  const [loadingUsername, setLoadingUsername] = useState(false);
  const [username, setUserName] = useState("");
  const [information, setInformation] = useState({
    address: "",
    phone: "",
    gender: "",
  });

  const [open, setOpen] = React.useState(false);
  const [openDialogAvt, setOpenDialogAvt] = React.useState(false);
  const [openDialogInformation, setOpenDialogInformation] =
    React.useState(false);
  const [file, setFile] = useState(null);
  const userIdStorage = getUserDataLocalStorage();

  const [image, setImage] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenDialogAvt = () => {
    setOpenDialogAvt(true);
  };

  const handleCloseDialogAvt = () => {
    setOpenDialogAvt(false);
  };

  const handleOpenDialogInformation = () => {
    setOpenDialogInformation(true);
  };

  const handleCloseDialogInformation = () => {
    handleOpenDialogInformation(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
    },
    resolver: yupResolver(validationUsername),
    mode: "all",
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
        setUserName(res.data.data.userName);
        console.log("res", res);
        setData(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        toastify("error", err.response.data.message || "Lỗi hệ thông !");
      });
  };

  const handleUpdateUsername = () => {
    setLoadingUsername(true);
    axiosClient
      .put(`/user/update/${id}`, {
        userName: username,
      })
      .then((res) => {
        handleClose();
        setUserDataLocalStorage({
          ...userIdStorage,
          userName: username,
        });
        setLoadingUsername(false);
        fetchData();
      })
      .catch((err) => {
        setLoadingUsername(false);
        handleClose();
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
        toastify("success", "Câp nhât anh dai dien thanh công");
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
              <img
                alt=""
                style={{
                  position: "absolute",
                  width: "100%",
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
              {userIdStorage?.userName}
            </span>
            <CreateIcon
              style={{
                fontSize: "16px",
                cursor: "pointer",
                marginLeft: "10px",
              }}
              onClick={handleClickOpen}
            />
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
                  <span className="text-detail">{data.address}</span>
                </div>
                <div className="details">
                  <span>
                    <PhoneIcon className="icon" />
                    Số điện thoại
                  </span>

                  <span className="text-detail">{data.numberPhone}</span>
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
              </div>
            </div>
            {loading ? (
              <div className="profile-content">
                {[1, 2, 3, 4, 5, 6].map((item, index) => (
                  <Skeleton
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

        {/* Dialog đổi tên người dùng */}
        <Dialog
          open={open}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle
            style={{ color: "#000", fontWeight: "600", textAlign: "center" }}
          >
            {"Thay đổi tên người dùng"}
          </DialogTitle>
          <DialogContent className="edit-profile">
            {/* <ErrorIcon /> */}
            <label
              style={{ fontSize: "14px", color: "red", fontWeight: "500" }}
            >
              Nếu bạn đổi tên người dùng thì tên đăng nhập cũng sẽ bị thay đổi!
            </label>
            <br />
            <TextField
              error={!!errors?.username}
              {...register("username")}
              helperText={errors.username?.message}
              type="text"
              size="small"
              sx={{ width: "100%", marginTop: "10px" }}
              label={"Tên người dùng"}
              value={username}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
          </DialogContent>
          <DialogActions>
            <LoadingButton variant="outlined" onClick={handleClose}>
              Huỷ
            </LoadingButton>
            <LoadingButton
              loading={loadingUsername}
              variant="outlined"
              onClick={handleSubmit(handleUpdateUsername)}
            >
              Xác nhận
            </LoadingButton>
          </DialogActions>
        </Dialog>

        {/* Dialog đổi ảnh đại diện */}
        <Dialog
          open={openDialogAvt}
          keepMounted
          onClose={handleClose}
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
                    objectFit: "center",
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
            <Button onClick={handleCloseDialogAvt}>Huỷ</Button>
            <LoadingButton loading={loadingImage} onClick={handleSubmitAvt}>
              Xác nhận
            </LoadingButton>
          </DialogActions>
        </Dialog>

        {/* Dialog đổi thông tin người dùng */}
        <Dialog
          open={openDialogInformation}
          keepMounted
          onClose={handleClose}
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
                <label
                  style={{ fontSize: "14px", color: "red", fontWeight: "500" }}
                >
                  Giới tính
                </label>
              </span>
              <span style={{ marginLeft: "10px" }}>
                <select>
                  <option value="">Nam</option>
                  <option value="">Nữ</option>
                  <option value="">Khác</option>
                </select>
              </span>
            </div>
            <div style={{ padding: "10px", display: "flex" }}>
              <span>
                <label
                  style={{ fontSize: "14px", color: "red", fontWeight: "500" }}
                >
                  Địa chỉ
                </label>
              </span>
              <span style={{ marginLeft: "10px" }}>
                <input
                  style={{
                    width: "100%",
                    padding: "5px",
                  }}
                  type="text"
                  placeholder="username"
                  value={information.username}
                  onChange={(e) => {}}
                />
              </span>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialogInformation}> Huỷ</Button>
            <LoadingButton
              loading={loadingUsername}
              onClick={handleUpdateUsername}
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
