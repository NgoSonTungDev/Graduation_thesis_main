import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import React, { useEffect, useState } from "react";
import axiosClient from "../../../api/axiosClient";
import { momentLocale, toastify } from "../../../utils/common";
import { getUserDataLocalStorage } from "../../../utils/localstorage";

const Rep_Comment = ({ datarepComent,callBackApi }) => {
  const [datarepComent1, setDataRepComment] = React.useState([]);
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
          toastify("success", res.data.message);
          handleClose();
          callBackApi(datarepComent._id)

        })
        .catch((err) => {
          toastify("error", err.response.data.message || "Lỗi hệ thông !");
        });
    
  };
  const handleLikeRepComment = (e) => {
    axiosClient
      .post(`/like-rep-comment/${datarepComent._id}`, {
        userId: userIdStorage._id,
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

  const handleUnlikeRepComment = (e) => {
    axiosClient
      .post(`/dis-like-rep-comment/${datarepComent._id}`, {
        userId: userIdStorage._id,
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
          width: "90%",
          marginLeft: "10%",
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
        <div
          style={{
            maxWidth: "85%",
          }}
        >
          <div
            style={{
              //   width: "90%",
              boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
              marginLeft: "30px",
              marginTop: "10px",
              padding: "5px",
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
              padding: "5px",
              marginLeft: "10%",
            }}
          >
            <div style={{ cursor: "pointer" }}>
              {like ? (
                <span
                  onClick={(e) => {
                    handleUnlikeRepComment(e);
                  }}
                >
                  <span>
                    {datarepComent1 ? `${numberLike} Thích` : "Thích"}
                  </span>
                </span>
              ) : (
                <span
                  onClick={(e) => {
                    handleLikeRepComment(e);
                  }}
                >
                  <span>
                    {datarepComent1 ? `${numberLike} Thích` : "Thích"}
                  </span>
                </span>
              )}
            </div>
            {userIdStorage?._id === datarepComent?.userId?._id && (
              <div style={{ marginLeft: "10%", cursor: "pointer" }}>
                <span onClick={handleClickOpen}>Xóa</span>
              </div>
            )}
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
