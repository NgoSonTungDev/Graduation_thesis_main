import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";
import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import axiosClient from "../../api/axiosClient";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import { toastify } from "../../utils/common";
import ImageBox from "./image_box";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import "./style.scss";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";

const PlaceDetail = () => {
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState({});
  const { id } = useParams();

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
  }, []);

  return (
    <div>
      <Navbar loading={loading} />
      <div className="container_place_detail">
        <div className="box_banner_place">
          <div className="box_banner_place_title">
            <p>{data.name}</p>
            <span>
              {data.description} Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Fugiat incidunt ab quaerat ipsa ipsam, hic
              voluptatibus fuga dolor. Dolore dolores odit ipsa natus, delectus
              magni fuga modi omnis hic ex!
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
          <div style={{ padding: "10px 15px" }}>
            <Button variant="outlined">Đặt vé</Button>
          </div>
          <div className="box_banner_place_image">
            {!loading && <ImageBox images={data?.image} />}
          </div>
        </div>
        <div className="box_body_content">
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
                style={{ display: "flex", gap: "15px", flexDirection: "row" }}
              >
                <StarBorderOutlinedIcon /> <i>dsdsf</i>
              </div>
              <div
                style={{ display: "flex", gap: "15px", flexDirection: "row" }}
              >
                <AccessTimeOutlinedIcon /> <i>dsdsf</i>
              </div>
              <div
                style={{ display: "flex", gap: "15px", flexDirection: "row" }}
              >
                <MonetizationOnOutlinedIcon /> <i>dsdsf</i>
              </div>
              <div
                style={{ display: "flex", gap: "15px", flexDirection: "row" }}
              >
                <PhoneOutlinedIcon /> <i>Chưa cập nhật</i>
              </div>
              <div
                style={{ display: "flex", gap: "15px", flexDirection: "row" }}
              >
                <FacebookOutlinedIcon /> <i>dsdsf</i>
              </div>
              <div
                style={{ display: "flex", gap: "15px", flexDirection: "row" }}
              >
                <FacebookOutlinedIcon /> <i>dsdsf</i>
              </div>
            </div>
          </div>
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
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d61325.1064539809!2d108.24067597122564!3d16.12665344433096!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31423d72d1be522d%3A0x1e7339a6534e4e7!2zQsOhbiDEkeG6o28gU8ahbiBUcsOg!5e0!3m2!1svi!2s!4v1679391056569!5m2!1svi!2s"
                width="100%"
                height="100%"
                // style="border:0;"
                allowfullscreen="true"
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
        <div className="box_body_content">
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
                style={{
                  outline: "none",
                  border: "none",
                  width: "100%",
                  height: "100%",
                }}
                allowfullscreen="true"
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          <div className="box_body_content_detail">
            <p>Thông tin chi tiết</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PlaceDetail;
