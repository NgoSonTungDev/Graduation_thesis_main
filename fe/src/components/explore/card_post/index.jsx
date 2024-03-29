import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ReplyIcon from "@mui/icons-material/Reply";
import TelegramIcon from "@mui/icons-material/Telegram";
import { Button, IconButton, Rating, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { Image, message } from "antd";
import React, { useEffect, useState } from "react";
import axiosClient from "../../../api/axiosClient";
import ws from "../../../socket/index";
import { momentLocale, toastify } from "../../../utils/common";
import { getUserDataLocalStorage } from "../../../utils/localstorage";
import Comment from "../comment";

const CardPost = ({ data, callBackApi }) => {
  const [like, setLike] = useState(false);
  const [numberLike, setNumberLike] = useState(0);
  const [expanded, setExpanded] = React.useState(false);
  const [dataComment, setDataComment] = React.useState([]);
  const [content, setContent] = useState("");
  const userIdStorage = getUserDataLocalStorage();
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleClickOpen = () => {
    if (userIdStorage) {
      setOpen(true);
    } else {
      setOpen(false);
      message.error("Vui lòng đăng nhập để chia sẻ bài viết");
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const sendNotify = async (content) => {
    if (data.userId?.userName !== userIdStorage?.userName) {
      const NotifyData = {
        room: data.userId?._id,
        content: `${userIdStorage?.userName} ${content}`,
        status: true,
        dateTime: Number(new Date()),
      };

      ws.sendNotify(NotifyData);
    }
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
    axiosClient
      .get(`/comment/get-by-id-post/${data._id}`)
      .then((res) => {
        setDataComment(res.data.data);
      })
      .catch((err) => {
        toastify("error", err.response.data.message || "Lỗi hệ thông !");
      });
  };

  const handelDeleteComment = (id) => {
    setDataComment(
      dataComment.filter((e) => {
        return e._id !== id;
      })
    );
  };

  const handleLikeReview = (e) => {
    if (userIdStorage) {
      axiosClient
        .post(`/like-post/${data._id}`, {
          userId: userIdStorage?._id,
        })
        .then((res) => {
          setLike(true);
          setNumberLike(res.data.data);
          sendNotify("đã thích bài viết của bạn !!!");
        })
        .catch((err) => {
          setLike(false);
          toastify("error", err.response.data.message || "Lỗi hệ thông !");
        });
    } else {
      message.error("Vui lòng đăng nhập để like bài viết");
    }
  };
  const handleUnlikeReview = (e) => {
    axiosClient
      .post(`/dis-like-post/${data._id}`, {
        userId: userIdStorage?._id,
      })
      .then((res) => {
        setLike(false);
        setNumberLike(res.data.data);
      })
      .catch((err) => {
        setLike(false);
        toastify("error", err.response.data.message || "Lỗi hệ thông !");
      });
  };

  const handleOnClickEnter = (e) => {
    e.stopPropagation();
    if (e.key === "Enter") {
      if (content === "") {
        message.error("Vui lòng nhập bình luận của bạn");
      } else {
        handleComment();
        setExpanded(true);
      }
    }
  };

  const handleComment = (e) => {
    if (content === "") {
      message.error("Vui lòng nhập bình luận của bạn");
    } else {
      axiosClient
        .post(`/comment/add`, {
          userId: userIdStorage._id,
          content: content,
          dateTime: Number(new Date()),
          postId: data._id,
        })
        .then((res) => {
          setDataComment([...dataComment, res.data.data]);
          setContent("");
          sendNotify("đã bình luận bài viết của bạn !!!");
        })
        .catch((err) => {
          toastify("error", err.response.data.message || "Lỗi hệ thông !");
        });
    }
  };

  const handleShare = () => {
    axiosClient
      .post("/post/add", {
        userId: userIdStorage._id,
        content: data.content,
        image: data.image,
        public: true,
        rating: data.rating,
        time: Number(new Date()),
        placeId: data.placeId._id,
      })
      .then((res) => {
        toastify("success",  "Chia sẻ bài viết thành công !!!");
        handleClose();
        sendNotify("đã chia sẻ bài viết của bạn !!!");
      })
      .catch((err) => {
        handleClose();
        toastify("error", err.response.data.message || "Lỗi hệ thông !");
      });
  };

  const handleDeletePost = (e) => {
    axiosClient
      .delete(`/post/delete/${data._id}`)
      .then((res) => {
        handleCloseDelete();
        toastify("success", res.data.message || "Xoá bài thành công !");
        callBackApi(data._id);
      })
      .catch((err) => {
        toastify("error", err.response.data.message || "Lỗi hệ thông !");
      });
  };

  const fetchData = () => {
    // if (_.isEmpty(data?.like)) return setLike(false);
    if (userIdStorage) {
      data?.like?.find((e) => {
        return e === userIdStorage._id;
      })
        ? setLike(true)
        : setLike(false);
    } else {
      setLike(false);
    }
    setNumberLike(data.like.length);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div style={{ width: "100%" }}>
      <Box
        sx={{
          width: "100%",
          boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
          padding: "15px 0",
          marginTop: "10px",
          backgroundColor: "#ffffff",
          borderRadius: "10px",
        }}
      >
        <div
          className="card_top"
          style={{
            display: "flex",
            width: "100%",
            position: "relative",
          }}
        >
          <div>
            <div
              className="avatar"
              style={{ width: "56px", height: "56px", marginLeft: "30px" }}
            >
              <Image
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
                src={
                  data.userId
                    ? data?.userId?.avt
                    : "https://ss-images.saostar.vn/wp700/pc/1613810558698/Facebook-Avatar_3.png"
                }
                alt=""
              />
            </div>
          </div>
          <div className="container_right">
            <div
              className="container_name"
              style={{
                width: "100%",
                marginLeft: "10px",
                display: "flex",
                fontWeight: "500",
                fontSize: "16px",
              }}
            >
              <div>
                <span style={{ textTransform: "capitalize" }}>
                  {data?.userId?.userName
                    ? data?.userId?.userName
                    : "Người dùng Mafline"}
                </span>
              </div>
              <div>
                <ArrowRightIcon sx={{ paddingTop: "0px" }} />
              </div>
              <div>{data?.placeId?.name}</div>
            </div>
            <div
              className="container_rating"
              style={{ marginLeft: "10px", display: "flex" }}
            >
              <Box
                sx={{
                  width: 130,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {data?.rating}
                <Rating
                  style={{ marginLeft: "5px" }}
                  name="hover-feedback"
                  value={data.rating}
                  precision={0.5}
                  size="small"
                />
              </Box>
              <div style={{ marginLeft: "0px" }}>
                {momentLocale(data?.time)}
              </div>
            </div>
          </div>
          {userIdStorage?._id === data?.userId?._id && (
            <div style={{ position: "absolute", right: "20px" }}>
              <IconButton onClick={handleClickOpenDelete}>
                <CloseOutlinedIcon />
              </IconButton>
            </div>
          )}
        </div>
        <div
          className="text"
          style={{
            width: "92%",
            paddingTop: "10px",
            marginLeft: "30px",
          }}
        >
          <span>{data.content}</span>
        </div>
        <div
          className="image"
          style={{
            width: "92%",
            marginLeft: "4%",
            paddingTop: "30px",
          }}
        >
          <Image
            width={"100%"}
            src={data.image}
            style={{ width: "100%", borderRadius: "5px" }}
          />
        </div>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            textAlign: "center",
          }}
        >
          <div style={{ width: "100%" }}>
            {like ? (
              <Button
                sx={{ color: "red", width: "100%" }}
                onClick={(e) => {
                  handleUnlikeReview(e);
                }}
              >
                <FavoriteIcon
                  sx={{
                    color: "red",
                    padding: "7px",
                  }}
                />
                <span>Đã thích ({numberLike}) </span>
              </Button>
            ) : (
              <Button
                sx={{ width: "100%", color: "#000000" }}
                onClick={(e) => {
                  handleLikeReview(e);
                }}
              >
                <FavoriteIcon
                  sx={{
                    padding: "7px",
                    color: "#000000",
                  }}
                />
                <span>Thích ({numberLike}) </span>
              </Button>
            )}
          </div>
          <Button
            sx={{ width: "100%", color: "#000000" }}
            component="label"
            onClick={handleExpandClick}
          >
            <ChatBubbleOutlineIcon sx={{ padding: "7px", color: "#000000" }} />
            Bình luận
          </Button>
          <Button
            sx={{ width: "100%", color: "#000000" }}
            component="label"
            onClick={handleClickOpen}
          >
            <ReplyIcon sx={{ padding: "7px", color: "#000000" }} />
            Chia sẻ
          </Button>
        </Box>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <div
            style={{
              width: "93%",
              marginLeft: "3.5%",
              paddingBottom: 5,
            }}
          >
            {dataComment?.map((item, index) => (
              <Comment
                dataComment={item}
                callBackApi={handelDeleteComment}
                postId={data._id}
                key={index}
              />
            ))}
          </div>
        </Collapse>
        {dataComment?.length > 0 && (
          <div
            onClick={() => setExpanded((isShow) => !isShow)}
            style={{ textAlign: "center", cursor: "pointer" }}
          >
            <span>{expanded && "Ẩn tất cả bình luận"}</span>
          </div>
        )}

        {userIdStorage && (
          <div
            className="comment"
            style={{
              display: "flex",
              width: "92%",
              marginLeft: "4%",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ width: "46px", height: "46px" }}>
              <img
                style={{
                  width: "46px",
                  height: "46px",
                  borderRadius: "50%",
                  objectFit: "center",
                }}
                src={userIdStorage?.avt}
                alt=""
              />
            </div>

            <TextField
              sx={{ width: "90%" }}
              value={content}
              size="small"
              placeholder="Aa..."
              onKeyDown={handleOnClickEnter}
              onChange={(e) => {
                setContent(e.target.value);
              }}
              InputProps={{
                endAdornment: (
                  <IconButton type="button">
                    <TelegramIcon onClick={handleComment} />
                  </IconButton>
                ),
              }}
            />
          </div>
        )}
      </Box>
      <Dialog
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Bạn có chắc muốn xóa bài viết ?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseDelete} autoFocus>
            thoát
          </Button>
          <Button onClick={handleDeletePost}>xóa</Button>
        </DialogActions>
      </Dialog>
      {/* deleteshare */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Bạn có chắc muốn chia sẻ ?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            thoát
          </Button>
          <Button onClick={handleShare}>chia sẻ</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CardPost;
