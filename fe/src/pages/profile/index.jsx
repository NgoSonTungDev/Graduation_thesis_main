import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CreateIcon from "@mui/icons-material/Create";
import EmailIcon from "@mui/icons-material/Email";
import WcIcon from "@mui/icons-material/Wc";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Skeleton,
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

const Profile = () => {
  const currrenUser = JSON.parse(localStorage.getItem("user"));
  const { id } = useParams();
  const [data, setData] = useState("");
  const [dataPost, setDataPost] = useState({});
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
      .get(`/user/get-an/${currrenUser?._id}`)
      .then((res) => {
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
    setLoading(true);
    axiosClient
      .put(`/user/update/${id}`, {
        userName: username,
      })
      .then((res) => {
        setData(res.data.data);
        handleClose();
        setLoading(false);
        fetchData();
      })
      .catch((err) => {
        setLoading(false);
        toastify("error", err.response.data.message || "Lỗi hệ thông !");
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
              <img src={data?.avt} alt="" style={{ position: "absolute" }} />
              <span
                style={{
                  position: "absolute",
                  backgroundColor: "#ccc",
                  width: "35px",
                  height: "35px",
                  textAlign: "center",
                  top: "280px",
                  right: "650px",
                  cursor: "pointer",
                  borderRadius: "50%",
                }}
              >
                <AddAPhotoIcon style={{ marginTop: "4px" }} />
              </span>
            </div>
          </div>
          <div className="profile-name">
            <span style={{ fontSize: "20px", fontWeight: "500" }}>
              {data.userName}
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
                    <CalendarMonthIcon className="icon" />
                    Ngày tham gia
                  </span>

                  <span className="text-detail">
                    {moment(data.createdAt).format("DD/MM/yyyy")}
                  </span>
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

        <Dialog
          open={open}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle style={{ color: "red", textAlign: "center" }}>
            {"Cập nhật thông tin"}
          </DialogTitle>
          <DialogContent className="edit-profile">
            <label style={{ fontSize: "14px", fontWeight: "500" }}>
              Tên đăng nhập
            </label>
            <br />
            <input
              style={{
                width: "300px",
                padding: "5px",
                margin: "10px 0 10px 0",
              }}
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}> Huỷ</Button>
            <Button onClick={handleUpdateUsername}>Cập nhật</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default Profile;
