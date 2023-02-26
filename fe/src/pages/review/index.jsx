import { EnvironmentOutlined } from "@ant-design/icons";
import { PhotoCamera } from "@mui/icons-material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Button, IconButton } from "@mui/material";
import { padding } from "@mui/system";
import { Input, Rate, message } from "antd";
import _ from "lodash";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosClient from "../../api/axiosClient";
import axiosDeploy from "../../api/axiosDeploy";
import GetDataPlaceItem from "../../components/modle_find_place";
import Navbar from "../../components/navbar/index";
import { clearByIdPlace } from "../../redux/place/placeSlice";
import { DataPlaceById } from "../../redux/selectors";
import { toastify } from "../../utils/common";
import "./index.scss";

const Review = () => {
  const desc = ["Tệ", "Khá tệ", "Trung bình", "Tốt", "Tuyệt vời"];
  const [content, setContent] = useState("");
  const dispatch = useDispatch();
  const dataPlace = useSelector(DataPlaceById);
  const [openModal, setOpenModal] = useState(false);

  console.log("dataplace", dataPlace);

  const [file, setFile] = useState(null);

  const [image, setImage] = useState("");

  const [loading, setLoading] = useState(false);

  const [rate, setRate] = useState({
    rate: 4,
  });

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const addPost = (value) => {
    axiosClient
      .post("/post/add", {
        userId: "phan tan phu",
        content: content,
        image: value,
        rating: rate.rate,
        time: Number(new Date()),
        placeId: dataPlace._id,
      })
      .then((res) => {
        toastify("success", res.data.message || "Tạo bài thành công !");
        setFile(null);
        setRate("");
        setImage("");
        dispatch(clearByIdPlace());
        setContent("");
      })
      .catch((err) => {
        toastify("error", err.response.data.message || "Lỗi hệ thông !");
      });
  };

  const handleSubmit = () => {
    if (file && !content && dataPlace) {
      message.error("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("photo", file);
    axiosDeploy
      .post("/upload/file", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        setLoading(false);
        addPost(res.data.path);

        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChangeFileImage = (e) => {
    const file = e.target.files[0];
    setImage(URL.createObjectURL(file));
    setFile(file);
  };

  const handleChange = (name, value) => {
    setRate((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <Navbar loading={loading} />
      <div className="Review_Container" style={{ witdt: "50%" }}>
        <div className="header">
          <h1>Viết Review</h1>
        </div>

        <div className="Review">
          <div className="review-input">
            <h3>Xếp hạng của bạn</h3>
            <div className="rate-item">
              <div className="rate-item-cate">Xếp hạng</div>
              <Rate
                style={{ color: "red", fontSize: 32 }}
                onChange={(value) => handleChange("rate", value)}
                value={rate.rate}
              />
              {rate.rate ? (
                <div className="rate-type">
                  <div className="rate-type-text">
                    <span>{desc[rate.rate - 1]}</span>
                  </div>
                </div>
              ) : (
                <div className="rate-type">
                  <div className="rate-type-text">
                    <span>Rất tệ</span>
                  </div>
                </div>
              )}
            </div>
            <div
              className="review-input"
              style={{ width: "90%", paddingTop: "40px" }}
            >
              <h3 className="title">Đánh giá của bạn</h3>
              <Input.TextArea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Nhập nội dung đánh giá"
                autoSize={{ minRows: 4, maxRows: 6 }}
              />
            </div>
          </div>

          <div className="review_left">
            <div>
              <h3>Địa diểm</h3>
              {_.isEmpty(dataPlace) ? (
                <div className="review-select-place" onClick={handleOpenModal}>
                  <span>
                    <EnvironmentOutlined /> Nhấn vào đây để chọn địa điểm
                  </span>
                </div>
              ) : (
                <div
                  style={{
                    width: "100%",
                    border: "0.1px solid #E5E5E5",
                    borderRadius: "10px",
                  }}
                >
                  <Button
                    sx={{
                      float: "right",
                    }}
                    component="label"
                    onClick={() => {
                      dispatch(clearByIdPlace());
                    }}
                  >
                    <HighlightOffIcon sx={{ paddingLeft: "5px" }} />
                  </Button>
                  <div
                    style={{
                      display: "flex",
                    }}
                  >
                    <div
                      style={{
                        width: "47%",
                      }}
                    >
                      <img
                        style={{
                          width: "100%",
                          height: "100%",
                          // paddingTop: "2px",
                          borderBottomLeftRadius: "10px",
                          borderTopLeftRadius: "10px",
                        }}
                        src={dataPlace.image[0]}
                      />
                    </div>
                    <div style={{ width: "53%", paddingLeft: "10px" }}>
                      <b>{dataPlace.name}</b>
                      <br />
                      <span>{dataPlace.address}</span>
                      <br />
                      <span>{dataPlace.rating}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="review-input" style={{ paddingTop: "20px" }}>
              <div className="show_images">
                {image && <img style={{ width: "225px" }} src={image} alt="" />}
              </div>
              <div style={{ display: "flex" }}>
                <Button variant="outlined" component="label">
                  Thêm ảnh
                  <input
                    type="file"
                    hidden
                    name="photo"
                    accept="image/*"
                    onChange={(e) => handleChangeFileImage(e)}
                  />
                </Button>
                <div style={{ marginLeft: "5px" }}>
                  <Button
                    variant="outlined"
                    onClick={handleSubmit}
                    disabled={loading}
                  >
                    Gửi đánh giá
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {openModal && (
        <GetDataPlaceItem openDialog={openModal} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default Review;
