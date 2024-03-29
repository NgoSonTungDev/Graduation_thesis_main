import SearchIcon from "@mui/icons-material/Search";
import { IconButton, InputBase, Paper, Skeleton } from "@mui/material";
import _debounce from "lodash/debounce";
import queryString from "query-string";
import React, { useCallback, useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import { toastify } from "../../utils/common";
import ErrorEmpty from "../emty_data";
import Navbar from "../navbar";
import PaginationCpn from "../pagination";
import CardPost from "./card_post";
import ExploreHot from "./explore_hot";
import ExploreUser from "./explore_user";
import advertisement from "./images/advertisement.png";
import _ from "lodash";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import Footer from "../footer";

const Explore = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [dataUser, setDataUser] = useState([]);
  const [dataPost, setDataPost] = useState([]);
  const navigate = useNavigate();
  const LIMIT = 5
  const [payloadPost, setpayLoadPost] = useState({
    pageNumber: 1,
    limit: LIMIT,
    placeId: "",
    active: true,
  });

  const [payload1, setPayload] = useState({
    pageNumber: 1,
    limit: LIMIT,
    placeName: "",
    type: [],
    variability: "",
    purpose: "",
    location: [],
  });

  const debounceFn = useCallback(
    _debounce((value) => {
      setPayload({ ...payload1, placeName: value });
    }, 500),
    []
  );

  const handleChangePage = (page) => {
    setpayLoadPost({ ...payloadPost, pageNumber: Number(page) });
  };

  const handleFindPostById = (id) => {
    setpayLoadPost({ pageNumber: 1, placeId: id, active: true, limit: LIMIT, });
  };

  const getApiPlace = () => {
    axiosClient
      .get(`/place/all?${queryString.stringify(payload1)}`)
      .then((res) => {
        setData(res.data.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        toastify("error", err.response.data.message || "Lỗi hệ thông !");
      });
  };

  const getApiUser = () => {
    axiosClient
      .get(`/user/get-all?${queryString.stringify(payload1)}`)
      .then((res) => {
        setDataUser(res.data.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        toastify("error", err.response.data.message || "Lỗi hệ thông !");
      });
  };

  const getApiAllPost = () => {
    setLoading(true);
    axiosClient
      .get(`post/all?${queryString.stringify(payloadPost)}`)
      .then((res) => {
        setDataPost(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        toastify("error", err.response.data.message || "Lỗi hệ thông !");
      });
  };
  const handelDeleteDataPost = (id) => {
    getApiAllPost();
  };

  useEffect(() => {
    Promise.all([getApiUser(), getApiPlace(), getApiAllPost()]);

    return () => {
      setLoading(true);
    };
  }, []);

  const getByIdUserMoveProfile = (id) => {
    navigate(`/profile/${id}`);
  };

  useEffect(() => {
    getApiPlace();
  }, [payload1]);

  useEffect(() => {
    window.scrollTo(0, 0);
    getApiAllPost();
  }, [payloadPost]);

  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <Navbar loading={loading} valueTab="three" />
      <div className="container_explore">
        <div className="container_explore_left">
          <div className="container_explore_left_place">
            <div
              style={{
                width: "100%",
              }}
            >
              {loading ? (
                [1, 1].map((item, index) => (
                  <Skeleton
                    variant="rectangular"
                    width={"100%"}
                    height={70}
                    sx={{ marginTop: 1 }}
                    key={index}
                  />
                ))
              ) : _.isEmpty(dataPost.data) ? (
                <ErrorEmpty />
              ) : (
                dataPost?.data?.map((item, index) => {
                  return (
                    <CardPost
                      data={item}
                      callBackApi={handelDeleteDataPost}
                      key={index}
                    />
                  );
                })
              )}
            </div>
            <div style={{width:"100%",height:"10%",padding:"10px 0", marginTop: "20px "}}>
              {dataPost?.data && dataPost?.data?.length > 0 && (
                <PaginationCpn
                  count={dataPost.totalPage}
                  page={payloadPost.pageNumber}
                  onChange={handleChangePage}
                />
              )}
            </div>
          </div>
        </div>
        <div className="container_explore_right">
          <div className="container_explore_right_place">
            <div
              style={{
                width: "100%",
                textAlign: "center",
                padding: "10px",
              }}
            >
              <span
                style={{
                  textAlign: "center",
                  padding: "7px",
                  textTransform: "capitalize",
                  fontSize: "20px",
                  fontWeight: "500",
                }}
              >
                Địa điểm nổi bật
              </span>
            </div>

            <Paper
              sx={{
                display: "flex",
                marginLeft: "5%",
                width: "90%",
                boxShadow:
                  "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;",
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Tên địa điểm"
                inputProps={{ "aria-label": "Tên địa điểm" }}
                onChange={(e) => {
                  e.preventDefault();
                  debounceFn(e.target.value);
                }}
              />
            </Paper>
            <div
              style={{
                width: "100%",
                paddingBottom: "10px",
              }}
            >
              {loading ? (
                [1, 1].map((item, index) => (
                  <Skeleton
                    variant="rectangular"
                    width={"100%"}
                    height={70}
                    sx={{ marginTop: 1 }}
                    key={index}
                  />
                ))
              ) : data.length === 0 ? (
                <ErrorEmpty />
              ) : (
                data?.map((item, index) => {
                  return (
                    <ExploreHot
                      data={item}
                      key={index}
                      callbackfn={handleFindPostById}
                    />
                  );
                })
              )}
            </div>
          </div>
          <div
            className="container_explore_right_user"
            style={{ marginTop: "30px" }}
          >
            <div
              style={{
                width: "100%",
                padding: "10px",
                textAlign: "center",
              }}
            >
              <span
                style={{
                  textAlign: "center",
                  padding: "7px",
                  margin: "0",
                  textTransform: "capitalize",
                  fontSize: "20px",
                  fontWeight: "500",
                }}
              >
                Người dùng tích cực
              </span>
            </div>
            <div
              style={{
                width: "100%",
                marginTop: "10px",
                paddingBottom: "15px",
              }}
            >
              {loading ? (
                [1, 1].map((item, index) => (
                  <Skeleton
                    variant="rectangular"
                    width={"100%"}
                    height={70}
                    sx={{ marginTop: 1 }}
                    key={index}
                  />
                ))
              ) : dataUser.length === 0 ? (
                <ErrorEmpty />
              ) : (
                dataUser?.map((item, index) => {
                  return (
                    <ExploreUser
                      dataUser={item}
                      key={index}
                      getIdMovePage={getByIdUserMoveProfile}
                    />
                  );
                })
              )}
            </div>
          </div>
          <div
            className="container_explore_right_s"
            style={{ marginTop: "30px" }}
          >
            <div
              style={{
                textAlign: "center",
                padding: "10px",
              }}
            >
              <span
                style={{
                  textAlign: "center",
                  padding: "7px",
                  margin: "0",
                  textTransform: "capitalize",
                  fontSize: "20px",
                  fontWeight: "500",
                }}
              >
                Quảng cáo
              </span>
              <div
                style={{
                  width: "100%",
                  marginTop: "10px",
                }}
              >
                <img style={{ width: "100%" }} src={advertisement} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Explore;
