import React, { useEffect } from "react";
import "./style.scss";
import Navbar from "../../components/navbar";
import PlaceItem from "./place_item";
import axiosClient from "../../api/axiosClient";
import qs from "query-string";
import { toastify } from "../../utils/common";
import PaginationCpn from "../../components/pagination";
import PlaceSkeleton from "./place_skeleton";
import { useDispatch, useSelector } from "react-redux";
import { payloadPlace } from "../../redux/selectors";
import { changePayload, resetPayload } from "../../redux/place/placeSlice";
import PlaceFilter from "./place_filter";
import ErrorEmpty from "../../components/emty_data";
import _ from "lodash";
import Footer from "../../components/footer";

const Place = () => {
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState({});
  const dispatch = useDispatch();
  const payload = useSelector(payloadPlace);

  const handleChangePage = (page) => {
    dispatch(changePayload({ ...payload, pageNumber: page }));
  };

  const handleLoadingPlaceItem = (boolean) => {
    setLoading(boolean);
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
    let url = `/place/all?${qs.stringify(payload)}`;
    fetchData(url);
    window.scrollTo(0, 0);
  }, [payload]);

  useEffect(() => {
    return () => {
      dispatch(resetPayload());
    };
  }, []);

  return (
    <div style={{ width: "100%" }}>
      <Navbar loading={loading} valueTab="two" />
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
          <PlaceFilter />
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
            {loading ? (
              [1, 1, 1, 1].map((e) => <PlaceSkeleton />)
            ) : _.isEmpty(data?.data) ? (
              <ErrorEmpty />
            ) : (
              data?.data?.map((item) => (
                <PlaceItem data={item} checkLoading={handleLoadingPlaceItem} />
              ))
            )}
          </div>

          <div>
            {data?.data && data?.data?.length > 0 && (
              <PaginationCpn
                count={data.totalPage}
                page={payload.pageNumber}
                onChange={handleChangePage}
              />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Place;
