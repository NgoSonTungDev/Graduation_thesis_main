import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CreateIcon from "@mui/icons-material/Create";
import WcIcon from "@mui/icons-material/Wc";
import EmailIcon from "@mui/icons-material/Email";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import "./style.scss";
import axiosClient from "../../api/axiosClient";
import CardPost from "../../components/explore/card_post";
import { toastify } from "../../utils/common";
import _ from "lodash";
import { useParams } from "react-router-dom";
// import { formatDay } from "./utils";
import { Box, Modal, styled, Typography } from "@mui/material";

const Profile = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [data, setData] = useState("");
  const [dataPost, setDataPost] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  // const formattedDate = formatDay(data.updatedAt);

  const getApiAllPost = () => {
    setLoading(true);
    axiosClient
      .get(`/post/get-id-user/${id}`)
      .then((res) => {
        // console.log("res", res);
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
      .get(`/user/get-an/63fcc3b2ebe41cb6c68dd48e`)
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

  // const handleEditUser = () => {
  //   setLoading(true);
  //   axiosClient
  //     .put(`/user/update/${id}`)
  //     .then((res) => {
  //       console.log("res", res);
  //       setData(res.data.data);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       setLoading(false);
  //       toastify("error", err.response.data.message || "Lỗi hệ thông !");
  //     });
  // };

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
              <img src={data.avt} alt="" />
            </div>
          </div>
          <div className="profile-name">
            <h2>{data.userName}</h2>
          </div>
        </div>
        <hr style={{ width: "80%", marginLeft: "10%", color: "gray" }} />
        <div className="profile-body">
          <div className="profile-menu">
            <ul className="select">
              <li className="option">Đánh giá</li>
              <li className="option">Địa điểm</li>
              <li className="option">Đã lưu</li>
              <li className="option">Đang theo dõi</li>
              <li className="option">Đã theo dõi</li>
            </ul>
            <button className="profile-edit" onClick={handleOpen}>
              <CreateIcon style={{ fontSize: "15px" }} />
              Chỉnh sửa
            </button>
          </div>
          <hr
            style={{
              width: "80%",
              marginLeft: "10%",
              color: "gray",
            }}
          />

          <div className="profile-main">
            <div className="profile-information">
              <p className="text">Bảng thông tin</p>
              <div className="information-details">
                <div className="details">
                  <span>
                    <AccountCircleIcon className="icon" />
                    Username
                  </span>
                  <span className="text-detail">{data.userName}</span>
                </div>

                <div className="details">
                  <span>
                    <WcIcon className="icon" />
                    Giới tính
                  </span>
                  <span className="text-detail">{data.gender}</span>
                </div>

                <div className="details">
                  <span>
                    <EmailIcon className="icon" />
                    Email
                  </span>

                  <span className="text-detail">{data.email}</span>
                </div>
                <div className="details">
                  <span>
                    <CalendarMonthIcon className="icon" />
                    Ngày tham gia
                  </span>

                  <span className="text-detail"></span>
                </div>
              </div>
            </div>
            <div className="profile-content">
              <div className="card-post">
                {_.isEmpty(dataPost) ? (
                  <p>Không có dữ liệu</p>
                ) : (
                  dataPost?.map((item, index) => (
                    <CardPost data={item} key={index} />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
        <Modal
          className="modal-edit"
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={styled}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default Profile;
