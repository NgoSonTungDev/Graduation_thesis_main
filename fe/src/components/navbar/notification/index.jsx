import { Avatar } from "@mui/material";
import React from "react";
import "./index.scss";
export default function NotificationItem() {
  return (
    <div>
      <div className="Container_notify_item">
        <div className="Container_notify_item_image">
          <div
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              overflow: "hidden",
            }}
          >
            <img
              style={{ width: "100%", objectFit: "center" }}
              src="https://images.pexels.com/photos/10041677/pexels-photo-10041677.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
              alt=""
            />
          </div>
        </div>
        <div>
          <p
            style={{ margin: 0, padding: 0, fontSize: "15px", maxWidth: "95%" }}
          >
            <span style={{ fontWeight: "600" }}>Sontung</span> đã trả lời bình
            luận của bạn
          </p>
          <span style={{ color: "#00000e", fontSize: "12px" }}>
            1 phut truoc{" "}
          </span>
        </div>
      </div>
    </div>
  );
}
