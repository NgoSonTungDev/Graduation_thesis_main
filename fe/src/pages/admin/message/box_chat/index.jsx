import { IconButton } from "@mui/material";
import React, { useState } from "react";
import "./style.scss";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ChatItemMessage from "./box_chat_item";
import ScrollToBottom from "react-scroll-to-bottom";
import { addMessage } from "../../../../redux/chat_box/chatBoxSlice";
import ws from "../../../../socket";
import { useDispatch, useSelector } from "react-redux";
import { listChatBox } from "../../../../redux/selectors";

const BoxChat = ({ data, openDetail, callBackFunction }) => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const listChat = useSelector(listChatBox);

  const handleOnClickEnter = (e) => {
    if (e.key === "Enter") {
      sendMessage();
      callBackFunction();
    }
  };

  const sendMessage = () => {
    const messageData = {
      room: data._id,
      isAdmin: true,
      message: message,
      time: Number(new Date()),
    };

    dispatch(addMessage(messageData));
    setMessage("");
    ws.sendMessage(messageData);
  };

  return (
    <div className="container_box_chat">
      <div className="container_box_chat_top">
        <div
          style={{ display: "flex", alignItems: "center", marginLeft: "20px" }}
        >
          <img
            src={data?.userId?.avt}
            width="50px"
            height="50px"
            style={{ borderRadius: "50%" }}
            alt=""
          />
          <p
            style={{
              marginLeft: "15px",
              fontSize: "18px",
              textTransform: "capitalize",
              fontWeight: "500",
            }}
          >
            {data?.userId.userName}
          </p>
        </div>
        <IconButton
          sx={{
            marginRight: "20px",
            color: "#0984e3",
          }}
          onClick={() => {
            openDetail();
          }}
        >
          <InfoOutlinedIcon sx={{ fontSize: "25px" }} />
        </IconButton>
      </div>

      <div className="container_box_chat_content">
        <ScrollToBottom className="box_scrollToBottom">
          {listChat.map((item, index) => {
            return <ChatItemMessage data={item} key={index} />;
          })}
        </ScrollToBottom>
      </div>

      <div style={{ width: "100%", height: "6.5%" }}>
        <input
          type="text"
          style={{
            padding: "10px",
            width: "97%",
            marginTop: "3px",
            fontSize: "14px",
            outline: "none",
            border: "none",
            zIndex: "100",
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

export default BoxChat;
