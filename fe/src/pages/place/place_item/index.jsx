import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import React from "react";
import { formatDate, formatMoney } from "../../../utils/common";
import "./style.scss";

const PlaceItem = ({ data }) => {
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
          <span> Giá vé :</span>
          <span style={{ marginLeft: "5px" }}>
            {formatMoney(data.childTicket)} - {formatMoney(data.adultTicket)}
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
          {Number(new Date().getTime()) > data.openTime &&
          Number(new Date().getTime()) < data.closeTime ? (
            <span style={{ marginLeft: "5px", color: "#2ecc71" }}>
              Đang mở cửa{" "}
            </span>
          ) : (
            <span style={{ marginLeft: "5px", color: "#c0392b" }}>
              Đang đóng cửa{" "}
            </span>
          )}
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
            {formatDate(data.openTime, "HH:MM")} -{" "}
            {formatDate(data.closeTime, "HH:MM")}
          </span>
        </div>
      </div>
      <div style={{ marginLeft: "8px" }}>
        <IconButton sx={{ border: "1px solid #ff0000", color: "#ff0000" }}>
          <FavoriteBorderIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default PlaceItem;