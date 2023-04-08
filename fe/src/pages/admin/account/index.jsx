import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import { Box, Tab } from "@mui/material";
import React, { useState } from "react";
import ErrorEmpty from "../../../components/emty_data";
import LoadingBar from "../../../components/loadding/loading_bar";
import PaginationCpn from "../../../components/pagination";
import OrderTableAdmin from "../order/table";
import SidebarAdmin from "../../../components/narbar_admin";
import GetDataSaleAgent from "../order/modle_find_sale_agent";
import _ from "lodash";

const AccountManagement = () => {
  const [value, setValue] = React.useState("0");
  const [loading, setLoading] = React.useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = React.useState({});
  //   const [payload, setPayload] = React.useState({
  //     pageNumber: 1,
  //     limit: 5,
  //     status: "",
  //   });

  //   const fetchData = () => {
  //     axiosClient
  //       .get(`/order/all?${qs.stringify(payload)}`)
  //       .then((res) => {
  //         setLoading(false);
  //         setData(res.data.data);
  //       })
  //       .catch((err) => {
  //         setLoading(false);
  //         toastify("error", err.response.data.message || "Lỗi hệ thông !");
  //       });
  //   };

  //   useEffect(() => {
  //     setLoading(true);
  //     fetchData();
  //     window.scrollTo(0, 0);
  //   }, [payload]);

  //   const handleOpenModal = () => {
  //     setOpenModal(true);
  //   };

  //   const handleCloseModal = () => {
  //     setOpenModal(false);
  //   };

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
                // display: "flex",
                // justifyContent: "space-between",
              }}
            >
              <TabList
                // onChange={handleChangeTab}
                aria-label="lab API tabs example"
              >
                <Tab label="Tất cả" value="0" />
                <Tab label="Chờ xác nhận" value="1" />
                <Tab label="Đã xác nhận" value="2" />
                <Tab label="Đã hủy" value="3" />
                <Tab label="Đã thanh toán" value="4" />
              </TabList>
              {/* <Button
                size="medium"
                sx={{ marginRight: "30px" }}
                onClick={handleOpenModal}
              >
                Tìm kiếm đại lý
              </Button> */}
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
                  overflow: "hidden",
                }}
              >
                {loading ? (
                  <LoadingBar loading={loading} />
                ) : _.isEmpty(data) ? (
                  <ErrorEmpty />
                ) : (
                  <OrderTableAdmin data={data.data} />
                )}
              </div>
              <div
                style={{
                  width: "100%",
                  height: "6%",
                }}
              >
                <PaginationCpn
                //   count={data.totalPage}
                //   page={payload.pageNumber}
                //   onChange={handleChangePage}
                />
              </div>
            </div>
          </TabContext>
        </Box>
        {openModal && <GetDataSaleAgent openDialog={openModal} />}
      </div>
    );
  };

  return (
    <div>
      <SidebarAdmin ReactNode={renderForm()} />
    </div>
  );
};

export default AccountManagement;
