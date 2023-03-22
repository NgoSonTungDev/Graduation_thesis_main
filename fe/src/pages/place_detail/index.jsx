import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";
import { Button, Skeleton } from "@mui/material";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import axiosClient from "../../api/axiosClient";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import { formatDate, formatMoney, toastify } from "../../utils/common";
import ImageBox from "./image_box";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import "./style.scss";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import moment from "moment";
import Rating from "@mui/material/Rating";
import ChartPie from "./chart_pie";
import _ from "lodash";
import BoxEvaluate from "./box_evaluate";
import ModalChooseSaleAgent from "./modal_choose_sale_agent";
import { getUserDataLocalStorage } from "../../utils/localstorage";

const PlaceDetail = () => {
  const [loading, setLoading] = React.useState(false);
  const [loadingEvaluate, setLoadingEvaluate] = React.useState(false);
  const [data, setData] = React.useState({});
  const [openModal, setOpenModal] = React.useState(false);
  const [dataEvaluate, setDataEvaluate] = React.useState([]);
  const userIdStorage = getUserDataLocalStorage();

  const { id } = useParams();

  const handleClickOpenSaleAgent = () => {
    if (userIdStorage) {
      setOpenModal(true);
    } else {
      toastify("warn", "Bạn cần đăng nhập để sử dụng dịch vụ của chúng tôi");
    }
  };

  const handleCloseSaleAgent = () => {
    setOpenModal(false);
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
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        toastify("error", err.response.data.message || "Lỗi hệ thông !");
      });
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
                <span>
                  {data.description} Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Fugiat incidunt ab quaerat ipsa ipsam, hic
                  voluptatibus fuga dolor. Dolore dolores odit ipsa natus,
                  delectus magni fuga modi omnis hic ex!
                </span>
              </div>
              <div
                style={{
                  padding: "0 15px",
                  display: "flex",
                  alignItems: "center",
                  fontSize: "15px",
                }}
              >
                <RoomOutlinedIcon />
                <i>
                  {data.address} - {data.location}
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
                <Button variant="outlined" onClick={handleClickOpenSaleAgent}>
                  Lấy mã khuyến mãi
                </Button>
                <Button variant="outlined" onClick={handleClickOpenSaleAgent}>
                  Đặt vé
                </Button>
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
                        disabled={true}
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
                    <a
                      href="https://www.facebook.com/"
                      target={"_blank"}
                      style={{
                        textDecoration: "none",
                        color: "#3498db",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {data.name}
                    </a>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "15px",
                      flexDirection: "row",
                    }}
                  >
                    <FacebookOutlinedIcon /> <i>dsdsf</i>
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
                  }}
                >
                  <iframe
                    src={data.geographicalLocation}
                    width="100%"
                    height="100%"
                    allowfullscreen="true"
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                  ></iframe>
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
      />

      <Footer />
    </div>
  );
};

export default PlaceDetail;
