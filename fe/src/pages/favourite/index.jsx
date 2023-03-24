import React, { useState, useEffect } from "react";
import "./style.scss";
import axiosClient from "../../api/axiosClient";
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

const Favoutite = () => {
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
      <div></div>

      <Footer />
    </div>
  );
};
export default Favoutite;
