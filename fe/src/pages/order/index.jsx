import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import { Box } from "@mui/material";
import Tab from "@mui/material/Tab";
import _ from "lodash";
import qs from "query-string";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../../api/axiosClient";
import ErrorEmpty from "../../components/emty_data";
import LoadingBar from "../../components/loadding/loading_bar";
import Navbar from "../../components/navbar";
import PaginationCpn from "../../components/pagination";
import { toastify } from "../../utils/common";
import "./style.scss";
import TableOrderUser from "./table";

const Order = () => {
  const [value, setValue] = React.useState("0");
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState({});
  const [payload, setPayload] = React.useState({
    pageNumber: 1,
    limit: 6,
    status: "",
  });

  const handleOpenLoading = () => setLoading(true);
  const handleCloseLoading = () => setLoading(false);

  const { id } = useParams();

  const handleChangeTab = (e, newValue) => {
    setValue(newValue);

    if (newValue === "0") {
      return setPayload({
        ...payload,
        status: "",
        pageNumber: 1,
      });
    }

    setPayload({
      ...payload,
      status: Number(newValue),
      pageNumber: 1,
    });
  };

  const handleChangePage = (page) => {
    setPayload({ ...payload, pageNumber: page });
  };

  const fetchData = () => {
    axiosClient
      .get(`/order/get-id-user/${id}?${qs.stringify(payload)}`)
      .then((res) => {
        setLoading(false);
        setData(res.data.data);
      })
      .catch((err) => {
        setLoading(false);
        toastify("error", err.response.data.message || "Lỗi hệ thông !");
      });
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
    window.scrollTo(0, 0);
  }, [payload]);

  return (
    <div>
      <Navbar loading={loading} />
      <Box
        sx={{
          width: "100%",
          height: "91vh",
          overflow: "hidden",
        }}
      >
        <TabContext value={value}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              display: "grid",
              alignItems: "center",
            }}
          >
            <TabList
              onChange={handleChangeTab}
              aria-label="lab API tabs example"
            >
              <p style={{ padding: "0 15px", fontWeight: "500", fontSize: 20 }}>
                Các đơn hàng của bạn :
              </p>
              <Tab label="Tất cả" value="0" />
              <Tab label="Chờ xác nhận" value="1" />
              <Tab label="Đã xác nhận" value="2" />
              <Tab label="Đã hủy" value="3" />
              <Tab label="Đã thanh toán" value="4" />
            </TabList>
          </Box>
          <div
            style={{
              width: "100%",
              height: "90vh",
              marginTop: "10px",
            }}
          >
              <div className="boxTableUser">
                {loading ? (
                  <LoadingBar />
                ) : _.isEmpty(data) ? (
                  <ErrorEmpty />
                ) : (
                  <TableOrderUser
                    data={data?.data}
                    callBackApi={fetchData}
                    handleOpenLoading={handleOpenLoading}
                    handleCloseLoading={handleCloseLoading}
                    loading={loading}
                  />
                )}
              </div>
              {!loading && _.isEmpty(data) ? (
                <ErrorEmpty />
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: "50px",
                  }}
                >
                  <PaginationCpn
                    count={data.totalPage}
                    page={payload.pageNumber}
                    onChange={handleChangePage}
                  />
                </div>
              )}
          </div>
        </TabContext>
      </Box>
    </div>
  );
};

export default Order;
