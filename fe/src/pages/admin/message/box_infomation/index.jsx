import React from "react";
import { Image } from "antd";

const BoxInformation = ({ data }) => {
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <div
        style={{
          marginTop: "15%",
          width: "100%",
          padding: "20px 0",
          display: "grid",
          placeItems: "center",
          textAlign: "center",
        }}
      >
        <Image src={data?.userId?.avt} width="150px" />
        <p
          style={{
            fontSize: "18px",
            textTransform: "capitalize",
            fontWeight: "500",
          }}
        >
          {data?.userId.userName}
        </p>
        <span>Giới tính : {data?.userId.gender}</span>
        <span>Email : {data?.userId.email}</span>
      </div>
    </div>
  );
};

export default BoxInformation;
