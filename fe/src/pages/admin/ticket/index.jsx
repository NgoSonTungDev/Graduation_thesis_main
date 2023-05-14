import ReplayOutlinedIcon from "@mui/icons-material/ReplayOutlined";
import { Button, IconButton, MenuItem, TextField } from "@mui/material";
import _ from "lodash";
import queryString from "query-string";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosClient from "../../../api/axiosClient";
import ErrorEmpty from "../../../components/emty_data";
import LoadingBar from "../../../components/loadding/loading_bar";
import GetDataPlaceItem from "../../../components/modle_find_place";
import SidebarAdmin from "../../../components/narbar_admin";
import PaginationCpn from "../../../components/pagination";
import { clearByIdPlace } from "../../../redux/place/placeSlice";
import { DataPlaceById } from "../../../redux/selectors";
import { toastify } from "../../../utils/common";
import "./style.scss";
import TableTicket from "./table-ticket";

const TicketManagement = () => {
  const [data, setData] = React.useState({});
  const [listData, setListData] = React.useState([]);
  const [listDataAgent, setListDataAgent] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [agentId, setAgentId] = React.useState("");
  const dataPlace = useSelector(DataPlaceById);
  const [openModal, setOpenModal] = useState(false);
  const [payload, setPayload] = useState({
    pageNumber: 1,
    limit: 10,
    placeId: "",
  });

  const dispatch = useDispatch();

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleChangePage = (page) => {
    setPayload({ ...payload, pageNumber: Number(page) });
  };

  const handleDeleteData = (id) => {
    setListData(
      listData?.filter((item) => {
        return item._id !== id;
      })
    );
  };

  const fetchDataAgent = () => {
    setLoading(true);
    axiosClient
      .get(`/user/get-all?isAdmin=2&isLock=false`)
      .then((res) => {
        setListDataAgent([
          { id: "", label: "Tất cả" },
          ...res.data.data.data.map((item) => {
            return { id: item._id, label: item.userName };
          }),
        ]);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        toastify("error", err.response.data.message || "Lỗi hệ thông !");
      });
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
    fetchDataAgent();
  }, [payload]);

  useEffect(() => {
    setLoading(true);
    axiosClient
      .get(
        `/ticket/get-all-ticket?${queryString.stringify({
          pageNumber: 1,
          limit: 10,
          placeId: dataPlace ? dataPlace._id : "",
          salesAgentId: agentId === "Tất cả" ? "" : agentId,
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
  }, [dataPlace, agentId]);

  useEffect(() => {
    return () => {
      dispatch(clearByIdPlace());
    };
  }, []);

  const renderForm = () => {
    return (
      <div style={{ width: "100%", height: "100vh" }}>
        <div style={{ width: "100%", height: "90%" }}>
          <div
            style={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              gap: "15px",
              flexDirection: "row",
            }}
          >
            <TextField
              select
              label="Đại lý"
              style={{ width: "200px", marginTop: "10px" }}
              size="small"
              onChange={(e) => {
                setAgentId(e.target.value);
              }}
            >
              {listDataAgent?.map((item, index) => (
                <MenuItem value={item.id} key={index}>
                  {item.label}
                </MenuItem>
              ))}
            </TextField>
            <Button
              variant="outlined"
              style={{ marginTop: "10px" }}
              onClick={handleOpenModal}
            >
              Tìm kiếm theo địa điểm
            </Button>
            <IconButton
              size="small"
              sx={{
                border: "1px solid",
                marginTop: "10px",
              }}
            >
              <ReplayOutlinedIcon
                onClick={() => {
                  dispatch(clearByIdPlace());
                  setAgentId("");
                }}
              />
            </IconButton>
          </div>
          {loading ? (
            <LoadingBar loading={loading} />
          ) : _.isEmpty(listData) ? (
            <ErrorEmpty />
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

export default TicketManagement;
