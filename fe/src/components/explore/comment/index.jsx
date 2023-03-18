import { yupResolver } from "@hookform/resolvers/yup";
import TelegramIcon from "@mui/icons-material/Telegram";
import { Collapse, IconButton, Paper, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import axiosClient from "../../../api/axiosClient";
import { momentLocale, toastify } from "../../../utils/common";
import { getUserDataLocalStorage } from "../../../utils/localstorage";
import Rep_Comment from "../rep_comment";

const validationRepComment = yup.object().shape({
  content: yup.string().required("Comment không được để trống"),
});

const Comment = ({ dataComment, callBackApi }) => {
  const [numberLike, setNumberLike] = useState();
  const [like, setLike] = useState(false);
  const [datarepComent, setDataRepComment] = React.useState([]);
  const [expanded, setExpanded] = React.useState(false);
  const [content, setContent] = useState("");
  const navigation = useNavigate();
  const userIdStorage = getUserDataLocalStorage();
  const [data, setData] = useState([]);

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
    resolver: yupResolver(validationRepComment),
    mode: "all",
  });

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
      handleRepComment();
      setContent("");
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
          toastify("success", res.data.message);
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
          toastify("success", res.data.message);
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
            src={userIdStorage?.avt}
            alt=""
          />
        </div>
        <div
          style={{
            maxWidth: "85%",
          }}
        >
          <div
            style={{
              // width: "auto",
              boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
              marginLeft: "30px",
              padding: "5px",
              marginTop: "10px",
              borderRadius: "10px",
            }}
          >
            <div style={{ display: "flex", padding: "5px" }}>
              <div>{dataComment?.userId?.userName}</div>
              <div style={{ marginLeft: "40px" }}>
                {momentLocale(dataComment?.dateTime)}
              </div>
            </div>
            <div style={{ padding: "5px" }}>
              <span>{dataComment?.content}</span>
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
                  <span>{dataComment ? `${numberLike} thích` : "thích"}</span>
                </span>
              ) : (
                <span
                  onClick={(e) => {
                    handleLikeComment(e);
                  }}
                >
                  <span>{dataComment ? `${numberLike} thích` : "thích"}</span>
                </span>
              )}
            </div>
            {userIdStorage?._id === dataComment?.userId?._id && (
              <div style={{ marginLeft: "10%", cursor: "pointer" }}>
                <span onClick={handleClickOpen}>Xóa</span>
              </div>
            )}
            {userIdStorage && (
              <div
                style={{ marginLeft: "10%", cursor: "pointer" }}
                onClick={handleExpandClick}
              >
                <span>phản hồi</span>
              </div>
            )}
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
            <Paper
              component="form"
              sx={{
                width: "100%",
              }}
            >
              <TextField
                error={!!errors?.content}
                {...register("content")}
                sx={{ width: "100%", outline: "none", border: "none" }}
                value={content}
                size="small"
                multiline
                maxRows={4}
                placeholder="Aa...."
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
                        onClick={handleSubmit(handleRepComment)}
                      />
                    </IconButton>
                  ),
                }}
              />
            </Paper>
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
