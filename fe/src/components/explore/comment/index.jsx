import { Collapse, IconButton, Paper, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import axiosClient from "../../../api/axiosClient";
import { momentLocale, toastify } from "../../../utils/common";
import Rep_Comment from "../rep_comment";
import TelegramIcon from "@mui/icons-material/Telegram";

const Comment = ({ dataComent }) => {
  const [numberLike, setNumberLike] = useState();
  const [like, setLike] = useState(false);
  const [datarepComent, setDataRepComnet] = React.useState([]);
  const [expanded, setExpanded] = React.useState(false);
  const [content, setContent] = useState("");
  const handleExpandClick = () => {
    setExpanded(!expanded);
    axiosClient
      .get(`/rep-comment/get-by-id/${dataComent._id}`)
      .then((res) => {
        setDataRepComnet(res.data.data);
      })
      .catch((err) => {
        toastify("error", err.response.data.message || "Lỗi hệ thông !");
      });
  };

  const handleLikeComment = (e) => {
    axiosClient
      .post(`/like-comment/${dataComent._id}`, {
        userId: "63fd6883ea9627ba24c33075",
      })
      .then((res) => {
        setLike(true);
        toastify("success", res.data.message);
        setNumberLike(res.data.data);
        console.log("resssss", res);
      })
      .catch((err) => {
        setLike(false);
        toastify("error", err.response.data.message || "Lỗi hệ thông !");
      });
  };

  const handleUnlikeComment = (e) => {
    axiosClient
      .post(`/dis-like-comment/${dataComent._id}`, {
        userId: "63fd6883ea9627ba24c33075",
      })
      .then((res) => {
        setLike(false);
        toastify("success", res.data.message);
        setNumberLike(res.data.data);
        console.log("loixx", res);
      })
      .catch((err) => {
        setLike(false);
        // toastify("error", err.response.data.message || "Lỗi hệ thông !");
      });
  };

  const handleDeleteComment = (e) => {
    // setcnmt(cmt.filter(item => {return item._id !== "ấđâsdasdasd"}))
    axiosClient
      .delete(`/comment/delete/${dataComent._id}`, {
        userId: "63fd6883ea9627ba24c33075",
      })
      .then((res) => {
        toastify("success", res.data.message);
      })
      .catch((err) => {
        // toastify("error", err.response.data.message || "Lỗi hệ thông !");
      });
  };

  const handleRepComnent = (e) => {
    axiosClient
      .post(`/rep-comment/add`, {
        userId: "63fd6883ea9627ba24c33075",
        content: content,
        dateTime: Number(new Date()),
        commentId: dataComent._id,
      })
      .then((res) => {
        toastify("success", res.data.message);
        setDataRepComnet([...datarepComent, res.data.data]);
        setContent("");
      })
      .catch((err) => {
        toastify("error", err.response.data.message || "Lỗi hệ thông !");
      });
  };

  const fetchData = () => {
    dataComent?.like?.find((e) => {
      return e === "63fd6883ea9627ba24c33075";
    })
      ? setLike(true)
      : setLike(false);
  };

  useEffect(() => {
    fetchData();
    setNumberLike(Number(dataComent?.like.length));
  }, []);
  return (
    <div>
      <div
        style={{
          width: "100%",
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
            src={dataComent?.userId?.avt}
            alt=""
          />
        </div>
        <div style={{}}>
          <div
            style={{
              width: "auto",
              boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
              marginLeft: "30px",
              padding: "5px",
              marginTop: "10px",
              borderRadius: "10px",
            }}
          >
            <div style={{ display: "flex", padding: "5px" }}>
              <div>{dataComent?.userId?.userName}</div>
              <div style={{ marginLeft: "40px" }}>
                {momentLocale(dataComent?.dateTime)}
              </div>
            </div>
            <div style={{ padding: "5px" }}>
              <span>{dataComent?.content}</span>
            </div>
          </div>
          <div
            style={{
              paddingBottom: "3%",
              display: "flex",
              padding: "5px",
              marginLeft: "10%",
            }}
          >
            <div style={{ cursor: "pointer" }}>
              {like ? (
                <span
                  onClick={(e) => {
                    handleUnlikeComment(e);
                  }}
                >
                  <span>{dataComent ? `${numberLike} thích` : "thích"}</span>
                </span>
              ) : (
                <span
                  onClick={(e) => {
                    handleLikeComment(e);
                  }}
                >
                  <span>{dataComent ? `${numberLike} thích` : "thích"}</span>
                </span>
              )}
            </div>
            <div style={{ marginLeft: "10%", cursor: "pointer" }}>
              <span
                onClick={(e) => {
                  handleDeleteComment(e);
                }}
              >
                xóa
              </span>
            </div>
            <div
              style={{ marginLeft: "10%", cursor: "pointer" }}
              onClick={handleExpandClick}
            >
              <span>phản hồi</span>
            </div>
          </div>
        </div>
      </div>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <div
          style={{
            width: "80%",
            // height: "400px",
            // overflow: "scroll",
            // overflowX: "hidden",
            marginTop: "10px",
            marginLeft: "15%",
            backgroundColor: "red",
          }}
        >
          {datarepComent?.map((item, index) => (
            <Rep_Comment datarepComent={item} key={index} />
          ))}
          <Paper
            component="form"
            sx={{
              width: "100%",
            }}
          >
            <TextField
              sx={{ width: "100%", outline:'none', border:'none' }}
              value={content}
              size="small"
              multiline
              maxRows={4}
              placeholder="Aa..."
              // onKeyDown={handleOnClickEnter}
              onChange={(e) => {
                setContent(e.target.value);
              }}
              // InputProps={{
              //   endAdornment: (
              //     <IconButton type="button">
              //       <TelegramIcon onClick={handleRepComnent} />
              //     </IconButton>
              //   ),
              // }}
            />
          </Paper>
        </div>
      </Collapse>
    </div>
  );
};

export default Comment;
