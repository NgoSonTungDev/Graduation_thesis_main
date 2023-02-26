import CloseIcon from "@mui/icons-material/Close";
import Avatar from "@mui/material/Avatar";
import React from "react";
import { useDispatch } from "react-redux";
import ScrollToBottom from "react-scroll-to-bottom";
import { closeChatBox } from "../../redux/chat_box/chatBoxSlice";
import ChatItem from "./chat_item";
import "./style.scss";

const ChatBox = ({ openBox }) => {
  const dispatch = useDispatch();

  return (
    <div
      style={{
        display: `${openBox ? "block" : "none"}`,
        width: "340px",
        height: "450px",
        position: "fixed",
        bottom: 0,
        right: "110px",
        borderRadius: "5px 5px 0 0",
        boxShadow:
          " rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "10%",
          borderBottom: "1px solid #dbdcdc",
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{ display: "flex", alignItems: "center", marginLeft: "10px" }}
        >
          <Avatar
            alt="Remy Sharp"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScDa7dlJrBMPLnSSgGxcRDab6LrEr1w75Ku18vCm74kAIc9SvJjnWFMz4USgLF6vGMIC8&usqp=CAU"
          />

          <span style={{ marginLeft: "10px", fontWeight: "500" }}>
            {" "}
            Quản trị viên
          </span>
        </div>
        <CloseIcon
          sx={{ marginRight: "10px", cursor: "pointer" }}
          onClick={() => {
            dispatch(closeChatBox());
          }}
        />
      </div>

      <div
        style={{
          width: "100%",
          height: "80%",
          borderBottom: "1px solid #dbdcdc",
        }}
      >
        <ScrollToBottom className="container_box_chat">
          <ChatItem />
        </ScrollToBottom>
      </div>
    </div>
  );
};

export default ChatBox;
