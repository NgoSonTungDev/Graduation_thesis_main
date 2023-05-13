import React, { useCallback, useEffect } from "react";
import axiosClient from "../../../api/axiosClient";
import SidebarAdmin from "../../../components/narbar_admin";
import { toastify } from "../../../utils/common";
import qs from "query-string";
import LoadingBar from "../../../components/loadding/loading_bar";
import ErrorEmpty from "../../../components/emty_data";
import _ from "lodash";
import { useForm } from "react-hook-form";
import PaginationCpn from "../../../components/pagination";
import ModalConfirm from "../../../components/modal_confirm";
import AccountTable from "./table_account";
import { Box } from "@mui/system";
import TabContext from "@mui/lab/TabContext";
import ModalUpdate from "./modal_update";
import TabList from "@mui/lab/TabList/TabList";
import { Button, MenuItem, Tab, TextField } from "@mui/material";

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
  const [value, setValue] = React.useState(true);
  const [payload, setPayload] = React.useState({
    pageNumber: 1,
    limit: 6,
    userName: "",
    isAdmin: "",
    isLock: "",
  });

  const { watch, register, reset } = useForm({
    defaultValues: {
      userName: "",
      isAdmin: "",
      isLock: "",
    },
  });

  const debounceFnPlaceName = useCallback(
    _.debounce((value) => {
      setPayload({
        ...payload,
        userName: value,
        pageNumber: 1,
      });
    }, 500),
    []
  );

  const handleChange = (e) => {
    const { isLock, isAdmin } = watch();

    setPayload({
      ...payload,
      isAdmin: isAdmin === " " ? "" : isAdmin,
      isLock: isLock === " " ? "" : isLock,
    });
  };

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
    setLoading(true);
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
    handleGetAllUsers();
    window.scrollTo(0, 0);
  }, [payload]);

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
                justifyContent: "right",
              }}
            >
              <TextField
                type="text"
                label="Tên người dùng"
                fullWidth
                size="small"
                inputProps={register("userName")}
                onChange={(e) => {
                  debounceFnPlaceName(e.target.value);
                }}
              />
              <TextField
                select
                label="Loại người dùng"
                fullWidth
                inputProps={register("isAdmin")}
                size="small"
                onChange={handleChange}
              >
                <MenuItem value=" ">Tất cả</MenuItem>
                <MenuItem value="1">Người dùng</MenuItem>
                <MenuItem value="2">Đại lý</MenuItem>
                <MenuItem value="3">Quản trị viên</MenuItem>
              </TextField>
              <TextField
                select
                label="Tài khoản"
                fullWidth
                inputProps={register("isLock")}
                size="small"
                onChange={handleChange}
              >
                <MenuItem value=" ">Tất cả</MenuItem>
                <MenuItem value="false">Đang hoạt động</MenuItem>
                <MenuItem value="true">Đang bị khóa</MenuItem>
              </TextField>
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
        <ModalUpdate fetchData={handleGetAllUsers} data={data.data} />
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
