import React from "react";
import { momentLocale } from "../../../utils/common";

const ChatItem = () => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
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
          margin: "10px",
        }}
      >
        <p style={{ margin: 0, padding: 0 }}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ab rerum,
          nemo ducimus delectus suscipit qui! Eius cum fugiat, dicta deleniti
          cumque iure, impedit perferendis nihil soluta velit tempore rem odit.
        </p>
        <span style={{ fontSize: "12px" }}>{momentLocale(1677311212432)}</span>
      </div>
    </div>
  );
};

export default ChatItem;
