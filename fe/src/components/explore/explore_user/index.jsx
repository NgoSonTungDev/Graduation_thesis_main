import moment from "moment";
import React from "react";
import { getUserDataLocalStorage } from "../../../utils/localstorage";
import "./style.scss";

const ExploreUser = ({ dataUser, getIdMovePage }) => {
  return (
    <div
      onClick={() => {
        getIdMovePage(dataUser?._id);
      }}
      style={{
        display: "flex",
        alignItems: "center",
        height: "60px",
        width: "300px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        padding: "10px",
      }}
    >
      <img
        src={dataUser?.avt}
        alt="user avatar"
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          marginRight: "10px",
        }}
      />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span style={{ fontWeight: "bold", fontSize: "16px" }}>
          {" "}
          {dataUser?.userName}
        </span>
        <span style={{ fontSize: "14px", color: "#777" }}>
          {" "}
          {dataUser?.email}
        </span>
        <span style={{ fontSize: "14px", color: "#777" }}>
          {moment(dataUser?.createdAt).format("DD/MM/YYYY")}
        </span>
      </div>
    </div>
  );
};

export default ExploreUser;
