import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import { Button, Skeleton } from "@mui/material";
import Rating from "@mui/material/Rating";
import { GoogleMap, Marker } from "@react-google-maps/api";
import axios from "axios";
import _ from "lodash";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { SiZalo } from "react-icons/si";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import axiosClient from "../../api/axiosClient";
import Footer from "../../components/footer";
import Map_controller from "../../components/map_controller";
import Navbar from "../../components/navbar";
import { formatDate, formatMoney, toastify } from "../../utils/common";
import { getUserDataLocalStorage } from "../../utils/localstorage";
import BoxEvaluate from "./box_evaluate";
import ChartPie from "./chart_pie";
import ImageBox from "./image_box";
import ModalChooseSaleAgent from "./modal_choose_sale_agent";
import ModalVoucher from "./modal_voucher";
import "./style.scss";

const PlaceDetail = () => {
  const [loading, setLoading] = React.useState(false);
  const [loadingEvaluate, setLoadingEvaluate] = React.useState(false);
  const [data, setData] = React.useState({});
  const [openModal, setOpenModal] = React.useState(false);
  const [openModalVoucher, setOpenModalVoucher] = React.useState(false);
  const [dataEvaluate, setDataEvaluate] = React.useState([]);
  const [map, setMap] = useState(null);
  const [location, setLocation] = useState("");
  const [mapCenter, setMapCenter] = useState({ lat: 0, lon: 0 });
  const userIdStorage = getUserDataLocalStorage();

  const { id } = useParams();

  const handleClickOpenSaleAgent = () => {
    if (userIdStorage) {
      setOpenModal(true);
    } else {
      toastify("warn", "Bạn cần đăng nhập để sử dụng dịch vụ của chúng tôi");
    }
  };

  const handleClickOpenVoucher = () => {
    if (userIdStorage) {
      setOpenModalVoucher(true);
    } else {
      toastify("warn", "Bạn cần đăng nhập để sử dụng dịch vụ của chúng tôi");
    }
  };

  const handleCloseSaleAgent = () => {
    setOpenModal(false);
  };

  const handleCloseVoucher = () => {
    setOpenModalVoucher(false);
  };

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

  const handleSearchPlaceMap = async (query) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          query
        )}`
      );
      const { lat, lon, display_name } = response.data[0];
      setLocation(display_name);
      if (lat && lon && !isNaN(parseFloat(lat)) && !isNaN(parseFloat(lon))) {
        setMapCenter({ lat: parseFloat(lat), lon: parseFloat(lon) });
      } else {
        console.log("No valid search results found");
      }
    } catch (error) {
      console.log("No search results found", error);
    }
  };

  const CallApiGetEvaluate = (url) => {
    setLoadingEvaluate(true);
    axiosClient
      .get(`/evaluate/get-by-id/${id}`)
      .then((res) => {
        setDataEvaluate(res.data.data);
        setLoadingEvaluate(false);
      })
      .catch((err) => {
        setLoadingEvaluate(false);
        toastify("error", err.response.data.message || "Lỗi hệ thông !");
      });
  };

  const fetchData = (url) => {
    setLoading(true);
    axiosClient
      .get(url)
      .then((res) => {
        setData(res.data.data);
        handleSearchPlaceMap(res.data.data.name);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        toastify("error", err.response.data.message || "Lỗi hệ thông !");
      });
  };

  const handleZoomMap = () => {
    map.panTo({ lat: mapCenter.lat, lng: mapCenter.lon });
    map.setZoom(map.getZoom() + 4);
  };

  useEffect(() => {
    let url = `/place/an/${id}`;
    fetchData(url);
    CallApiGetEvaluate();
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Navbar loading={loading} />
      {_.isEmpty(data) ? (
        <div style={{ width: "100%", height: "500px", textAlign: "center" }}>
          <p>Không có dữ liệu !</p>
        </div>
      ) : (
        <div className="container_place_detail">
          {loading ? (
            <Skeleton variant="rounded" width="100%" height="600px" />
          ) : (
            <div className="box_banner_place">
              <div className="box_banner_place_title">
                <p>{data.name}</p>
                <span style={{ lineHeight: "30px" }}>
                  {data.description} Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Fugiat incidunt ab quaerat ipsa ipsam, hic
                  voluptatibus fuga dolor. Dolore dolores odit ipsa natus,
                  delectus magni fuga modi omnis hic ex!
                </span>
              </div>
              <div
                style={{
                  padding: "5px 12px",
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                  fontSize: "15px",
                }}
              >
                <RoomOutlinedIcon />
                <i>
                  {location ? location : `${data.address} - ${data.location}`}
                </i>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  flexDirection: "row",
                  padding: "5px 12px",
                }}
              >
                <AccessTimeOutlinedIcon />
                <i
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {renderItemCheckTime(data.openTime, data.closeTime)}
                  <span style={{ marginLeft: "10px" }}>
                    {formatDate(data.openTime, "HH:mm")} -{" "}
                    {formatDate(data.closeTime, "HH:mm")}
                  </span>
                </i>
              </div>
              <div
                style={{
                  padding: "10px 15px",
                  display: "flex",
                  gap: "15px",
                  flexDirection: "row",
                }}
              >
                <Button variant="outlined" onClick={handleClickOpenVoucher}>
                  Lấy mã khuyến mãi
                </Button>
                {userIdStorage && (
                  <Button variant="outlined" onClick={handleClickOpenSaleAgent}>
                    Đặt vé
                  </Button>
                )}
              </div>
              <div className="box_banner_place_image">
                {!loading && <ImageBox images={data?.image} />}
              </div>
            </div>
          )}
          <div className="box_body_content">
            {loading ? (
              <Skeleton variant="rounded" width="25%" height="350px" />
            ) : (
              <div className="box_body_content_detail">
                <p>Thông tin chi tiết</p>
                <div
                  style={{
                    width: "100%",
                    height: "80%",
                    marginTop: "15px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "15px",
                      flexDirection: "row",
                    }}
                  >
                    <StarBorderOutlinedIcon />{" "}
                    <i>
                      <Rating
                        name="simple-controlled"
                        value={Number(data.rating)}
                      />
                    </i>
                    <span>({data.rating})</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "15px",
                      flexDirection: "row",
                    }}
                  >
                    <AccessTimeOutlinedIcon />{" "}
                    <i
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {renderItemCheckTime(data.openTime, data.closeTime)}
                      <span style={{ marginLeft: "10px" }}>
                        {formatDate(data.openTime, "HH:mm")} -{" "}
                        {formatDate(data.closeTime, "HH:mm")}
                      </span>
                    </i>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "15px",
                      flexDirection: "row",
                    }}
                  >
                    <MonetizationOnOutlinedIcon />{" "}
                    <i>
                      {formatMoney(data.startingPrice)} -{" "}
                      {formatMoney(data.LastPrice)}
                    </i>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "15px",
                      flexDirection: "row",
                    }}
                  >
                    <PhoneOutlinedIcon /> <i>Chưa cập nhật</i>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "15px",
                      flexDirection: "row",
                    }}
                  >
                    <FacebookOutlinedIcon />{" "}
                    <Link
                      to="https://www.facebook.com/"
                      style={{
                        textDecoration: "none",
                        color: "#3498db",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {data.name}
                    </Link>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "15px",
                      flexDirection: "row",
                    }}
                  >
                    <SiZalo /> <i>Chưa cập nhật</i>
                  </div>
                </div>
              </div>
            )}
            {loading ? (
              <Skeleton variant="rounded" width="69%" height="350px" />
            ) : (
              <div className="box_body_content_map">
                <p>Địa điểm cụ thể</p>
                <div
                  style={{
                    width: "100%",
                    height: "300px",
                    marginTop: "10px",
                    overflow: "hidden",
                  }}
                >
                  <Map_controller
                    children={
                      <GoogleMap
                        mapContainerStyle={{
                          width: "100%",
                          height: "100%",
                        }}
                        center={{
                          lat: mapCenter.lat,
                          lng: mapCenter.lon,
                        }}
                        options={{
                          styles: [
                            {
                              featureType: "poi",
                              stylers: [{ visibility: "off" }],
                            },
                            {
                              featureType: "transit.station",
                              stylers: [{ visibility: "off" }],
                            },
                          ],
                          maxZoom: 20,
                          mapTypeControl: false,
                        }}
                        zoom={10}
                        onLoad={(map) => {
                          setMap(map);
                          map.setMapTypeId("satellite");
                        }}
                      >
                        <Marker
                          onClick={handleZoomMap}
                          position={{
                            lat: mapCenter.lat,
                            lng: mapCenter.lon,
                          }}
                        />
                      </GoogleMap>
                    }
                  />
                </div>
              </div>
            )}
          </div>

          <div className="box_body_content">
            {loadingEvaluate ? (
              <Skeleton variant="rounded" width="70%" height="350px" />
            ) : (
              <div className="box_body_content_map">
                <p>Đánh giá từ cộng đồng</p>
                <div
                  style={{
                    width: "100%",
                    marginTop: "10px",
                  }}
                >
                  <BoxEvaluate data={dataEvaluate} />
                </div>
              </div>
            )}

            {loading ? (
              <Skeleton variant="rounded" width="25%" height="350px" />
            ) : (
              <div className="box_body_content_detail">
                {data && _.isEmpty(data.statisticCmt) ? (
                  <div>
                    <ChartPie data={[]} />
                  </div>
                ) : (
                  <ChartPie data={data.statisticCmt} />
                )}
              </div>
            )}
          </div>
        </div>
      )}
      <ModalChooseSaleAgent
        open={openModal}
        handleClose={handleCloseSaleAgent}
        placeId={id}
      />
      <ModalVoucher
        open={openModalVoucher}
        handleClose={handleCloseVoucher}
        placeId={id}
      />

      <Footer />
    </div>
  );
};

export default PlaceDetail;
