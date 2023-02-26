import React, { useEffect } from "react";
import "./style.scss";
import Navbar from "../../components/navbar";
import PlaceItem from "./place_item";
import axiosClient from "../../api/axiosClient";
import qs from "query-string";
import { toastify } from "../../utils/common";
import PaginationCpn from "../../components/pagination";

const Place = () => {
  const [loading, setLoading] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [data, setData] = React.useState({});
  const [payload, setPayload] = React.useState({
    pageNumber: 1,
    limit: 5,
    placeName: "",
    type: "",
    variability: "",
    purpose: "",
    location: "",
  });

  const handleChangePage = (page) => {
    setPage(page);
    setPayload({ ...payload, pageNumber: page });
  };

  const fetchData = (url) => {
    setLoading(true);
    axiosClient
      .get(url)
      .then((res) => {
        setData(res.data.data);
        console.log(res.data.data);
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
  }, [payload]);

  return (
    <div style={{ width: "100%" }}>
      <Navbar loading={loading} />
      <div className="container_place">
        <div className="container_place_filter">
          <div
            style={{
              width: "100%",
              borderBottom: "1px solid #dedede",
              textAlign: "center",
            }}
          >
            <p
              style={{
                padding: "7px",
                margin: "0",
                textTransform: "capitalize",
                fontSize: "20px",
                fontWeight: "500",
              }}
            >
              Lọc kết quả
            </p>
          </div>
        </div>
        <div className="container_place_box">
          <div>
            <span
              style={{
                padding: "7px",
                margin: "0",
                textTransform: "capitalize",
                fontSize: "20px",
                fontWeight: "500",
              }}
            >
              Kết quả tìm kiếm của bạn :
            </span>
          </div>

          <div
            style={{
              width: "100%",
              marginTop: "10px",
            }}
          >
            {data?.data?.map((item) => (
              <PlaceItem data={item} />
            ))}
          </div>

          <div>
            <PaginationCpn
              count={data.totalPage}
              page={page}
              onChange={handleChangePage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Place;
