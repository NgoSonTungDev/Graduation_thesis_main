import { Box, Button, Tab } from "@mui/material";
import React, { useEffect, useState } from "react";
import axiosClient from "../../../api/axiosClient";
import LoadingBar from "../../../components/loadding/loading_bar";
import { toastify } from "../../../utils/common";
import queryString from "query-string";
import SidebarAdmin from "../../../components/narbar_admin";
import PaginationCpn from "../../../components/pagination";
import { DataPlaceById } from "../../../redux/selectors";
import { useSelector, useDispatch } from "react-redux";
import GetDataPlaceItem from "../../../components/modle_find_place";
import { clearByIdPlace } from "../../../redux/place/placeSlice";
import { IconButton, TextField } from "@mui/material";
import ReplayOutlinedIcon from "@mui/icons-material/ReplayOutlined";
import TablePost from "./table-post";
import ErrorEmpty from "../../../components/emty_data";
import TabList from "@mui/lab/TabList/TabList";
import TabContext from "@mui/lab/TabContext/TabContext";
import _ from "lodash";

const PostManagement = () => {
  const [data, setData] = React.useState({});
  const [listData, setListData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [openModal, setOpenModal] = useState(false);
  const dataPlace = useSelector(DataPlaceById);
  const [value, setValue] = React.useState(true);

  const [payload, setpayLoad] = useState({
    pageNumber: 1,
    placeId: "",
    active: value,
    limit: 5,
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
      .get(`post/all?${queryString.stringify(payload)}`)
      .then((res) => {
        setData(res.data.data);
        setListData(res.data.data.data);
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
        `/post/all?${queryString.stringify({
          pageNumber: 1,
          placeId: !_.isEmpty(dataPlace) ? dataPlace._id : "",
          active: value,
          limit: 5,
        })}`
      )
      .then((res) => {
        setData(res.data.data);
        setListData(res.data.data.data);
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
                <Tab label="Đã phê duyệt" value={true} />
                <Tab label="Chờ phê duyệt" value={false} />
              </TabList>
              <Button
                size="medium"
                sx={{ marginRight: "30px" }}
                onClick={handleOpenModal}
              >
                Tìm Kiếm Bài Viết
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
                  height: "90%",
                  overflowY: "scroll",
                  overflow: "hidden",
                  "&::-webkit-scrollbar": {
                    width: "0px",
                  },
                }}
              >
                {loading ? (
                  <LoadingBar loading={loading} />
                ) : _.isEmpty(data) ? (
                  <ErrorEmpty />
                ) : (
                  <TablePost
                    data={listData}
                    deleteData={handleDeleteData}
                    active={value}
                    callBackApi={fetchData}
                  />
                )}
              </div>
              <div style={{ witdh: "100%", height: "10%" }}>
                {data?.data && data?.data?.length > 0 && (
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

export default PostManagement;
