import React, { useRef, useState, useEffect } from "react";
import "./index.scss";
import Navbar from "../../components/navbar/index";
import { Button, Input, Rate } from "antd";
import axios from "axios";
import {
  CloseOutlined,
  CameraOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import PostModal from "./modal";
const Review = () => {
  const desc = ["Tệ", "Khá tệ", "Trung bình", "Tốt", "Tuyệt vời"];

  const [content, setContent] = useState("");

  const [file, setFile] = useState(null);
  const [image2, setImage2] = useState("");
  const [image, setImage] = useState("");
  const [time, setTime] = useState("");
  const [placeId, setPlaceId] = useState("");

  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const fileRef = useRef([]);

  const [rate, setRate] = useState({
    rate: 4,
  });

  const addPost = (e) => {
    axios
      .post("http://localhost:4000/api/post/add", {
        content: content,
        image: image,
        rating: rate,
        time: time,
        placeId: placeId,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = (e) => {
    const formData = new FormData();
    formData.append("photo", file);
    axios
      .post("http://localhost:4000/api/upload/file", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        setImage2(res.data.path);
        addPost(content, image, rate, time, placeId);
        console.log(data);
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

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (name, value) => {
    setRate((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const deleteImages = (index) => {
    const newArr = [...image];
    newArr.splice(index, 1);

    if (newArr.length === 0) {
      if (fileRef.current) {
        fileRef.current.value = null;
      }
    }

    setImage(newArr);
  };
  const fetchData = (url) => {
    axios
      .get(url)
      .then(function (response) {
        setData(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    let url = "http://localhost:4000/api/post/add";
    fetchData(url);
  }, []);

  return (
    <div>
      <Navbar />
      <div className="Review_Container" style={{ witdt: "50%" }}>
        <div className="header">
          <h1>Viết Review</h1>
        </div>
        <PostModal open={open} onClose={handleClose} />

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
          </div>
          <div className="review_left">
            <h3>Địa diểm</h3>
            <div className="review-select-place" onClick={handleOpen}>
              <span>
                <EnvironmentOutlined /> Nhấn vào đây để chọn địa điểm
              </span>
            </div>
          </div>
        </div>
        <div className="review-input" style={{ width: "50%" }}>
          <h3 className="title">Đánh giá của bạn</h3>
          <Input.TextArea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Nhập nội dung đánh giá"
            autoSize={{ minRows: 4, maxRows: 6 }}
          />
        </div>
        <div className="review-input">
          <Button
            onClick={() => {
              if (fileRef.current) {
                fileRef.current.click();
              }
            }}
            icon={<CameraOutlined />}
          >
            Thêm ảnh
          </Button>
          <input
            ref={fileRef}
            type="file"
            name="photo"
            multiple
            accept="image/*"
            hidden
            // onChange={handleUploadImage}
            onChange={(e) => handleChangeFileImage(e)}
          />
          <div className="show_images">
            {image && (
              <img
                style={{ width: "200px", display: "flex" }}
                src={image}
                alt=""
              />
            )}

            <div className="media-show">
              <div className="btn">
                <Button
                  icon={<CloseOutlined />}
                  onClick={() => deleteImages()}
                  type="primary"
                  danger
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          <Button
            style={{ backgroundColor: "red" }}
            onClick={handleSubmit}
            size="large"
            type="primary"
            shape="round"
          >
            Gửi đánh giá của bạn
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Review;
