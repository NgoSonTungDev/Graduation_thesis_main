import React from "react";
import "./style.scss";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MessageIcon from "@mui/icons-material/Message";
import ReplyIcon from "@mui/icons-material/Reply";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const CardProfile = () => {
  return (
    <div className="card-profile-container">
      <div className="card-profile-main">
        <div className="card-profile-header">
          <p>user</p>
          <ArrowRightIcon style={{ marginTop: "5px" }} />
          <p>place</p>
        </div>
        <div className="card-profile-status">
          <input type="text" id="text-input" name="text-input" wrap />
        </div>
        <div className="card-profile-img">
          <img
            src="https://res.cloudinary.com/vuongute/image/upload/v1676980661/DO_AN/s5uubjmkfgtpovew0ops.png"
            alt=""
          />
        </div>
        <div className="card-profile-action">
          <ul>
            <li>
              {" "}
              <FavoriteIcon style={{ marginRight: "10px" }} />
              Thích
            </li>
            <li>
              <MessageIcon style={{ marginRight: "10px" }} />
              Bình luận
            </li>
            <li>
              <ReplyIcon style={{ marginRight: "10px" }} />
              Chia sẻ
            </li>
          </ul>
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
              <Box component="form" noValidate autoComplete="off">
                <div>
                  <TextField
                    id="outlined-multiline-flexible"
                    label="Nhập bình luận của bạn!"
                    multiline
                    maxRows={4}
                  />
                </div>
              </Box>
            </div>
            <ArrowCircleRightIcon className="icon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardProfile;
