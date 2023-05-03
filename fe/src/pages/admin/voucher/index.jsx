import React, { useEffect, useState } from "react";
import axiosClient from "../../../api/axiosClient";
import SidebarAdmin from "../../../components/narbar_admin";
import { toastify } from "../../../utils/common";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import { Box, Button } from "@mui/material";
import Tab from "@mui/material/Tab";
import _ from "lodash";
import qs from "query-string";
import LoadingBar from "../../../components/loadding/loading_bar";
import ErrorEmpty from "../../../components/emty_data";
import GetDataPlaceItem from "../../../components/modle_find_place";
import VoucherItem from "./voucher_item";

const VoucherManagement = () => {
  const [loading, setLoading] = React.useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = React.useState({});
  const [payload, setPayload] = React.useState({
    placeID: "",
    active: true,
  });

  const fetchData = () => {
    axiosClient
      .get(`/voucher/get-all?${qs.stringify(payload)}`)
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
          <TabContext>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                marginTop: 1,
                display: "flex",
                justifyContent: "right",
              }}
            >
              <Button
                size="medium"
                sx={{ marginRight: "30px" }}
                onClick={handleOpenModal}
              >
                Thêm mới
              </Button>
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
                  height: "98%",
                  overflowY: "scroll",
                }}
              >
                {loading ? (
                  <LoadingBar loading={loading} />
                ) : _.isEmpty(data) ? (
                  <ErrorEmpty />
                ) : (
                  <VoucherItem />
                  // <OrderTableAdmin data={data.data} callBackApi={fetchData} />
                )}
              </div>
              <div
                style={{
                  width: "100%",
                  height: "6%",
                }}
              ></div>
            </div>
          </TabContext>
        </Box>
        {openModal && (
          <VoucherItem open={openModal} handleClose={handleCloseModal} />
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

export default VoucherManagement;
