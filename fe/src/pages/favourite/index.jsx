import React, { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import Navbar from "../../components/navbar";
import { toastify } from "../../utils/common";
import Favourite_Item from "./favourite_item";
import Footer from "../../components/footer";
import "./style.scss";
import { getUserDataLocalStorage } from "../../utils/localstorage";
import { useParams } from "react-router-dom";
const Favourite = () => {
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState([]);
  const { id } = useParams();

  const handleDeleteData = (id) => {
    setData(
      data?.filter((item) => {
        return item._id !== id;
      })
    );
  };
  const fetchData = (url) => {
    setLoading(true);
    console.log("aa", data);
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
    let url = `/favourite/get-by-id/${id}`;
    fetchData(url);
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Navbar loading={loading} valueTab={"four"} />
      <div>
        <span
          style={{
            marginLeft: "20px",
            color: "#020024",
            fontSize: "30px",
            paddingLeft: "350px",
            fontWeight: "600px",
            paddingTop: "10px",
          }}
        >
          Địa điểm ưu thích của bạn{" "}
        </span>
      </div>
      {data.map((item) => (
        <Favourite_Item data={item} deleteData={handleDeleteData} />
      ))}
      <Footer />
    </div>
  );
};

export default Favourite;
