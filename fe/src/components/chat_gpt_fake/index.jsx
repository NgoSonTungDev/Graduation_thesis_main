import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Carousel } from "@trendyol-js/react-carousel";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ScrollToBottom from "react-scroll-to-bottom";
import PulseLoader from "react-spinners/PulseLoader";
import axiosClient from "../../api/axiosClient";
import { AddDataChat } from "../../redux/chat_bot/chatSlice";
import { DataChat } from "../../redux/selectors";
import { toastify } from "../../utils/common";
import ChatItem from "./chat_item";
import "./style.scss";

const ChatBot = () => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState([]);

  const dispatch = useDispatch();
  const ListDataChat = useSelector(DataChat);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const sendMessage = async (data) => {
    setLoading(true);
    dispatch(
      AddDataChat({
        type: false,
        content: data.question,
        dateTime: new Date(),
      })
    );

    await axiosClient
      .post("/auto-rep/get-an", {
        question: data.question,
      })
      .then((res) => {
        setLoading(false);
        dispatch(
          AddDataChat({
            type: res.data.data.type,
            content: res.data.data.content,
            dateTime: res.data.data.dateTime,
          })
        );
      })
      .catch((err) => {
        toastify("error", err.response.data.message || "Lỗi hệ thông !");
        setLoading(false);
      });
  };

  const getDataChatBot = () => {
    axiosClient
      .get("/auto-rep/get-all")
      .then((res) => {
        setData(res.data.data.data);
      })
      .catch((err) => {
        toastify("error", err.response.data.message || "Lỗi hệ thông !");
      });
  };

  useEffect(() => {
    getDataChatBot();
  }, []);

  return (
    <div>
      <div className="container-chat-bot" onClick={handleClickOpen}>
        <img
          src="https://media0.giphy.com/media/ygJmO2X8nZBQCjX3gu/giphy.gif?cid=ecf05e47grwzc7zm3fheq9r4f5p96bd6pesi450e5j8zbftz&rid=giphy.gif&ct=s"
          alt=""
        />
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <div style={{ display: "flex" }}>
            <div style={{ width: "40px", height: "40px" }}>
              <img
                width={"100%"}
                src="https://media0.giphy.com/media/ygJmO2X8nZBQCjX3gu/giphy.gif?cid=ecf05e47grwzc7zm3fheq9r4f5p96bd6pesi450e5j8zbftz&rid=giphy.gif&ct=s"
                alt=""
              />
            </div>
            <div style={{ height: "40px", marginLeft: "10px" }}>
              <div className="name-chat-bot" style={{ height: "12px" }}>
                <p>SMART BOT </p>
                <PulseLoader
                  className="botLoading"
                  color="#0984e3"
                  loading={loading}
                  size={7}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              </div>
              <span
                style={{
                  fontSize: "10px",
                  color: "#3d3d3db6",
                }}
              >
                I AM CUSTOMER SUPORT CHAT BOT
              </span>
            </div>
          </div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText paddingBottom={0} id="alert-dialog-description">
            <div
              style={{
                width: "550px",
                height: "490px",
                // backgroundColor: "rgba(0, 0, 0, 0.2)",
              }}
            >
              <ScrollToBottom className="message-container">
                {ListDataChat.map((e) => {
                  return <ChatItem data={e} />;
                })}
              </ScrollToBottom>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <div style={{ width: "100%", height: "50px", overflow: "hidden" }}>
            <Carousel show={3} slide={3}>
              {data.map((data, index) => {
                return (
                  <div
                    style={{ fontSize: "13px", textAlign: "center" }}
                    onClick={(e) => {
                      sendMessage(data);
                      e.stopPropagation();
                    }}
                  >
                    <p
                      title={`${data.question}`}
                      style={{
                        textOverflow: "ellipsis",
                        whiteSpace: "pre",
                        fontWeight: 500,
                        textTransform: "capitalize",
                      }}
                    >
                      {data.question}
                    </p>
                  </div>
                );
              })}
            </Carousel>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ChatBot;
