import React, { useState, useEffect } from "react";
import axiosClient from "../../api/axiosClient";
import { formatDate, toastify } from "../../utils/common";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { DataPlaceById } from "../../redux/selectors";
// import { formatDate } from "../../../utils/common";
import qs from "query-string";
import _ from "lodash";
import moment from "moment";
import { useNavigate } from "react-router";
import MapData from "./data favourite";

const Favourite = ({ data }) => {
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
  const handleFavourite = (e) => {
    // e.stopPropagation();
    axiosClient
      .post(`/favourite-place/${data._id}`, {
        userId: "63fcc3b2ebe41cb6c68dd48e",
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

  useEffect(() => {
    data?.favourite?.find((e) => {
      return e === "63fcc3b2ebe41cb6c68dd48e";
    })
      ? setCheck(true)
      : setCheck(false);
  }, []);

  return (
    <div>
      <Navbar loading={loading} valueTab={"four"} />
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
      ></div>
      <div className="place_item_image">
        <img src={data?.image[0]} alt="" />
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
      <Footer />
    </div>
  );
};
export default Favourite;
