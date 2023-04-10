import React, { useState, useEffect } from "react";
import axiosClient from "../../api/axiosClient";
import MapData from "./data_vocher";
import { toastify } from "../../utils/common";
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

  const getApiVoucher = () => {
    setLoading(true);
    axiosClient
      .get(
        `voucher/get-all?${qs.stringify({
          placeID: placeId._id,
          active: true,
        })}`
      )
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
    getApiVoucher();
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
          }}
        >
          <div
            className="left"
            style={{
              width: "80%",
              marginLeft: "10%",
              paddingTop: "20px",
              padding: "20px",
            }}
          >
            <div>
              <b style={{ fontSize: 30 }}>Cập nhật khuyến mãi hiện hành</b>
            </div>
            <div>
              <p style={{ fontSize: 18, padding: 0 }}>
                Bạn đang tìm kiếm một góc cafe để sống ảo?
              </p>
              <span style={{ fontSize: 18 }}>
                Hãy tiết kiệm hơn với các chương trình khuyến mãi của chúng tôi
                ở dưới đây.
              </span>
            </div>
            <div>
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
        </div>

        <div
          style={{
            width: "80%",
            marginLeft: "10%",
            marginTop: "15px",
            display: "flex",
            flexWrap: "wrap",
            boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
            justifyContent: "space-around",
          }}
        >
          {_.isEmpty(data) ? (
            <div
              style={{ height: "400px", display: "grid", placeItems: "center" }}
            >
              <ErrorEmpty />
            </div>
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
