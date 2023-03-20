import { EnvironmentOutlined } from "@ant-design/icons";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Button } from "@mui/material";
import { Input, message, Rate } from "antd";
import axios from "axios";
import _ from "lodash";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosClient from "../../api/axiosClient";
import GetDataPlaceItem from "../../components/modle_find_place";
import Navbar from "../../components/navbar/index";
import { clearByIdPlace } from "../../redux/place/placeSlice";
import { DataPlaceById } from "../../redux/selectors";
import { toastify } from "../../utils/common";
import { getUserDataLocalStorage } from "../../utils/localstorage";
import "./index.scss";

const Review = () => {
  const desc = ["Tệ", "Khá tệ", "Trung bình", "Tốt", "Tuyệt vời"];
  const [content, setContent] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6at7RwZOM_yVpsUZWimO0o75bYbKAE1DaTg&usqp=CAU"
  );
  const [loading, setLoading] = useState(false);
  const [rate, setRate] = useState({
    rate: 4,
  });

  const dispatch = useDispatch();
  const dataPlace = useSelector(DataPlaceById);
  const userIdStorage = getUserDataLocalStorage();

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const addPost = (value) => {
    axiosClient
      .post("/post/add", {
        userId: userIdStorage,
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

  const handleSubmit = async () => {
    if (file === "" || content === "" || image === "") {
      message.error("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    const clientId = "90792b277ce19e4";

    const response = await axios.post(
      "https://api.imgur.com/3/image",
      formData,
      {
        headers: {
          Authorization: `Client-ID ${clientId}`,
          "Content-Type": "multipart/form-data"
        },
      }
    );

    console.log(response.data.data.link);

    // setLoading(true);
    // const formData = new FormData();
    // formData.append("image", file);
    // axios.post("https://api.imgur.com/3/image", formData, {
    //   headers: {
    //     Authorization: `Client-ID 90792b277ce19e4`,
    //   },
    // })
    //   .then((res) => {
    //     setLoading(false);
    //     // addPost(res.data.data.link);

    //     console.log(res.data);
    //   })
    //   .catch((error) => {
    //     setLoading(false);
    //     console.log(error);
    //   });
    // axiosDeploy
    //   .post("/upload/file", formData, {
    //     headers: { "Content-Type": "multipart/form-data" },
    //   })
    //   .then((res) => {
    //     setLoading(false);
    //     addPost(res.data.path);

    //     console.log(res);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  const handleChangeFileImage = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
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
      <div className="Review_Container">
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
                <Button variant="outlined" component="label" disabled={loading}>
                  Thêm ảnh
                  <input
                    type="file"
                    hidden
                    name="photo"
                    accept="image/*"
                    onChange={handleChangeFileImage}
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
