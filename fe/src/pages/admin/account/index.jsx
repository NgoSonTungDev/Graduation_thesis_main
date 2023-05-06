import React, { useEffect } from "react";
import axiosClient from "../../../api/axiosClient";
import SidebarAdmin from "../../../components/narbar_admin";
import { toastify } from "../../../utils/common";
import qs from "query-string";
import LoadingBar from "../../../components/loadding/loading_bar";
import ErrorEmpty from "../../../components/emty_data";
import _ from "lodash";
import PaginationCpn from "../../../components/pagination";
import ModalConfirm from "../../../components/modal_confirm";
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
  const [openModal, setOpenModal] = React.useState(false);
  const [checkCase, setCheckCase] = React.useState(1);
  const [getDataTable, setGetDataTable] = React.useState({
    userId: "",
    email: "",
  });
  const [loadingFunction, setLoadingFunction] = React.useState(false);
  const [data, setData] = React.useState({});
  const [payload, setPayload] = React.useState({
    pageNumber: 1,
    limit: 6,
    status: "",
  });

  const handleLockAccount = () => {
    setLoadingFunction(true);
    axiosClient
      .put(`/user/lock-user/${getDataTable.userId}`)
      .then((res) => {
        setLoadingFunction(false);
        handleGetAllUsers();
        setOpenModal(false);
        toastify("success", "Khoá tài khoản thành công!");
      })
      .catch((err) => {
        setLoadingFunction(false);
        setOpenModal(false);
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
        setLoadingFunction(false);
        setOpenModal(false);
        toastify("error", err.response.data.message || "Lỗi hệ thống !");
      });
  };

  const handleUnlockAccount = () => {
    setLoadingFunction(true);
    const codePass = fakeCode(8);
    axiosClient
      .put(`/user/un-lock-user/${getDataTable.userId}`, {
        fakeCode: codePass,
      })
      .then((res) => {
        setLoadingFunction(false);
        setOpenModal(false);
        sendEmailUnlock(getDataTable.email, codePass);
        handleGetAllUsers();
        toastify("success", "Mở khoá tài khoản thành công!");
      })
      .catch((err) => {
        setLoadingFunction(false);
        setOpenModal(false);
        toastify("error", err.response.data.message || "Lỗi hệ thống !");
      });
  };

  const handleDeleteData = () => {
    setLoadingFunction(true);
    axiosClient
      .delete(`user/delete/${getDataTable.userId}`)
      .then((res) => {
        setLoadingFunction(false);
        handleGetAllUsers();
        setOpenModal(false);
        toastify("success", "Xoá dữ liệu thành công!");
      })
      .catch((err) => {
        setLoadingFunction(false);
        setOpenModal(false);
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
                    openModal={() => {
                      setOpenModal(true);
                    }}
                    checkCase={(number) => {
                      setCheckCase(number);
                    }}
                    getDataTable={(userId, email) => {
                      setGetDataTable({
                        userId,
                        email,
                      });
                    }}
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
        {openModal && (
          <ModalConfirm
            open={openModal}
            handleClose={() => {
              setOpenModal(false);
            }}
            loading={loadingFunction}
            content={
              checkCase === 1
                ? "Bạn chắc chắn muốn khoá tài khoản này ?"
                : checkCase === 2
                ? "Bạn chắc chắn muốn xoá tất cả dữ liệu của tài khoản này ?"
                : "Bạn chắc chắn muốn mở khoá tài khoản này ?"
            }
            callBackFunction={
              checkCase === 1
                ? handleLockAccount
                : checkCase === 2
                ? handleDeleteData
                : handleUnlockAccount
            }
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

export default AccountManagement;
