import React from "react";
import "./style.scss";
import CardProfile from "../profile/cardProfile/index";
import Navbar from "../../components/navbar";

const Profile = () => {
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
        <hr style={{ width: "70%", color: "green" }} />
        <div className="profile-body">
          <div className="profile-menu">
            <ul className="select">
              <li className="option">Đánh giá</li>
              <li className="option">Địa điểm</li>
              <li className="option">Đã lưu</li>
              <li className="option">Đang theo dõi</li>
              <li className="option">Đã theo dõi</li>
            </ul>
            <button className="profile-edit">Chỉnh sửa</button>
          </div>

          <div className="profile-main">
            <div className="profile-information">
              <p className="text">Bảng thông tin</p>
              <div className="information-details">
                <p>
                  <i class="fa-sharp fa-solid fa-circle-user"></i>Giới tính
                </p>
                <p>Đánh giá</p>
                <p>Thảo luận</p>
                <p>Đã lưu</p>
                <p>Đang theo dõi</p>
                <p>Người theo dõi</p>
                <p>Ngày tham gia</p>
              </div>
            </div>
            <div className="profile-content">
              <CardProfile />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
