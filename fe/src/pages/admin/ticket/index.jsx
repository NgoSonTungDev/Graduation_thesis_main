import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import axiosClient from "../../../api/axiosClient";
import LoadingBar from "../../../components/loadding/loading_bar";
import { toastify } from "../../../utils/common";
import queryString from "query-string";
import TableTicket from "./table-ticket";
import SidebarAdmin from "../../../components/narbar_admin";
import PaginationCpn from "../../../components/pagination";
import { DataPlaceById } from "../../../redux/selectors";
import { useSelector, useDispatch } from "react-redux";
import GetDataPlaceItem from "../../../components/modle_find_place";
import { clearByIdPlace } from "../../../redux/place/placeSlice";
import { IconButton, TextField } from "@mui/material";
import ReplayOutlinedIcon from "@mui/icons-material/ReplayOutlined";
import "./style.scss";

const TicketMangement = () => {
  const [data, setData] = React.useState({});
  const [listData, setListData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const dataPlace = useSelector(DataPlaceById);
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const [payload, setPayload] = useState({
    pageNumber: 1,
    limit: 10,
    placeId: "",
  });

  const handleChangePage = (page) => {
    setPayload({ ...payload, pageNumber: Number(page) });
  };

  const handleDeleteData = (id) => {
    // setData(
    //   {...data, data.data: data.data.filter((item) => {
    //     return item._id !== id;
    //   })}
    // );
    setListData(
      listData?.filter((item) => {
        return item._id !== id;
      })
    );
  };

  const fetchData = () => {
    setLoading(true);
    axiosClient
      .get(`/ticket/get-all-ticket?${queryString.stringify(payload)}`)
      .then((res) => {
        setData(res.data.data);
        setListData(res.data.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        toastify("error", err.response.data.message || "Lỗi hệ thông !");
      });
  };

  useEffect(() => {
    fetchData();
  }, [payload]);

  useEffect(() => {
    setLoading(true);
    axiosClient
      .get(
        `/ticket/get-all-ticket?${queryString.stringify({
          pageNumber: 1,
          limit: 10,
          placeId: dataPlace ? dataPlace._id : "",
        })}`
      )
      .then((res) => {
        setData(res.data.data);
        setListData(res.data.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        toastify("error", err.response.data.message || "Lỗi hệ thông !");
      });
  }, [dataPlace]);

  const renderForm = () => {
    return (
      <div style={{ width: "100%", height: "100vh" }}>
        <div style={{ width: "100%", height: "90%" }}>
          <Button
            variant="outlined"
            style={{ marginTop: "10px" }}
            onClick={handleOpenModal}
          >
            Tìm kiếm
          </Button>
          <IconButton
            size="small"
            sx={{
              border: "1px solid",
              marginLeft: "20px",
              marginTop: "10px",
              // margin:"10px 0px 20px 0px"
            }}
          >
            <ReplayOutlinedIcon
              onClick={() => {
                dispatch(clearByIdPlace());
              }}
            />
          </IconButton>
          {loading ? (
            <LoadingBar />
          ) : (
            <div className="box_table">
              <TableTicket data={listData} deleteData={handleDeleteData} />
            </div>
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

export default TicketMangement;
