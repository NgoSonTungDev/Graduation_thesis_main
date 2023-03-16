import { yupResolver } from "@hookform/resolvers/yup";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ReplyIcon from "@mui/icons-material/Reply";
import TelegramIcon from "@mui/icons-material/Telegram";
import { Button, IconButton, Paper, Rating, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import { Image } from "antd";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import axiosClient from "../../../api/axiosClient";
import { momentLocale, toastify } from "../../../utils/common";
import Comment from "../comment";

const validationComment = yup.object().shape({
  content: yup.string().required("Comment không được để trống"),
});

const CardPost = ({ data }) => {
  const [like, setLike] = useState(false);
  const [numberLike, setNumberLike] = useState(0);
  const [expanded, setExpanded] = React.useState(false);
  const [dataComent, setDataComnet] = React.useState([]);
  const [content, setContent] = useState("");

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
        setDataComnet(res.data.data);
      })
      .catch((err) => {
        toastify("error", err.response.data.message || "Lỗi hệ thông !");
      });
  };

  const handleLikeReview = (e) => {
    e.stopPropagation();
    axiosClient
      .post(`/like-post/${data._id}`, {
        userId: "63fd6883ea9627ba24c33075",
      })
      .then((res) => {
        setLike(true);
        // toastify("success", res.data.message);
        setNumberLike(res.data.data);
      })
      .catch((err) => {
        setLike(false);
        // toastify("error", err.response.data.message || "Lỗi hệ thông !");
      });
  };
  const handleUnlikeReview = (e) => {
    e.stopPropagation();
    axiosClient
      .post(`/dis-like-post/${data._id}`, {
        userId: "63fd6883ea9627ba24c33075",
      })
      .then((res) => {
        setLike(false);
        // toastify("success", res.data.message);
        setNumberLike(res.data.data);
      })
      .catch((err) => {
        setLike(false);
        // toastify("error", err.response.data.message || "Lỗi hệ thông !");
      });
  };

  // const handleOnClickEnter = (e) => {
  //   e.stopPropagation()
  //   if (e.key === "Enter") {
  //     // handleComnent();
  //     setContent("");
  //   }
  // };

  const handleComnent = () => {
    axiosClient
      .post(`/comment/add/`, {
        userId: "63fd6883ea9627ba24c33075",
        content: content,
        dateTime: Number(new Date()),
        postId: data._id,
      })
      .then((res) => {
        // toastify("success", res.data.message);
        setDataComnet([...dataComent, res.data.data]);
        setContent("");
      })
      .catch((err) => {
        toastify("error", err.response.data.message || "Lỗi hệ thông !");
      });
  };

  const fetchData = () => {
    data?.like?.find((e) => {
      return e === "63fd6883ea9627ba24c33075";
    })
      ? setLike(true)
      : setLike(false);
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
              src={data?.userId?.avt}
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
                  {data?.userId?.userName}
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
            // height:"100%",
            marginLeft: "4%",
            paddingTop: "30px",
          }}
        >
          <Image width={"100%"} src={data.image} style={{ width: "100%" }} />
          {/* <img src={data.image} style={{ width: "92%" }} /> */}
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
                sx={{ kgroundColor: " green", color: "red", width: "100%" }}
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
                sx={{ width: "100%" }}
                onClick={(e) => {
                  handleLikeReview(e);
                }}
              >
                <FavoriteIcon
                  sx={{
                    padding: "7px",
                  }}
                />
                <span>{data ? `${numberLike} Thích` : "Thích"}</span>
              </Button>
            )}
          </div>
          <Button
            sx={{ width: "100%" }}
            component="label"
            onClick={handleExpandClick}
          >
            <ChatBubbleOutlineIcon sx={{ padding: "7px" }} />
            Bình luận
          </Button>
          <Button sx={{ width: "100%" }} component="label">
            <ReplyIcon sx={{ padding: "7px" }} />
            Chia sẻ
          </Button>
        </Box>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <div
            style={{
              width: "100%",
              // height: "400px",
              // overflow: "scroll",
              // overflowX: "hidden",
              marginTop: "10px",
            }}
          >
            {dataComent?.map((item, index) => (
              <Comment dataComent={item} key={index} />
            ))}
          </div>
        </Collapse>
        {dataComent?.length > 0 && (
          <div
            onClick={() => setExpanded((isShow) => !isShow)}
            style={{ textAlign: "center", cursor: "pointer" }}
          >
            <span>
              {expanded
                ? "Ẩn tất cả bình luận"
                : `Xem tất cả ${dataComent?.length || 0} bình luận`}
            </span>
          </div>
        )}

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
              src={data?.userId?.avt}
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
                error={!!errors?.content}
                {...register("content")}
                sx={{ width: "100%" }}
                value={content}
                size="small"
                multiline
                maxRows={4}
                placeholder="Aa..."
                // onKeyDown={handleOnClickEnter}
                onChange={(e) => {
                  setContent(e.target.value);
                }}
                helperText={errors.content?.message}
                InputProps={{
                  endAdornment: (
                    <IconButton type="button">
                      <TelegramIcon
                        disabled={!isDirty && !isValid}
                        onClick={handleSubmit(handleComnent)}
                      />
                    </IconButton>
                  ),
                }}
              />
            </Paper>
          </div>
        </div>
      </Box>
    </div>
  );
};

export default CardPost;
