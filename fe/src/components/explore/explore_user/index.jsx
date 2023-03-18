import moment from "moment";
import React from "react";
import "./style.scss";
const ExploreUser = ({ dataUser }) => {
  return (
    <div
      style={{
        width: "100%",
        padding: "10px 0",
        margin: "10px 0",
        boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        cursor: "pointer",
      }}
    >
      <div className="user_image">
        <img src={dataUser?.avt} alt="" />
      </div>
      <div
        style={{
          width: "70%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          // gap: "12px",
        }}
      >
        <div
          style={{
            fontSize: "20px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          <b>{dataUser?.userName}</b>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <span style={{ whiteSpace: "pre" }}>Địa chỉ :</span>
          <span
            style={{
              marginLeft: "5px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {dataUser?.email}
          </span>
        </div>
        <div> <span style={{ whiteSpace: "pre" }}>Ngày tạo :</span>
          <span
            style={{
              marginLeft: "5px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {moment(dataUser?.createdAt).format("DD/MM/YYYY")}
          </span></div>
      </div>
    </div>
  );
};

export default ExploreUser;
