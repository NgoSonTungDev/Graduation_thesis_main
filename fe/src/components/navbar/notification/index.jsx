import React from "react";
import { momentLocale } from "../../../utils/common";
import image from "../images/acount.jpeg";
import "./index.scss";

export default function NotificationItem({ data }) {
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
              src={image}
              alt=""
            />
          </div>
        </div>
        <div style={{ width: "70%" }}>
          <p
            style={{ margin: 0, padding: 0, fontSize: "15px", maxWidth: "95%" }}
          >
            {/* <span style={{ fontWeight: "600" }}>Sontung</span> đã trả lời bình
            luận của bạn */}
            {data.content}
          </p>
          <span style={{ color: "#00000e", fontSize: "12px" }}>
            {momentLocale(data.dateTime)}
          </span>
        </div>
      </div>
    </div>
  );
}
