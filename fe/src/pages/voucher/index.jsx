import React, { useState, useEffect } from "react";
import "./style.scss";
import axiosClient from "../../api/axiosClient";
import MapData from "./data_vocher";
import { toastify } from "../../utils/common";
import anh1 from "./images/anh.svg";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import { Button } from "@mui/material";
import GetDataPlaceItem from "../../components/modle_find_place";
import { useSelector } from "react-redux";
import { DataPlaceById } from "../../redux/selectors";
import qs from "query-string";

const Voucher = () => {
  const [openModal, setOpenModal] = useState(false);
  const placeId = useSelector(DataPlaceById);
  const [data, setData] = React.useState([]);

  const handleOpenPlaceItem = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const getApiVocher = () => {
    axiosClient
      .get(`voucher/get-all?${qs.stringify({ placeID: placeId._id })}`)
      .then((res) => {
        setData(res.data.data);
        console.log("vocher", res.data.data);
      })
      .catch((err) => {
        toastify("error", err.response.data.message || "Lỗi hệ thông !");
      });
  };

  useEffect(() => {
    getApiVocher();
  }, [placeId]);

  return (
    <div>
      <Navbar />
      <div
        style={{
          width: "100%",
        }}
      >
        <div
          className="container_voucher"
          style={{
            display: "flex",
            width: "100%",
            background: "rgb(215,0,22)",
            background:
              "linear-gradient(180deg, rgba(215,0,22,0.8352591036414566) 0%, rgba(215,0,6,0.7904411764705882) 31%, rgba(255,0,0,0.5691526610644257) 72%)",
          }}
        >
          <div
            className="left"
            style={{ width: "80%", marginLeft: "10%", paddingTop: "60px" }}
          >
            <div>
              <b style={{ fontSize: 30 }}>Cập nhật khuyến mãi hiện hành</b>
            </div>
            <div>
              <span style={{ fontSize: 18 }}>
                Bạn đang tìm kiếm một góc cafe để sống ảo?
              </span>
            </div>
            <div>
              <span style={{ fontSize: 18 }}>
                Hãy tiết kiệm hơn với các chương trình khuyến mãi của chúng tôi
                ở dưới đây.
              </span>
            </div>
          </div>
          <div className="right" style={{ width: "35%", paddingTop: "20px" }}>
            <img style={{ width: "80%", height: "60%" }} src={anh1} alt="" />
          </div>
        </div>
        <div className="Button">
          <Button
            variant="contained"
            onClick={handleOpenPlaceItem}
            sx={{ whiteSpace: "pre" }}
          >
            Tìm kiếm
          </Button>
        </div>
        <div className="card_voucher">
          {data?.map((item, index) => (
            <MapData data={item} key={index} />
          ))}
        </div>
      </div>
      <Footer />
      <GetDataPlaceItem openDialog={openModal} onClose={handleCloseModal} />
    </div>
  );
};
export default Voucher;
