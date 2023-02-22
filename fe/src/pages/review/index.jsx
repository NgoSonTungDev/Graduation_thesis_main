import {
  CameraOutlined,
  CloseOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { Button, Input, message, Rate } from "antd";
import React, { useRef, useState } from "react";
import "./index.scss";
import PostModal from "./modal";
const Review = () => {
  const desc = ["Tệ", "Khá tệ", "Trung bình", "Tốt", "Tuyệt vời"];
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [imageShow, setimageShow] = useState([]);
  const [videoShow, setvideoShow] = useState([]);
  const [placeSelected, setplaceSelected] = useState([]);

  const fileRef = useRef([]);

  const [rate, setRate] = useState({
    rateDrink: 5,
    ratePosition: 5,
    ratePrice: 5,
    rateService: 5,
    rateView: 5,
  });

  const [open, setOpen] = useState(false);

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

  const handleChangeImages = (e) => {
    const files = [...e.target.files];
    let error = "";
    let newImages = [];
    files.forEach((file) => {
      if (!file) {
        error = "File không tồn tại.";
        return;
      }
      if (file.size > 1024 * 1024 * 5) {
        // 1mb
        error = "File có dùng lượng quá 5mb.";
        return;
      }

      return newImages.push(file);
    });

    if (error) {
      message.error(error);
    }
    setImages([...images, ...newImages]);
  };

  const deleteImages = (index) => {
    const newArr = [...images];
    newArr.splice(index, 1);

    if (newArr.length === 0) {
      if (fileRef.current) {
        fileRef.current.value = null;
      }
    }

    setImages(newArr);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (images.length === 0 && !content) {
      message.error("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    if (!placeSelected) {
      message.error("Vui lòng chọn địa điểm để review");
      return;
    }
  };
  return (
    <div>
      <div className="Review_Container" style={{ witdt: "50%" }}>
        <div className="header">
          <h1>Viết Review</h1>
        </div>
        <PostModal open={open} />

        <div className="Review">
          <div className="review-input">
            <h3>Xếp hạng của bạn</h3>
            <div className="rate-item">
              <div className="rate-item-cate">Vị trí</div>
              <Rate
                style={{ color: "red", fontSize: 32 }}
                onChange={(value) => handleChange("ratePosition", value)}
                value={rate.ratePosition}
              />
              {rate.ratePosition ? (
                <div className="rate-type">
                  <div className="rate-type-text">
                    <span>{desc[rate.ratePosition - 1]}</span>
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
            <div className="rate-item">
              <div className="rate-item-cate">Không gian</div>
              <Rate
                style={{ color: "red", fontSize: 32 }}
                onChange={(value) => handleChange("rateView", value)}
                value={rate.rateView}
              />
              {rate.rateView ? (
                <div className="rate-type">
                  <div className="rate-type-text">
                    <span>{desc[rate.rateView - 1]}</span>
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
            <div className="rate-item">
              <div className="rate-item-cate">Đồ uống</div>
              <Rate
                style={{ color: "red", fontSize: 32 }}
                onChange={(value) => handleChange("rateDrink", value)}
                value={rate.rateDrink}
              />
              {rate.rateDrink ? (
                <div className="rate-type">
                  <div className="rate-type-text">
                    <span>{desc[rate.rateDrink - 1]}</span>
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
            <div className="rate-item">
              <div className="rate-item-cate">Phục vụ</div>
              <Rate
                style={{ color: "red", fontSize: 32 }}
                onChange={(value) => handleChange("rateService", value)}
                value={rate.rateService}
              />
              {rate.rateService ? (
                <div className="rate-type">
                  <div className="rate-type-text">
                    <span>{desc[rate.rateService - 1]}</span>
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
            <div className="rate-item">
              <div className="rate-item-cate">Giá cả</div>
              <Rate
                style={{ color: "red", fontSize: 32 }}
                onChange={(value) => handleChange("ratePrice", value)}
                value={rate.ratePrice}
              />
              {rate.ratePrice ? (
                <div className="rate-type">
                  <div className="rate-type-text">
                    <span>{desc[rate.ratePrice - 1]}</span>
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
            <div className="review-select-place">
              <button onClick={handleOpen}>submit</button>

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
            multiple
            accept="image/*"
            hidden
            onChange={handleChangeImages}
          />

          <div className="show_images">
            {images.map((img, index) => (
              <div key={index} className="media-show">
                {img.camera ? (
                  imageShow(img.camera)
                ) : img.url ? (
                  <>
                    {img.url.match(/video/i)
                      ? videoShow(img.url)
                      : imageShow(img.url)}
                  </>
                ) : (
                  <>
                    {img.type.match(/video/i)
                      ? videoShow(URL.createObjectURL(img))
                      : imageShow(URL.createObjectURL(img))}
                  </>
                )}
                <div className="btn">
                  <Button
                    icon={<CloseOutlined />}
                    onClick={() => deleteImages(index)}
                    type="primary"
                    danger
                  />
                </div>
              </div>
            ))}
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
