import TelegramIcon from "@mui/icons-material/Telegram";
import { Collapse, IconButton, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { message } from "antd";
import React, { useEffect, useState } from "react";
import axiosClient from "../../../api/axiosClient";
import { momentLocale, toastify } from "../../../utils/common";
import { getUserDataLocalStorage } from "../../../utils/localstorage";
import Rep_Comment from "../rep_comment";

const Comment = ({ dataComment, callBackApi }) => {
  const [numberLike, setNumberLike] = useState();
  const [like, setLike] = useState(false);
  const [datarepComent, setDataRepComment] = React.useState([]);
  const [expanded, setExpanded] = React.useState(false);
  const [content, setContent] = useState("");
  const userIdStorage = getUserDataLocalStorage();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
    axiosClient
      .get(`/rep-comment/get-by-id/${dataComment._id}`)
      .then((res) => {
        setDataRepComment(res.data.data);
      })
      .catch((err) => {
        toastify("error", err.response.data.message || "Lỗi hệ thông !");
      });
  };

  const handelRepDeleteComment = (id) => {
    setDataRepComment(
      datarepComent.filter((e) => {
        return e._id !== id;
      })
    );
  };

  const handleOnClickEnter = (e) => {
    e.stopPropagation();
    if (e.key === "Enter") {
      if (content === "") {
        message.error("Vui lòng nhập comment!");
      } else {
        handleRepComment();
        setExpanded(true);
      }
    }
  };

  const handleLikeComment = (e) => {
    if (userIdStorage) {
      axiosClient
        .post(`/like-comment/${dataComment._id}`, {
          userId: userIdStorage?._id,
        })
        .then((res) => {
          setLike(true);
          // toastify("success", res.data.message);
          setNumberLike(res.data.data);
        })
        .catch((err) => {
          setLike(false);
          toastify("error", err.response.data.message || "Lỗi hệ thông !");
        });
    }
  };

  const handleUnlikeComment = (e) => {
    if (userIdStorage) {
      axiosClient
        .post(`/dis-like-comment/${dataComment._id}`, {
          userId: userIdStorage?._id,
        })
        .then((res) => {
          setLike(false);
          // toastify("success", res.data.message);
          setNumberLike(res.data.data);
        })
        .catch((err) => {
          setLike(false);
          toastify("error", err.response.data.message || "Lỗi hệ thông !");
        });
    }
  };

  const handleDeleteComment = (e) => {
    axiosClient
      .delete(`/comment/delete/${dataComment._id}`, {
        userId: userIdStorage._id,
      })
      .then((res) => {
        toastify("success", res.data.message);
        handleClose();
        callBackApi(dataComment._id);
      })
      .catch((err) => {
        toastify("error", err.response.data.message || "Lỗi hệ thông !");
      });
  };

  const handleRepComment = (e) => {
    if (content === "") {
      message.error("Vui lòng nhập comment!");
    } else {
      axiosClient
        .post(`/rep-comment/add`, {
          userId: userIdStorage._id,
          content: content,
          dateTime: Number(new Date()),
          commentId: dataComment._id,
        })
        .then((res) => {
          toastify("success", res.data.message);
          setDataRepComment([...datarepComent, res.data.data]);
          setContent("");
        })
        .catch((err) => {
          toastify("error", err.response.data.message || "Lỗi hệ thông !");
        });
    }
  };

  const fetchData = () => {
    if (userIdStorage && userIdStorage._id) {
      dataComment?.like?.find((e) => {
        return e === userIdStorage._id;
      })
        ? setLike(true)
        : setLike(false);
    } else {
      setLike(false);
    }
  };

  useEffect(() => {
    fetchData();
    setNumberLike(Number(dataComment?.like.length));
  }, []);

  return (
    <div>
      <div
        style={{
          width: "100%",
          display: "flex",
          marginTop: "5px",
        }}
      >
        <div
          style={{
            width: "50px",
            height: "50px",
          }}
        >
          <img
            style={{ width: "100%", height: "100%", borderRadius: "50%" }}
            src={dataComment?.userId?.avt}
            alt=""
          />
        </div>
        <div
          style={{
            width: "100%",
          }}
        >
          <div
            style={{
              boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
              marginLeft: "10px",
              padding: "5px",
              borderRadius: "10px",
            }}
          >
            <div style={{ display: "flex", padding: "5px" }}>
              <b style={{ textTransform: "capitalize" }}>
                {dataComment?.userId?.userName}
              </b>
            </div>
            <div style={{ padding: "5px" }}>
              <span>{dataComment?.content}</span>
            </div>
          </div>
          <div
            style={{
              width: "40%",
              paddingBottom: "3%",
              marginLeft: "15px",
              display: "flex",
              padding: "5px",
              justifyContent: "space-between",
              fontSize: 13,
            }}
          >
            <div style={{ cursor: "pointer" }}>
              {like ? (
                <span
                  style={{ color: "#3498db" }}
                  onClick={(e) => {
                    handleUnlikeComment(e);
                  }}
                >
                  Đã thích ({numberLike})
                </span>
              ) : (
                <span
                  onClick={(e) => {
                    handleLikeComment(e);
                  }}
                >
                  thích ({numberLike})
                </span>
              )}
            </div>

            {userIdStorage?._id === dataComment?.userId?._id && (
              <div style={{ cursor: "pointer" }}>
                <span onClick={handleClickOpen}>Xóa</span>
              </div>
            )}

            {userIdStorage && (
              <div style={{ cursor: "pointer" }} onClick={handleExpandClick}>
                <span>phản hồi</span>
              </div>
            )}
            <span>{momentLocale(dataComment?.dateTime)}</span>
          </div>
        </div>
      </div>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <div
          style={{
            width: "90%",
            marginTop: "10px",
            marginLeft: "10%",
          }}
        >
          {datarepComent?.map((item, index) => (
            <Rep_Comment
              datarepComent={item}
              callBackApi={handelRepDeleteComment}
              key={index}
            />
          ))}
          {userIdStorage && (
            <div
              className="comment"
              style={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div className="avatar" style={{ width: "56px", height: "56px" }}>
                <img
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    objectFit: "center",
                  }}
                  src={userIdStorage?.avt}
                  alt=""
                />
              </div>

              <TextField
                sx={{ width: "86%" }}
                value={content}
                size="small"
                placeholder="Aa...."
                onKeyDown={handleOnClickEnter}
                onChange={(e) => {
                  setContent(e.target.value);
                }}
                InputProps={{
                  endAdornment: (
                    <IconButton type="button">
                      <TelegramIcon onClick={handleRepComment} />
                    </IconButton>
                  ),
                }}
              />
            </div>
          )}
        </div>
      </Collapse>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Bạn có chắc muốn xóa ?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleDeleteComment}>xóa</Button>
          <Button onClick={handleClose} autoFocus>
            thoát
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Comment;
