import TabContext from "@mui/lab/TabContext/TabContext";
import TabList from "@mui/lab/TabList/TabList";
import { Box, Button, Tab } from "@mui/material";
import _ from "lodash";
import queryString from "query-string";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosClient from "../../../api/axiosClient";
import ErrorEmpty from "../../../components/emty_data";
import LoadingBar from "../../../components/loadding/loading_bar";
import GetDataPlaceItem from "../../../components/modle_find_place";
import SidebarAdmin from "../../../components/narbar_admin";
import { DataPlaceById } from "../../../redux/selectors";
import { toastify } from "../../../utils/common";
import "./style.scss";
import TableEvaluate from "./table-evaluate";

const EvaluateManagement = () => {
  const [data, setData] = React.useState({});
  const [listData, setListData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [openModal, setOpenModal] = useState(false);
  const dataPlace = useSelector(DataPlaceById);
  const [value, setValue] = React.useState(true);

  const [payload, setpayLoad] = useState({
    // pageNumber: 1,
    // placeId: "",
    // active: value,
    // limit: 5,
  });

  const handleChangeTab = (e, newValue) => {
    setValue(newValue);
    setpayLoad({
      ...payload,
      active: newValue,
      pageNumber: 1,
    });
  };

  const dispatch = useDispatch();

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleChangePage = (page) => {
    setpayLoad({ ...payload, pageNumber: Number(page) });
  };

  const handleDeleteData = (id) => {
    setListData(
      listData?.filter((item) => {
        return item._id !== id;
      })
    );
  };

  const fetchData = () => {
    setLoading(true);
    axiosClient
      .get(`/evaluate/get-all${queryString.stringify(payload)}`)
      .then((res) => {
        setData(res.data.data);
        console.log("vào đay rồi", res.data.data);
        setListData(res.data.data);
        setLoading(false);
        // setOpenModal(false);
        // dispatch(clearByIdPlace());
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

  useEffect(() => {
    setLoading(true);
    axiosClient
      .get(
        `/evaluate/get-all?${queryString.stringify({
          pageNumber: 1,
          placeId: !_.isEmpty(dataPlace) ? dataPlace._id : "",
          active: value,
          limit: 6,
        })}`
      )
      .then((res) => {
        setData(res.data.data);
        setListData(res.data.data);
        setLoading(false);
        // setOpenModal(false);
        // dispatch(clearByIdPlace());
      })
      .catch((err) => {
        setLoading(false);
        toastify("error", err.response.data.message || "Lỗi hệ thông !");
      });
  }, [dataPlace]);

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
                <Tab label="Đánh Giá" value={true} />
                <Button
                  size="medium"
                  sx={{ marginRight: "30px" }}
                  onClick={handleOpenModal}
                >
                  Tìm Kiếm Bài Viết
                </Button>
              </TabList>
            </Box>
            <div
              style={{
                width: "100%",
                height: "90vh",
                marginTop: "10px",
              }}
            >
              <div className="evaluate">
                {loading ? (
                  <LoadingBar loading={loading} />
                ) : _.isEmpty(data) ? (
                  <ErrorEmpty />
                ) : (
                  <TableEvaluate
                    data={listData}
                    deleteData={handleDeleteData}
                    active={value}
                    callBackApi={fetchData}
                  />
                )}
              </div>
            </div>
          </TabContext>
        </Box>
        {openModal && (
          <GetDataPlaceItem openDialog={openModal} onClose={handleCloseModal} />
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

export default EvaluateManagement;
