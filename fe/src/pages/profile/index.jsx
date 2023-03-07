import React from "react";
import "./style.scss";
import WcIcon from "@mui/icons-material/Wc";
import CreateIcon from "@mui/icons-material/Create";
import CommentIcon from "@mui/icons-material/Comment";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CardProfile from "./cardProfile";
import Navbar from "../../components/navbar";
import { Modal, Typography } from "@mui/material";
import { Box, style } from "@mui/system";

const Profile = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Navbar />
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-bg">
            <div className="profile-avatar">
              <img
                src="https://zoipet.com/wp-content/uploads/2022/12/Corgi-duc-trang-vang-thuan-chung-bo-me-nhap-2.png"
                alt=""
              />
            </div>
          </div>
          <div className="profile-name">
            <h2>tuanphuong2091@gmail.com</h2>
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
                    <WcIcon className="icon" />
                    Giới tính
                  </span>
                  <span className="text-detail">Nam</span>
                </div>
                <div className="details">
                  <span>
                    <CreateIcon className="icon" />
                    Đánh giá
                  </span>

                  <span className="text-detail">Nam</span>
                </div>
                <div className="details">
                  <span>
                    <CommentIcon className="icon" />
                    Bình luận
                  </span>

                  <span className="text-detail">Nam</span>
                </div>
                <div className="details">
                  <span>
                    <FavoriteIcon className="icon" />
                    Đã lưu
                  </span>

                  <span className="text-detail">Nam</span>
                </div>
                <div className="details">
                  <span>
                    <PersonAddAlt1Icon className="icon" />
                    Đang theo dõi
                  </span>

                  <span className="text-detail">Nam</span>
                </div>
                <div className="details">
                  <span>
                    <RssFeedIcon className="icon" />
                    Người theo dõi
                  </span>

                  <span className="text-detail">Nam</span>
                </div>
                <div className="details">
                  <span>
                    <CalendarMonthIcon className="icon" />
                    Ngày tham gia
                  </span>

                  <span className="text-detail">Nam</span>
                </div>
              </div>
            </div>
            <div className="profile-content">
              <CardProfile />
            </div>
            <div className="modal-edit">
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Text in a modal
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Duis mollis, est non commodo luctus, nisi erat porttitor
                    ligula.
                  </Typography>
                </Box>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
