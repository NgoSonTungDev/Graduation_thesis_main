import React from "react";
import { momentLocale } from "../../../utils/common";

const ChatItem = ({ data }) => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: `${!data.type ? "flex-end" : "flex-start"}`,
        paddingTop: "10px",
      }}
    >
      <div
        style={{
          maxWidth: "70%",
          backgroundColor: `${data.type ? "#e4e6eb" : "#0084ff"}`,
          color: `${!data.type ? "#fff" : "#000"}`,
          padding: "4px 10px",
          borderRadius: "10px",
          fontSize: "14px",
          textAlign: "left",
        }}
      >
        <p style={{ padding: 0, margin: 0 }}>{data.content}</p>
        <span style={{ fontSize: "12px" }}>{momentLocale(data.dateTime)}</span>
      </div>
    </div>
  );
};

export default ChatItem;
