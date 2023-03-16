import React, { useEffect, useState } from "react";
import axiosClient from "../../../api/axiosClient";
import { momentLocale, toastify } from "../../../utils/common";

const Rep_Comment = ({ datarepComent }) => {
  const [datarepComent1, setDataRepComment] = React.useState([]);
  const [numberLike, setNumberLike] = useState(0);
  const [like, setLike] = useState(false);

  const handleDeleteRepComment = (e) => {
    axiosClient
      .delete(`/rep-comment/delete/${datarepComent._id}`, {
        userId: "63fd6883ea9627ba24c33075",
      })
      .then((res) => {
        setDataRepComment(
          datarepComent1.filter((datarepComent) => datarepComent._id !== datarepComent._id)
        );
        toastify("success", res.data.message);
      })
      .catch((err) => {
        toastify("error", err.response.data.message || "Lỗi hệ thông !");
      });
  };
  const handleLikeRepComment = (e) => {
    axiosClient
      .post(`/like-rep-comment/${datarepComent._id}`, {
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

  const handleUnlikeRepComment = (e) => {
    axiosClient
      .post(`/dis-like-rep-comment/${datarepComent._id}`, {
        userId: "63fd6883ea9627ba24c33075",
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
    datarepComent?.like?.find((e) => {
      return e === "63fd6883ea9627ba24c33075";
    })
      ? setLike(true)
      : setLike(false);
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
        <div style={{}}>
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
            <div style={{ marginLeft: "10%", cursor: "pointer" }}>
              <span
                onClick={(e) => {
                  handleDeleteRepComment(e);
                }}
              >
                xóa
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rep_Comment;
