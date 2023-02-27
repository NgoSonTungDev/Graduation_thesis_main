import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import { IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import React from "react";
import { formatMoney, take_decimal_number } from "../../../utils/common";
import "./style.scss";

const PlaceItem = ({ data }) => {
  return (
    <div
      style={{
        width: "100%",
        height: "200px",
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
        <div style={{ fontSize: "20px", marginTop: "15px" }}>
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
          <span>({take_decimal_number(data.rating, 1)})</span>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <PaidOutlinedIcon />
          <span style={{ marginLeft: "5px" }}>
            {formatMoney(data.childTicket)} - {formatMoney(data.adultTicket)}
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <LocationOnOutlinedIcon />
          <span style={{ marginLeft: "5px" }}>{data.address}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <AccessTimeOutlinedIcon />
          <span style={{ marginLeft: "5px" }}>50000</span>
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
