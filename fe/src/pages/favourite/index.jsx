import React, { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import Navbar from "../../components/navbar";
import { toastify } from "../../utils/common";
import Favourite_Item from "./facourite_item";
import "./style.scss";
import { getUserDataLocalStorage } from "../../utils/localstorage";
const Favourite = () => {
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState([]);
  const userIdStorage = getUserDataLocalStorage();

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
    let url = `/favourite/get-by-id/${userIdStorage._id}`;
    fetchData(url);
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Navbar />
      {data?.data?.map((item) => (
        <Favourite_Item data={item} />
      ))}
    </div>
  );
};

export default Favourite;
