import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import { Box, Button, IconButton } from "@mui/material";
import Tab from "@mui/material/Tab";
import _ from "lodash";
import qs from "query-string";
import React, { useEffect, useState } from "react";
import axiosClient from "../../../api/axiosClient";
import ErrorEmpty from "../../../components/emty_data";
import LoadingBar from "../../../components/loadding/loading_bar";
import SidebarAdmin from "../../../components/narbar_admin";
import PaginationCpn from "../../../components/pagination";
import { toastify } from "../../../utils/common";
import GetDataSaleAgent from "./modle_find_sale_agent";
import "./style.scss";
import OrderTableAdmin from "./table";
import FormDate from "../../../hook-form/form_date";
import ReplayOutlinedIcon from "@mui/icons-material/ReplayOutlined";
import moment from "moment";

const OrderManagement = () => {
  const [value, setValue] = React.useState("0");
  const [loading, setLoading] = React.useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = React.useState({});
  const [payload, setPayload] = React.useState({
    pageNumber: 1,
    limit: 6,
    status: "",
    salesAgentId: "",
    dateTime: "",
  });

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

  const handleGetSalesAgentID = (value) => {
    setPayload({ ...payload, salesAgentId: value });
    setOpenModal(false);
  };

  const handleChangePage = (page) => {
    setPayload({ ...payload, pageNumber: page });
  };

  const fetchData = () => {
    axiosClient
      .get(`/order/all?${qs.stringify(payload)}`)
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

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const renderForm = () => {
    return (
      <div>
        <Box sx={{ width: "100%", height: "100vh", overflow: "hidden" }}>
          <TabContext value={value}>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                marginTop: 1,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
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
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  flexDirection: "row",
                }}
              >
                <Box sx={{ transform: "translateY(-5px)" }}>
                  <FormDate
                    value={payload.dateTime}
                    maxDate={new Date()}
                    label={"Thời gian"}
                    onChange={(value) => {
                      setPayload({
                        ...payload,
                        dateTime: moment(value).format("YYYY-MM-DD"),
                      });
                    }}
                  />
                </Box>

                <Button
                  size="medium"
                  variant="outlined"
                  sx={{ marginRight: "30px" }}
                  onClick={handleOpenModal}
                >
                  Tìm kiếm đại lý
                </Button>

                <IconButton
                  onClick={() => {
                    setPayload({
                      pageNumber: 1,
                      limit: 6,
                      status: "",
                      salesAgentId: "",
                      dateTime: "",
                    });
                  }}
                  size="small"
                  sx={{
                    border: "1px solid",
                  }}
                >
                  <ReplayOutlinedIcon />
                </IconButton>
              </Box>
            </Box>
            <div
              style={{
                width: "100%",
                height: "93%",
                marginTop: "10px",
              }}
            >
              <div className="boxTable">
                {loading ? (
                  <LoadingBar loading={loading} />
                ) : _.isEmpty(data.data) ? (
                  <ErrorEmpty />
                ) : (
                  <OrderTableAdmin data={data.data} callBackApi={fetchData} />
                )}
              </div>
              <div
                style={{
                  width: "100%",
                  height: "50px",
                }}
              >
                {data?.data && (
                  <PaginationCpn
                    count={data.totalPage}
                    page={payload.pageNumber}
                    onChange={handleChangePage}
                  />
                )}
              </div>
            </div>
          </TabContext>
        </Box>
        {openModal && (
          <GetDataSaleAgent
            openDialog={openModal}
            onClose={handleCloseModal}
            GetSaleAgentId={handleGetSalesAgentID}
          />
        )}
      </div>
    );
  };

  return (
    <div>
      <SidebarAdmin ReactNode={renderForm()} />
    </div>
  );
};

export default OrderManagement;
