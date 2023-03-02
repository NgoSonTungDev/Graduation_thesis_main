import React, { useEffect } from "react";
import Navbar from "../navbar";
import Footer from "../footer";
import "./index.scss";
import advertisement from "./images/advertisement.png";
import { Button } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ReplyIcon from "@mui/icons-material/Reply";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
// import axiosClient from "../../api/axiosClient";
// import { toastify } from "../../utils/common";
// import queryString from "query-string";
import GetDataPlace from "./data_place";

const Explore = ({data}) => {

  return (
    <div>
      <Navbar />
      <div className="explore_container">
        <div className="explore_container_left">
          <div className="explore_profile">
            <h1
            >thông tin cá nhân</h1>
          </div>
          <div className="explore_images">
           <img src={advertisement} alt="" />
          </div>
          <div className="explore_button">
            <div className="button">
              <Button sx={{width:"100%"}} component="label">
                <FavoriteIcon sx={{ padding: "7px" }} />
                Thích
              </Button>
            </div>
            <div className="button">
              <Button sx={{width:"100%"}} component="label">
                <ChatBubbleOutlineIcon sx={{ padding: "7px" }} />
                Bình luận
              </Button>
            </div>

            <div className="button">
              <Button sx={{width:"100%"}} component="label">
                <ReplyIcon sx={{ padding: "7px" }} />
                Chia sẻ
              </Button>
            </div>
          </div>
        </div>
        <div className="explore_container_right">
          <div className="explore_place_hot">
            <h1>Địa điểm nổi bật</h1>
            <div className="explore_place_hot_container">
              <div className="image_place">
                <img src={advertisement} alt="" />
              </div>
              <div className="content_place">
                <span>name:{data?.name}</span> <br />
                <span>địa điểm</span>
              </div>
            </div>
          </div>
          <div className="explore_user_hot">
            <h1>Người dùng tích cực</h1>
            <div className="explore_user_hot_container">
              <div className="image_user">
                <img src={advertisement} alt="" />
              </div>
              <div className="content_user">
                <span>name count</span> <br />
                <span>đánh giá</span>
              </div>
            </div>
          </div>
          <div className="explore_advertisement">
            <img src={advertisement} alt="" />
          </div>
        </div>
      </div>
      <GetDataPlace/>
      <Footer />
    </div>
  );
};

export default Explore;
