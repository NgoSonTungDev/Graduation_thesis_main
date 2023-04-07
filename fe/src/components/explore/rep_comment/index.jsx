import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import React, { useEffect, useState } from "react";
import axiosClient from "../../../api/axiosClient";
import { momentLocale, toastify } from "../../../utils/common";
import { getUserDataLocalStorage } from "../../../utils/localstorage";

const Rep_Comment = ({ datarepComent, callBackApi }) => {
  const [numberLike, setNumberLike] = useState(0);
  const [like, setLike] = useState(false);
  const userIdStorage = getUserDataLocalStorage();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteRepComment = (e) => {
    axiosClient
      .delete(`/rep-comment/delete/${datarepComent._id}`, {
        userId: userIdStorage._id,
      })
      .then((res) => {
        // toastify("success", res.data.message);
        handleClose();
        callBackApi(datarepComent._id);
      })
      .catch((err) => {
        toastify("error", err.response.data.message || "Lỗi hệ thông !");
      });
  };

  const handleLikeRepComment = (e) => {
    if (userIdStorage) {
      axiosClient
        .post(`/like-rep-comment/${datarepComent._id}`, {
          userId: userIdStorage?._id,
        })
        .then((res) => {
          setLike(true);
          // toastify("success", res.data.message);
          setNumberLike(res.data.data);
          console.log("resssss", res);
        })
        .catch((err) => {
          setLike(false);
          toastify("error", err.response.data.message || "Lỗi hệ thông !");
        });
    }
  };

  const handleUnlikeRepComment = (e) => {
    if (userIdStorage) {
      axiosClient
        .post(`/dis-like-rep-comment/${datarepComent._id}`, {
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

  const fetchData = () => {
    if (userIdStorage) {
      datarepComent?.like?.find((e) => {
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
    setNumberLike(Number(datarepComent?.like.length));
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
          }}
        >
          <img
            style={{ width: "100%", height: "100%", borderRadius: "50%" }}
            src={datarepComent?.userId?.avt}
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
                {datarepComent?.userId?.userName}
              </b>
            </div>
            <div style={{ padding: "5px" }}>
              <span>{datarepComent?.content}</span>
            </div>
          </div>
          <div
            style={{
              width: "35%",
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
                    handleUnlikeRepComment(e);
                  }}
                >
                  Đã thích ({numberLike})
                </span>
              ) : (
                <span
                  onClick={(e) => {
                    handleLikeRepComment(e);
                  }}
                >
                  thích ({numberLike})
                </span>
              )}
            </div>
            {userIdStorage?._id === datarepComent?.userId?._id && (
              <div style={{ cursor: "pointer" }}>
                <span onClick={handleClickOpen}>Xóa</span>
              </div>
            )}
            <span>{momentLocale(datarepComent?.dateTime)}</span>
          </div>
        </div>
      </div>
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
          <Button onClick={handleDeleteRepComment}>xóa</Button>
          <Button onClick={handleClose} autoFocus>
            thoát
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Rep_Comment;
