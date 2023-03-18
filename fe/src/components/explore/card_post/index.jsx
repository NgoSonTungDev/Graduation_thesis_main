import { yupResolver } from "@hookform/resolvers/yup";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ReplyIcon from "@mui/icons-material/Reply";
import TelegramIcon from "@mui/icons-material/Telegram";
import { Button, IconButton, Paper, Rating, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { Image } from "antd";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import axiosClient from "../../../api/axiosClient";
import { momentLocale, toastify } from "../../../utils/common";
import { getUserDataLocalStorage } from "../../../utils/localstorage";
import Comment from "../comment";

const validationComment = yup.object().shape({
  content: yup.string().required("Comment không được để trống"),
});

const CardPost = ({ data }) => {
  const [like, setLike] = useState(false);
  const [numberLike, setNumberLike] = useState(0);
  const [expanded, setExpanded] = React.useState(false);
  const [dataComment, setDataComment] = React.useState([]);
  const [content, setContent] = useState("");
  const userIdStorage = getUserDataLocalStorage();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm({
    resolver: yupResolver(validationComment),
  });

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
        })
        .catch((err) => {
          setLike(false);
          toastify("error", err.response.data.message || "Lỗi hệ thông !");
        });
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
      handleComment();
      setContent("");
      setExpanded(true);
    }
  };

  const handleComment = () => {
    axiosClient
      .post(`/comment/add/`, {
        userId: userIdStorage._id,
        content: content,
        dateTime: Number(new Date()),
        postId: data._id,
      })
      .then((res) => {
        // toastify("success", res.data.message);
        setDataComment([...dataComment, res.data.data]);
        setContent("");
      })
      .catch((err) => {
        toastify("error", err.response.data.message || "Lỗi hệ thông !");
      });
  };

  const handleShare = () => {
    axiosClient
      .post("/post/add", {
        userId: userIdStorage._id,
        content: data.content,
        image: data.image,
        rating: data.rating,
        time: Number(new Date()),
        placeId: data.placeId._id,
      })
      .then((res) => {
        handleClose();
        toastify("success", res.data.message || "Tạo bài thành công !");
      })
      .catch((err) => {
        toastify("error", err.response.data.message || "Lỗi hệ thông !");
      });
  };

  const fetchData = () => {
    if (userIdStorage) {
      data?.like?.find((e) => {
        return e === userIdStorage._id;
      })
        ? setLike(true)
        : setLike(false);
    } else {
      console.log("nmdsnfdsf");
      setLike(false);
    }
  };

  useEffect(() => {
    fetchData();
    setNumberLike(Number(data?.like.length));
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
        <div className="card_top" style={{ display: "flex", width: "100%" }}>
          <div
            className="avatar"
            style={{ width: "56px", height: "56px", marginLeft: "30px" }}
          >
            <img
              style={{ width: "100%", height: "100%", borderRadius: "50%" }}
              src={userIdStorage?.avt}
              alt=""
            />
          </div>
          <div className="container_right">
            <div
              className="container_name"
              style={{
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
        </div>
        <div
          className="text"
          style={{
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
          <Image width={"100%"} src={data.image} style={{ width: "100%" }} />
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
                <span>{data ? `${numberLike} Thích` : "Thích"}</span>
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
                <span>{data ? `${numberLike} Thích` : "Thích"}</span>
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
              width: "100%",
              alignItems: "center",
            }}
          >
            <div
              className="avatar"
              style={{ width: "56px", height: "56px", marginLeft: "40px" }}
            >
              <img
                style={{ width: "100%", height: "100%", borderRadius: "50%" }}
                src={userIdStorage?.avt}
                alt=""
              />
            </div>
            <div
              style={{
                width: "78%",
              }}
            >
              <Paper
                sx={{
                  marginLeft: "20px",
                  width: "100%",
                }}
              >
                <TextField
                  error={!!errors?.content}
                  {...register("content")}
                  sx={{ width: "100%", border: "none", outline: "none" }}
                  value={content}
                  size="small"
                  placeholder="Aa..."
                  onKeyDown={handleOnClickEnter}
                  onChange={(e) => {
                    setContent(e.target.value);
                  }}
                  helperText={errors.content?.message}
                  InputProps={{
                    endAdornment: (
                      <IconButton type="button">
                        <TelegramIcon
                          disabled={!isDirty && !isValid}
                          onClick={handleSubmit(handleComment)}
                        />
                      </IconButton>
                    ),
                  }}
                />
              </Paper>
            </div>
          </div>
        )}
      </Box>
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
          <Button onClick={handleShare}>chia sẻ</Button>
          <Button onClick={handleClose} autoFocus>
            thoát
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CardPost;
