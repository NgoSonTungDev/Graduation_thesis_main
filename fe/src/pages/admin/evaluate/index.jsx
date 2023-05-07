import ReplayOutlinedIcon from "@mui/icons-material/ReplayOutlined";
import { Box, Button, IconButton } from "@mui/material";
import _ from "lodash";
import queryString from "query-string";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosClient from "../../../api/axiosClient";
import ErrorEmpty from "../../../components/emty_data";
import LoadingBar from "../../../components/loadding/loading_bar";
import GetDataPlaceItem from "../../../components/modle_find_place";
import SidebarAdmin from "../../../components/narbar_admin";
import { clearByIdPlace } from "../../../redux/place/placeSlice";
import { DataPlaceById } from "../../../redux/selectors";
import { toastify } from "../../../utils/common";
import "./style.scss";
import TableEvaluate from "./table-evaluate";

const EvaluateManagement = () => {
  const [listData, setListData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [openModal, setOpenModal] = useState(false);
  const dataPlace = useSelector(DataPlaceById);
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
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
      .get(
        `/evaluate/get-all?${queryString.stringify({
          placeId: !_.isEmpty(dataPlace) ? dataPlace._id : "",
        })}`
      )
      .then((res) => {
        setListData(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        toastify("error", err.response.data.message || "Lỗi hệ thông !");
      });
  };

  useEffect(() => {
    fetchData();
    window.scrollTo(0, 0);
  }, [dataPlace._id]);

  useEffect(() => {
    return () => {
      dispatch(clearByIdPlace());
    };
  }, []);

  const renderForm = () => {
    return (
      <div>
        <Box sx={{ width: "100%", height: "100vh", overflow: "hidden" }}>
          <Box
            sx={{
              height: "7%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Button
              variant="outlined"
              size="medium"
              sx={{ marginRight: "30px" }}
              onClick={handleOpenModal}
            >
              Tìm Kiếm Bài Viết
            </Button>
            <IconButton
              size="small"
              sx={{
                border: "1px solid",
                marginLeft: "20px",
              }}
            >
              <ReplayOutlinedIcon
                onClick={() => {
                  dispatch(clearByIdPlace());
                }}
              />
            </IconButton>
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
              ) : _.isEmpty(listData) ? (
                <ErrorEmpty />
              ) : (
                <TableEvaluate
                  data={listData}
                  deleteData={handleDeleteData}
                  callBackApi={fetchData}
                />
              )}
            </div>
          </div>
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
