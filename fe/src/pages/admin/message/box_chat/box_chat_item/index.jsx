import React from "react";
import { momentLocale } from "../../../../../utils/common";

const ChatItemMessage = ({ data }) => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: `${!data.isAdmin ? "flex-start" : "flex-end"}`,
      }}
    >
      <div
        style={{
          maxWidth: "70%",
          backgroundColor: `#e4e6eb `,
          color: "#000",
          padding: "4px 10px",
          borderRadius: "10px",
          fontSize: "14px",
          textAlign: "left",
          margin: "8px 20px",
          backgroundColor: `${!data.isAdmin ? "#e4e6eb" : "#0084ff"}`,
          color: `${!data.isAdmin ? "#000" : "#fff"}`,
        }}
      >
        <p style={{ margin: 0, padding: 0 }}>{data.message}</p>
        <span style={{ fontSize: "12px" }}>{momentLocale(data.time)}</span>
      </div>
    </div>
  );
};

export default ChatItemMessage;
