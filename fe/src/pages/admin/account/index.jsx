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

const fakeCode = (length) => {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};

const AccountManagement = () => {
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState({});
  const [payload, setPayload] = React.useState({
    pageNumber: 1,
    limit: 5,
    status: "",
  });

  const handleLockAccount = (userId) => {
    console.log("lock", userId);
    axiosClient
      .put(`/user/lock-user/${userId}`)
      .then((res) => {
        setLoading(false);
        handleGetAllUsers();
        toastify("success", "Khoá thành công tài khoản thành công!");
      })
      .catch((err) => {
        setLoading(false);
        toastify("error", err.response.data.message || "Lỗi hệ thống !");
      });
  };

  const sendEmailUnlock = (email, code) => {
    axiosClient
      .post("/email/send-un-lock", {
        email,
        code,
      })
      .catch((err) => {
        setLoading(false);
        toastify("error", err.response.data.message || "Lỗi hệ thống !");
      });
  };

  const handleUnlockAccount = (userId, email) => {
    console.log("unlock", userId);
    const codePass = fakeCode(8);
    axiosClient
      .put(`/user/un-lock-user/${userId}`, {
        fakeCode: codePass,
      })
      .then((res) => {
        setLoading(false);
        sendEmailUnlock(email, codePass);
        handleGetAllUsers();
        toastify("success", "Mở khoá thành công tài khoản thành công!");
      })
      .catch((err) => {
        setLoading(false);
        toastify("error", err.response.data.message || "Lỗi hệ thống !");
      });
  };

  const handleDeleteData = (userId) => {
    console.log("id", userId);
    axiosClient
      .delete(`user/delete/${userId}`)
      .then((res) => {
        setLoading(false);
        handleGetAllUsers();
        toastify("success", "Xoá dữ liệu thành công!");
      })
      .catch((err) => {
        setLoading(false);
        toastify("error", err.response.data.message || "Lỗi hệ thống !");
      });
  };

  const handleChangePage = (page) => {
    setPayload({ ...payload, pageNumber: page });
  };

  const handleGetAllUsers = () => {
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
    handleGetAllUsers();
    window.scrollTo(0, 0);
  }, [payload]);

  const renderForm = () => {
    return (
      <div>
        <Box sx={{ width: "100%", height: "100vh", overflow: "hidden" }}>
          <TabContext>
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
                  <AccountTable
                    data={data.data}
                    handleLockAccount={handleLockAccount}
                    handleUnlockAccount={handleUnlockAccount}
                    callBackHandleDeleteData={handleDeleteData}
                    callBackApi={handleGetAllUsers}
                  />
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
