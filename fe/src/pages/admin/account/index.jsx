import React, { useEffect, useState } from "react";
import axiosClient from "../../../api/axiosClient";
import SidebarAdmin from "../../../components/narbar_admin";
import { toastify } from "../../../utils/common";
import qs from "query-string";
import LoadingBar from "../../../components/loadding/loading_bar";
import ErrorEmpty from "../../../components/emty_data";
import _ from "lodash";
import PaginationCpn from "../../../components/pagination";
import AccountTable from "./table_account";
import { Box } from "@mui/system";
import TabContext from "@mui/lab/TabContext";

const AccountManagement = () => {
  const [value, setValue] = React.useState("0");
  const [loading, setLoading] = React.useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = React.useState({});
  const [payload, setPayload] = React.useState({
    pageNumber: 1,
    limit: 10,
    status: "",
  });

  // const handleChangeTab = (e, newValue) => {
  //   setValue(newValue);

  //   if (newValue === "0") {
  //     return setPayload({
  //       ...payload,
  //       status: "",
  //       pageNumber: 1,
  //     });
  //   }

  //   setPayload({
  //     ...payload,
  //     status: Number(newValue),
  //     pageNumber: 1,
  //   });
  // };

  const handleChangePage = (page) => {
    setPayload({ ...payload, pageNumber: page });
  };

  const fetchData = () => {
    axiosClient
      .get(`/user/get-all?${qs.stringify(payload)}`)
      .then((res) => {
        setLoading(false);
        console.log(res.data.data);
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

  const renderForm = () => {
    return (
      <div>
        <Box sx={{ width: "100%", height: "100vh", overflow: "hidden" }}>
          <TabContext value={value}>
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
                  <AccountTable data={data.data} callBackApi={fetchData} />
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
        {/* {openModal && (
          <GetDataSaleAgent openDialog={openModal} onClose={handleCloseModal} />
        )} */}
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
