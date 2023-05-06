import { CloseOutlined } from "@ant-design/icons";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import { IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import moment from "moment";
import { useNavigate } from "react-router";
import React, { useState } from "react";
import { formatDate, formatMoney, toastify } from "../../../utils/common";
import { getUserDataLocalStorage } from "../../../utils/localstorage";
import axiosClient from "../../../api/axiosClient";

const Favourite_Item = ({ data, deleteData }) => {
  const userIdStorage = getUserDataLocalStorage();
  const [favorite, setFavorite] = useState("");
  const [check, setCheck] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
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

  const handleDelete = (e) => {
    setLoading(true);
    axiosClient
      .delete(`/favourite/delete/${data._id}`)
      .then((res) => {
        setLoading(false);
        toastify("success", res.data.message || "Xóa thành công !");
        deleteData(data._id);
      })
      .catch((err) => {
        setLoading(false);
        toastify("error", err.response.data.message || "Lỗi hệ thông !");
      });
  };
  return (
    <div
      style={{
        // paddingLeft: "165px",
        justifyContent: "center",
        display: "flex",
        marginLeft: "70px",
        width: "95%",
      }}
    >
      <div
        style={{
          paddingLeft: "250px",
          width: "100%",
        }}
      >
        <div
          style={{
            width: "70%",
            padding: "15px 0",
            margin: "10px 0",
            boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
            display: "flex",
            alignItems: "center",
            overflow: "hidden",
            paddingLeft: "50px",
            cursor: "pointer",
          }}
          onClick={() => {
            navigate(`/place/${data.placeId._id}`);
          }}
        >
          <div className="place_item_image">
            <img
              src={data.placeId.image?.length ? data.placeId.image[0] : ""}
              alt=""
            />
          </div>

          <div
            style={{
              marginLeft: "25px",
              width: "50%",
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
              <b>{data.placeId.name}</b>
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
                  value={data.placeId.rating}
                  precision={0.5}
                  size="small"
                />
              </Box>
              <span>({data.placeId.rating.toFixed(1)})</span>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <span> Khoảng giá :</span>
              <span style={{ marginLeft: "5px" }}>
                {formatMoney(data.placeId.startingPrice)} -{" "}
                {formatMoney(data.placeId.LastPrice)}
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
                {data.placeId.address}
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <span> Trạng thái :</span>
              {renderItemCheckTime(
                data.placeId.openTime,
                data.placeId.closeTime
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
                  sx={{ paddingRight: "10px" }}
                />
                {formatDate(data.placeId.openTime, "HH:mm")} -{" "}
                {formatDate(data.placeId.closeTime, "HH:mm")}
              </span>
            </div>
          </div>

          {userIdStorage && (
            <IconButton
              sx={{
                border: "1px solid #ff0000",
                color: "#ff0000",
                marginRight: "50px",
              }}
              onClick={(e) => {
                e.stopPropagation();
                // handleFavourite(e);
                handleDelete(e);
              }}
            >
              <CloseOutlined />
            </IconButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default Favourite_Item;
