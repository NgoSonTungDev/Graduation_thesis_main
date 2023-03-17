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
import { toastify, formatDate } from "../../utils/common";
import _ from "lodash";
import { Form, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Modal,
  Skeleton,
  styled,
  Typography,
} from "@mui/material";
import ErrorEmpty from "../../components/emty_data";

const Profile = () => {
  const currrenUser = JSON.parse(localStorage.getItem("user"));
  const { id } = useParams();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [data, setData] = useState("");
  const [dataPost, setDataPost] = useState({});
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [showupdate, setShowUpdate] = useState(false);
  const handleCloseUpdate = () => setShowUpdate(false);
  const handleShowUpdate = () => setShowUpdate(true);
  const [showupdatetb, setShowUpdateTB] = useState(false);
  const handleCloseUpdateTB = () => setShowUpdateTB(false);
  const handleShowUpdateTB = () => setShowUpdateTB(true);
  const [showaddtb, setShowAddTB] = useState(false);
  const handleCloseAddTB = () => setShowAddTB(false);

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

  const handleUpdate = () => {
    setLoading(true);
    axiosClient
      .put(`/user/update/${id}`)
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

                  <span className="text-detail">
                    {formatDate(data.createdAt, "DD/MM/yyyy")}
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
        <Modal show={showupdate} onHide={handleCloseUpdate}>
          <Modal.Header closeButton>
            <Modal.Title>Cập Nhật Thông Tin</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Username </Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </Form.Group>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Giới tính </Form.Label>
                <Form.Control
                  type="text"
                  value={gender}
                  onChange={(e) => {
                    setGender(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="number"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseUpdate}>
              Đóng
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                handleShowUpdateTB();
                handleCloseUpdate();
              }}
            >
              Cập nhật
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Profile;
