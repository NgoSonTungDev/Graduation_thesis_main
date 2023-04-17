import { Avatar } from "@mui/material";
import React from "react";
import { momentLocale } from "../../../../utils/common";

const BoxEvaluateItem = ({ data }) => {
  return (
    <div
      style={{
        width: "100%",
        marginTop: "10px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <img
        style={{
          width: "64px",
          height: "64px",
          borderRadius: "50%",
          objectFit: "cover",
        }}
        src={data?.userId?.avt}
        alt=""
      />
      <div
        style={{
          width: "86%",
          backgroundColor: "#f5f5f7",
          padding: "5px 15px",
          borderRadius: "10px",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "60px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: "5px",
            borderBottom: "1px solid #dedede",
          }}
        >
          <div>
            <p style={{ fontSize: "18px" }}>{data?.userId?.userName
                    ? data?.userId?.userName
                    : "Người dùng Mafline"}</p>
            <span style={{ fontSize: "13px", color: "#898c95" }}>
              Đánh giá {momentLocale(data?.dateTime)}
            </span>
          </div>
          <Avatar sx={{ width: 32, height: 32, backgroundColor: "#ee0033" }}>
            {data.rating}
          </Avatar>
        </div>
        <div style={{ padding: "5px 0" }}>
          <span>{data.content}</span>
        </div>
      </div>
    </div>
  );
};

export default BoxEvaluateItem;
