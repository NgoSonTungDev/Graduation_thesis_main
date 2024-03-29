import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import React, { useEffect, useState } from "react";
import { formatDate, formatMoney, toastify } from "../../../utils/common";
import "./style.scss";
import axiosClient from "../../../api/axiosClient";
import moment from "moment";
import { useNavigate } from "react-router";
import { getUserDataLocalStorage } from "../../../utils/localstorage";

const PlaceItem = ({ data }) => {
  const [check, setCheck] = useState(false);
  const navigate = useNavigate();
  const userIdStorage = getUserDataLocalStorage();

  const renderItemCheckTime = (open, close) => {
    const start = moment(open).format("HH:mm");
    const end = moment(close).format("HH:mm");
    const check2 = moment(new Date()).format("HH:mm");

    const isCheckBetweenStartAndEnd = moment(check2, "HH:mm").isBetween(
      moment(start, "HH:mm"),
      moment(end, "HH:mm")
    );

    if (isCheckBetweenStartAndEnd) {
      return (
        <span style={{ marginLeft: "5px", color: "#2ecc71" }}>
          Đang mở cửa{" "}
        </span>
      );
    } else {
      return (
        <span style={{ marginLeft: "5px", color: "#c0392b" }}>
          Đang đóng cửa{" "}
        </span>
      );
    }
  };

  const handleFavourite = (e) => {
    // e.stopPropagation();
    axiosClient
      .post(`/favourite-place/${data._id}`, {
        userId: userIdStorage._id,
      })
      .then((res) => {
        setCheck(true);
        toastify("success", res.data.message);
      })
      .catch((err) => {
        setCheck(false);
        toastify("error", err.response.data.message || "Lỗi hệ thông !");
      });
  };

  const handleDisFavourite = (e) => {
    // e.stopPropagation();
    axiosClient
      .post(`/dis-favourite-place/${data._id}`, {
        userId: "63fcc3b2ebe41cb6c68dd48e",
      })
      .then((res) => {
        setCheck(false);
        toastify("success", res.data.message);
      })
      .catch((err) => {
        toastify("error", err.response.data.message || "Lỗi hệ thông !");
      });
  };

  useEffect(() => {
    data?.favourite?.find((e) => {
      return e === "63fcc3b2ebe41cb6c68dd48e";
    })
      ? setCheck(true)
      : setCheck(false);
  }, []);

  return (
    <div
      style={{
        width: "100%",
        padding: "15px 0",
        margin: "20px 0",
        boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        cursor: "pointer",
      }}
      onClick={() => {
        navigate(`/place/${data._id}`);
      }}
    >
      <div className="place_item_image">
        <img src={data?.image[0]} alt="" />
      </div>
      <div
        style={{
          marginLeft: "15px",
          width: "60%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <div
          style={{
            fontSize: "20px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          <b>{data.name}</b>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <span>Đánh giá : </span>
          <Box
            sx={{
              width: 200,
              display: "flex",
              alignItems: "center",
              marginLeft: "10px",
            }}
          >
            <Rating
              name="hover-feedback"
              value={data.rating}
              precision={0.5}
              size="small"
            />
          </Box>
          <span>({data.rating.toFixed(1)})</span>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <span> Khoảng giá :</span>
          <span style={{ marginLeft: "5px" }}>
            {formatMoney(data.startingPrice)} - {formatMoney(data.LastPrice)}
          </span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <span style={{ whiteSpace: "pre" }}>Địa chỉ :</span>
          <span
            style={{
              marginLeft: "5px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {data.address}
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <span> Trạng thái :</span>
          {renderItemCheckTime(data.openTime, data.closeTime)}
          <span
            style={{
              marginLeft: "10px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <AccessTimeOutlinedIcon
              fontSize="small"
              sx={{ paddingRight: "5px" }}
            />
            {formatDate(data.openTime, "HH:mm")} -{" "}
            {formatDate(data.closeTime, "HH:mm")}
          </span>
        </div>
      </div>

      {userIdStorage && (
        <div style={{ marginLeft: "8px" }}>
          {check ? (
            <IconButton
              sx={{ backgroundColor: " #ff0000", color: "#fff" }}
              onClick={(e) => {
                e.stopPropagation();
                handleDisFavourite(e);
              }}
            >
              <FavoriteBorderIcon />
            </IconButton>
          ) : (
            <IconButton
              sx={{ border: "1px solid #ff0000", color: "#ff0000" }}
              onClick={(e) => {
                e.stopPropagation();
                handleFavourite(e);
              }}
            >
              <FavoriteBorderIcon />
            </IconButton>
          )}
        </div>
      )}
    </div>
  );
};

export default PlaceItem;
