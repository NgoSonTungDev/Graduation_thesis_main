import ReplayOutlinedIcon from "@mui/icons-material/ReplayOutlined";
import { Button, IconButton } from "@mui/material";
import _ from "lodash";
import queryString from "query-string";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosClient from "../../../api/axiosClient";
import LoadingBar from "../../../components/loadding/loading_bar";
import GetDataPlaceItem from "../../../components/modle_find_place";
import SidebarAdmin from "../../../components/narbar_admin";
import PaginationCpn from "../../../components/pagination";
import { clearByIdPlace } from "../../../redux/place/placeSlice";
import { DataPlaceById } from "../../../redux/selectors";
import { toastify } from "../../../utils/common";
import ModalAddPlace from "./modal_add_place";
import TablePlace from "./table_place";
import "./style.scss";
import ModalType from "./modal_type";
import ModalPurpose from "./modal_purpose";
import ErrorEmpty from "../../../components/emty_data";

const PlaceMangement = () => {
  const [openModalAddPlace, setOpenModalAddPlace] = React.useState(false);
  const [data, setData] = React.useState({});
  const [listData, setListData] = React.useState([]);
  const [listType, setListType] = useState([]);
  const [listPurpose, setListPurpose] = useState([]);

  const [loading, setLoading] = React.useState(false);
  const dataPlace = useSelector(DataPlaceById);
  const [openModal, setOpenModal] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [openModalType, setOpenModalType] = useState(false);
  const [openModalPurpose, setOpenModalPurpose] = useState(false);

  const dispatch = useDispatch();

  const handleClickOpenModalAddPlace = () => {
    setOpenModalAddPlace(true);
  };

  const handleCloseModalAddPlace = () => {
    setOpenModalAddPlace(false);
  };

  const handleClickOpenModalType = () => {
    setOpenModalType(true);
  };

  const handleCloseModalAdType = () => {
    setOpenModalType(false);
  };

  const handleClickOpenModalPurpose = () => {
    setOpenModalPurpose(true);
  };

  const handleCloseModalPurpose = () => {
    setOpenModalPurpose(false);
  };
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleChangePage = (page) => {
    setPageNumber(page);
  };

  const handleUpdateData = (id, value) => {
    const index = listData.findIndex((e) => e._id === id);
    if (index !== -1) {
      listData.splice(index, 1, {
        ...listData[index],
        type: value.type,
        purpose: value.purpose,
        name: value.name,
        location: value.location,
        address: value.address,
        startingPrice: value.startingPrice,
        LastPrice: value.LastPrice,
      });
    }
  };

  const handleDeleteData = (id) => {
    setListData(
      listData?.filter((item) => {
        return item._id !== id;
      })
    );
  };

  const handleDeleteDataType = (id) => {
    setListType(
      listType?.filter((item) => {
        return item._id !== id;
      })
    );
  };

  const handleDeleteDataPurpose = (id) => {
    setListPurpose(
      listPurpose?.filter((item) => {
        return item._id !== id;
      })
    );
  };

  const fetchData = () => {
    setLoading(true);
    axiosClient
      .get(
        `/place/all?${queryString.stringify({
          pageNumber: !_.isEmpty(dataPlace) ? 1 : Number(pageNumber),
          limit: 10,
          placeName: !_.isEmpty(dataPlace) ? dataPlace.name : "",
          type: [],
          variability: "",
          purpose: [],
          location: "",
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
  };

  const getApiType = () => {
    axiosClient
      .get("/type/all")
      .then((res) => {
        setListType(res.data.data);
      })
      .catch((err) => {
        toastify("error", err.response.data.message || "Lỗi hệ thông !");
      });
  };

  const getApiPurpose = () => {
    axiosClient
      .get("/purpose/all")
      .then((res) => {
        setListPurpose(res.data.data);
      })
      .catch((err) => {
        toastify("error", err.response.data.message || "Lỗi hệ thông !");
      });
  };

  useEffect(() => {
    getApiType();
    getApiPurpose();
  }, []);

  useEffect(() => {
    fetchData();
  }, [dataPlace.name, pageNumber]);

  useEffect(() => {
    return () => {
      dispatch(clearByIdPlace());
    };
  }, []);

  const renderForm = () => {
    return (
      <div style={{ width: "100%", height: "100vh" }}>
        <div style={{ width: "100%", height: "90%", paddingTop: "1%" }}>
          <Button
            variant="outlined"
            style={{ marginTop: "10px" }}
            onClick={handleClickOpenModalAddPlace}
          >
            Thêm địa điểm
          </Button>
          <Button
            variant="outlined"
            style={{ marginTop: "10px", marginLeft: "20px" }}
            onClick={handleOpenModal}
          >
            Tìm kiếm
          </Button>
          <Button
            variant="outlined"
            style={{ marginTop: "10px", marginLeft: "20px" }}
            onClick={handleClickOpenModalType}
          >
            Quản lý loại
          </Button>
          <Button
            variant="outlined"
            style={{ marginTop: "10px", marginLeft: "20px" }}
            onClick={handleClickOpenModalPurpose}
          >
            Quản lý mục đích
          </Button>
          <IconButton
            size="small"
            sx={{
              border: "1px solid",
              marginLeft: "20px",
              marginTop: "10px",
            }}
          >
            <ReplayOutlinedIcon
              onClick={() => {
                dispatch(clearByIdPlace());
                setPageNumber(1);
              }}
            />
          </IconButton>

          {loading ? (
          <LoadingBar loading={loading} />
        ) : _.isEmpty(listData) ? (
          <ErrorEmpty />
        ) :  (
            <div className="box_table_place">
              <TablePlace
                data={listData}
                deleteData={handleDeleteData}
                updateData={handleUpdateData}
                callBackApi={fetchData}
              />
            </div>
          )}
        </div>
        <div style={{ witdh: "100%", height: "10%" }}>
          {data?.data && data?.data?.length > 0 && (
            <PaginationCpn
              count={data.totalPage}
              page={pageNumber}
              onChange={handleChangePage}
            />
          )}
        </div>
        {openModal && (
          <GetDataPlaceItem openDialog={openModal} onClose={handleCloseModal} />
        )}
        <ModalAddPlace
          open={openModalAddPlace}
          handleClose={handleCloseModalAddPlace}
          callBackApi={fetchData}
        />
        {loading ? (
          <LoadingBar />
        ) : (
          <div>
            <ModalType
              dataType={listType}
              open={openModalType}
              deleDataType={handleDeleteDataType}
              handleClose={handleCloseModalAdType}
              callBackApi={getApiType}
            />
          </div>
        )}

        {loading ? (
          <LoadingBar  />
        ) : (
          <div>
            <ModalPurpose
              dataPurpose={listPurpose}
              open={openModalPurpose}
              deleDataPurpose={handleDeleteDataPurpose}
              handleClose={handleCloseModalPurpose}
              callBackApi={getApiPurpose}
            />
          </div>
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

export default PlaceMangement;
