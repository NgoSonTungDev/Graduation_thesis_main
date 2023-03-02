import _debounce from "lodash/debounce";
import React, { useCallback, useEffect } from "react";
import qs from "query-string";
import Explore from "../../explore";
import axiosClient from "../../../api/axiosClient";
import { toastify } from "../../../utils/common";

export default function GetDataPlace() {
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [payload, setPayload] = React.useState({
    pageNumber: 1,
    limit: 5,
    placeName: "",
    type: "",
    variability: "",
    purpose: "",
    location: "",
  });

  const fetchData = (url) => {
    axiosClient
      .get(url)
      .then((res) => {
        console.log("lỗi ....", res.data.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        toastify("error", err.response.data.message || "Lỗi hệ thông !");
      });
  };

  useEffect(() => {
    let url = `/place/all?${qs.stringify(payload)}`;
    fetchData(url);
  }, []);

  return (
    <div
      className="container_home_product_card"
      style={{ width: "100%", height: "40px", backgroundColor: "red" }}
    >
      {data?.map((item, index) => (
        <Explore data={item} key={index} />
      ))}
    </div>
  );
}
