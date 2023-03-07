import CloseIcon from "@mui/icons-material/Close";
import Avatar from "@mui/material/Avatar";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ScrollToBottom from "react-scroll-to-bottom";
import { addMessage, closeChatBox } from "../../redux/chat_box/chatBoxSlice";
import ChatItem from "./chat_item";
import "./style.scss";

import ws from "../../socket";
import { toastify } from "../../utils/common";
import { listChatBox } from "../../redux/selectors";

const ChatBox = ({ openBox }) => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const listChat = useSelector(listChatBox);

  const handleOnClickEnter = (e) => {
    if (e.key === "Enter") {
      sendMessage();
      setMessage("");
    }
  };

  const sendMessage = async () => {
    const messageData = {
      room: "63eb395175a1b450e28d9665",
      author: true,
      message: message,
      time: Number(new Date()),
    };

    ws.sendMessage(messageData);
    dispatch(addMessage(messageData));
  };

  // useEffect(() => {
  //   ws.io.on("receive_message", (data) => {
  //     dispatch(addMessage(data));
  //     toastify("info", "Bạn có 1 tin nhắn mới");
  //   });
  // }, [ws]);

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
        backgroundColor: "#fff",
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
          {listChat?.map((item) => {
            return <ChatItem data={item} />;
          })}
        </ScrollToBottom>
      </div>
      <div
        style={{
          width: "100%",
          height: "10%",
        }}
      >
        <input
          type="text"
          style={{
            padding: "10px",
            width: "93%",
            marginTop: "3px",
            fontSize: "14px",
            outline: "none",
            border: "none",
          }}
          value={message}
          placeholder={"Aa..."}
          onKeyDown={handleOnClickEnter}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default ChatBox;
