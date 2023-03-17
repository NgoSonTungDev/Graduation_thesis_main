import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import { Box } from "@mui/material";
import Tab from "@mui/material/Tab";
import _ from "lodash";
import qs from "query-string";
import React, { useEffect } from "react";
import axiosClient from "../../../api/axiosClient";
import ErrorEmpty from "../../../components/emty_data";
import MenuSaleAgent from "../../../components/navbar_sale_agent";
import PaginationCpn from "../../../components/pagination";
import { toastify } from "../../../utils/common";
import OrderTable from "./table";

const OrderSaleAgent = () => {
  const [value, setValue] = React.useState("0");
  const [data, setData] = React.useState({});
  const [payload, setPayload] = React.useState({
    pageNumber: 1,
    limit: 5,
    status: "",
  });

  const handleChangeTab = (e, newValue) => {
    setValue(newValue);

    if (newValue === "0") {
      return setPayload({
        ...payload,
        status: "",
      });
    }

    setPayload({
      ...payload,
      status: Number(newValue),
    });
  };

  const handleChangePage = (page) => {
    setPayload({ ...payload, pageNumber: page });
  };

  const fetchData = (url) => {
    axiosClient
      .get(url)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        toastify("error", err.response.data.message || "Lỗi hệ thông !");
      });
  };

  useEffect(() => {
    let url = `/order/get-id-sale-agent/64089117c004936540a13749?${qs.stringify(
      payload
    )}`;
    fetchData(url);
    window.scrollTo(0, 0);
  }, [payload]);

  const renderForm = () => {
    return (
      <div>
        <div>
          <Box sx={{ width: "100%", height: "100vh", overflow: "hidden" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChangeTab}
                  aria-label="lab API tabs example"
                >
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
                <div
                  style={{
                    width: "100%",
                    height: "93%",
                  }}
                >
                  {_.isEmpty(data) ? (
                    <ErrorEmpty />
                  ) : (
                    <OrderTable data={data.data} />
                  )}
                </div>
                <div
                  style={{
                    width: "100%",
                    height: "6%",
                  }}
                >
                  <PaginationCpn
                    count={data.totalPage}
                    page={payload.pageNumber}
                    onChange={handleChangePage}
                  />
                </div>
              </div>
            </TabContext>
          </Box>
        </div>
      </div>
    );
  };

  return (
    <div>
      <MenuSaleAgent ReactNode={renderForm()} />
    </div>
  );
};

export default OrderSaleAgent;
