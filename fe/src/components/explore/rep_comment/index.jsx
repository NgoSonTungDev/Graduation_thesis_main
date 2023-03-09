import { Collapse, IconButton, Paper, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import axiosClient from "../../../api/axiosClient";
import { momentLocale, toastify } from "../../../utils/common";
import TelegramIcon from "@mui/icons-material/Telegram";

const Rep_Comment = ({ datarepComent }) => {
    const [datarepComent1, setDataRepComnet] = React.useState([]);
    const [expanded, setExpanded] = React.useState(false);
    const [numberLike, setNumberLike] = useState(0);
    const [like, setLike] = useState(false);
    const [content, setContent] = useState("");

    const handleExpandClick = () => {
        setExpanded(!expanded);
        axiosClient
          .get(`/rep-comment/get-by-id/${datarepComent._id}`)
          .then((res) => {
            setDataRepComnet(res.data.data);
          })
          .catch((err) => {
            toastify("error", err.response.data.message || "Lỗi hệ thông !");
          });
      };
     
      const handleDeleteRepComment = (e) => {
        axiosClient
          .delete(`/rep-comment/delete/${datarepComent._id}`, {
            userId: "63fd6883ea9627ba24c33075",
          })
          .then((res) => {
            toastify("success", res.data.message);
          })
          .catch((err) => {
            // toastify("error", err.response.data.message || "Lỗi hệ thông !");
          });
      };

  return (
    <div>
      <div
        style={{
          width: "90%",
          marginLeft:"10%",
          display: "flex",
        }}
      >
        <div
          style={{
            width: "40px",
            height: "40px",
            marginLeft: "40px",
          }}
        >
          <img
            style={{ width: "100%", height: "100%", borderRadius: "50%" }}
            src={datarepComent?.userId?.avt}
            alt=""
          />
        </div>
        <div style={{}}>
          <div
            style={{
            //   width: "90%",
              boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
              marginLeft: "30px",
              marginTop: "10px",
              padding:"5px",
              borderRadius: "10px",
            }}
          >
            <div style={{ display: "flex", padding: "5px" }}>
              <div>{datarepComent?.userId?.userName}</div>
              <div style={{ marginLeft: "20px" }}>
                {momentLocale(datarepComent?.dateTime)}
              </div>
            </div>
            <div style={{ padding: "5px" }}>
              <span>{datarepComent?.content}</span>
            </div>
          </div>
          <div
            style={{
              paddingBottom: "3%",
              display: "flex",
              padding:"5px",
              marginLeft: "10%",
            }}
          >
            <div
            style={{cursor: "pointer" }}>
              {like ? (
                <span
                //   onClick={(e) => {
                //     handleUnlikeComment(e);
                //   }}
                >
                  <span>{datarepComent1? `${numberLike} Thích` : "Thích"}</span>
                </span>
              ) : (
                <span
                //   onClick={(e) => {
                //     handleLikeComment(e);
                //   }}
                >
                  <span>{datarepComent1 ? `${numberLike} Thích` : "Thích"}</span>
                </span>
              )}
            </div>
            <div style={{ marginLeft: "10%", cursor: "pointer" }}>
              <span
                onClick={(e) => {
                  handleDeleteRepComment(e);
                }}
              >
                xóa
              </span>
            </div>
            <div
              style={{  marginLeft: "10%",cursor: "pointer" }}
              onClick={handleExpandClick}
            >
              <span>phản hồi</span>
            </div>
          </div>
        </div>
      </div>

      {/* <Collapse in={expanded} timeout="auto" unmountOnExit>
        <div
          style={{
            width: "100%",
            // height: "400px",
            // overflow: "scroll",
            // overflowX: "hidden",
            marginTop: "10px",
          }}
        >
        </div>
      </Collapse>
      <div
          className="comment"
          style={{ display: "flex", width: "100%", marginTop: "30px" }}
        >
          <div
            className="avatar"
            style={{ width: "50px", height: "50px", marginLeft: "40px" }}
          >
            <img
              style={{ width: "100%", height: "100%", borderRadius: "50%" }}
              src={datarepComent?.userId?.avt}
              alt=""
            />
          </div>
          <div
            style={{
              width: "78%",
            }}
          >
            <Paper
              component="form"
              sx={{
                marginLeft: "20px",
                width: "100%",
                
              }}
            >
              <TextField
                sx={{ width: "100%"}}
                value={content}
                size="small"
                multiline
                placeholder="Nhập bình luận công khai"
                // onKeyDown={handleOnClickEnter}
                onChange={(e) => {
                  setContent(e.target.value);
                }}
                InputProps={{
                  endAdornment: (
                    <IconButton type="button">
                      <TelegramIcon onClick={handleRepComnent} />
                    </IconButton>
                  ),
                }}
              />
            </Paper>
          </div>
        </div> */}
    </div>
  );
};

export default Rep_Comment;
