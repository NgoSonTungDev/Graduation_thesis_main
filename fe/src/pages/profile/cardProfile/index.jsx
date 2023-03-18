import React from "react";
import "./style.scss";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MessageIcon from "@mui/icons-material/Message";
import ReplyIcon from "@mui/icons-material/Reply";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";

const CardProfile = () => {
  return (
    <div className="card-profile-container">
      <div className="card-profile-main">
        <div className="card-profile-header">
          <span>
            <img
              src="https://zoipet.com/wp-content/uploads/2022/12/Corgi-duc-trang-vang-thuan-chung-bo-me-nhap-2.png"
              alt=""
            />
          </span>
          <span>
            <span style={{ display: "flex" }}>
              <p>user</p>
              <ArrowRightIcon style={{ marginTop: "25px", color: "#ccc" }} />
              <p>place</p>
            </span>
            {/* <span style={{ marginBottom: "5px" }}>
                <p>rating</p>
              </span> */}
          </span>
        </div>
        <div className="card-profile-status">
          <input type="text" placeholder="Nhập mô tả" />
        </div>
        <div className="card-profile-img">
          <img
            src="https://res.cloudinary.com/vuongute/image/upload/v1676980661/DO_AN/s5uubjmkfgtpovew0ops.png"
            alt=""
          />
        </div>
        <div className="card-profile-action">
          <button className="btn-action">
            <FavoriteIcon className="icon-action" />
            <p>Thích</p>
          </button>
          <button className="btn-action">
            <MessageIcon className="icon-action" />
            <p>Bình luận</p>
          </button>
          <button className="btn-action">
            <ReplyIcon className="icon-action" />
            <p>Chia sẻ</p>
          </button>
        </div>
        <div className="card-profile-comment">
          <div className="logo">
            <img
              className="avatar"
              src="https://zoipet.com/wp-content/uploads/2022/12/Corgi-duc-trang-vang-thuan-chung-bo-me-nhap-2.png"
              alt=""
            />
          </div>
          <div className="comment">
            <div className="input-comment">
              <input type="text" placeholder="Nhập bình luận của bạn!" />
            </div>
            <div>
              <ArrowCircleRightIcon className="icon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardProfile;
