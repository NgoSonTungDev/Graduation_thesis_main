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
import _ from "lodash";
import ErrorEmpty from "../../components/emty_data";

const Voucher = () => {
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = React.useState([]);
  const placeId = useSelector(DataPlaceById);

  const handleOpenPlaceItem = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const getApiVocher = () => {
    setLoading(true);
    axiosClient
      .get(`voucher/get-all?${qs.stringify({ placeID: placeId._id })}`)
      .then((res) => {
        setData(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        toastify("error", err.response.data.message || "Lỗi hệ thông !");
      });
  };

  useEffect(() => {
    getApiVocher();
  }, [placeId]);

  return (
    <div>
      <Navbar loading={loading} valueTab={"four"} />
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
            backgroundColor: "rgb(244 74 110 / 20%)",
            // backgroundColor: "rgb(215,0,22)",
            // backgroundColor:
            //   "linear-gradient(180deg, rgba(215,0,22,0.8352591036414566) 0%, rgba(215,0,6,0.7904411764705882) 31%, rgba(255,0,0,0.5691526610644257) 72%)",
          }}
        >
          <div
            className="left"
            style={{
              width: "80%",
              marginLeft: "10%",
              paddingTop: "20px",
            }}
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
              <div className="Button" style={{ paddingTop: "20px" }}>
                <Button
                  variant="contained"
                  onClick={handleOpenPlaceItem}
                  sx={{ whiteSpace: "pre" }}
                >
                  Tìm kiếm
                </Button>
              </div>
            </div>
          </div>
          <div
            className="right"
            style={{
              width: "25%",
              paddingTop: "20px",
            }}
          >
            <img style={{ width: "80%", height: "60%" }} src={anh1} alt="" />
          </div>
        </div>

        <div
          className="card_voucher"
          style={{
            width: "87%",
            textTransform: "capitalize",
            boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
          }}
        >
          {_.isEmpty(data) ? (
            <ErrorEmpty />
          ) : (
            data?.map((item, index) => <MapData data={item} key={index} />)
          )}
        </div>
      </div>
      <GetDataPlaceItem openDialog={openModal} onClose={handleCloseModal} />
      <Footer />
    </div>
  );
};
export default Voucher;
