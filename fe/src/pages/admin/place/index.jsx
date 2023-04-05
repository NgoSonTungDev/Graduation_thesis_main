import { Button } from "@mui/material";
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
import { clearByIdPlace, dataPlace } from "../../../redux/place/placeSlice";
import { IconButton, TextField } from "@mui/material";
import ReplayOutlinedIcon from "@mui/icons-material/ReplayOutlined";
import TablePlace from "./table_place";
import ModalAddPlace from "./modal_add_place";

const PlaceMangement = () => {
    const [openModalAddTicket, setOpenModalAddTicket] = React.useState(false);
    const [data, setData] = React.useState({});
    const [listData, setListData] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const dataPlace = useSelector(DataPlaceById);
    const [openModal, setOpenModal] = useState(false);
    const dispatch = useDispatch();

    const handleClickOpenModalAddTicket = () => {
        setOpenModalAddTicket(true);
    };

    const handleCloseModalAddTicket = () => {
        setOpenModalAddTicket(false);
    };
    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const [payload, setPayload] = useState({
        pageNumber: 1,
        limit: 12,
        placeName: "",
        type: "",
        variability: "",
        purpose: "",
        location: ""
    });

    const handleChangePage = (page) => {
        setPayload({ ...payload, pageNumber: Number(page) });
    };

    const handleUpdateData = (id, value) => {
        const index = listData.findIndex((e) => e._id === id);
        if (index !== -1) {
            listData.splice(index, 1, {
                ...listData[index],
                type: value.type,
                purpose: value.purpose,
                name:value.name,
                location:value.location,
                address:value.address,
                
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

    const fetchData = () => {
        setLoading(true);
        axiosClient
            .get(`/place/all?${queryString.stringify(payload)}`)
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

    const reset = () => {
        fetchData();
    }

    // useEffect(() => {
    //     setLoading(true);
    //     axiosClient
    //         .get(
    //             `/place/all?${queryString.stringify({
    //                 pageNumber: 1,
    //                 limit: 12,
    //                 placeName: dataPlace ? dataPlace.name : "",
    //                 type: "",
    //                 variability: "",
    //                 purpose: "",
    //                 location: ""
    //             })}`
    //         )
    //         .then((res) => {
    //             setData(res.data.data);
    //             setListData(res.data.data.data);
    //             setLoading(false);
    //         })
    //         .catch((err) => {
    //             setLoading(false);
    //             toastify("error", err.response.data.message || "Lỗi hệ thông !");
    //         });
    // }, [dataPlace]);

    const renderForm = () => {
        return (
            <div style={{ width: "100%", height: "100vh" }}>
                <div style={{ width: "100%", height: "90%" }}>
                    <Button
                        variant="outlined"
                        style={{ marginTop: "10px" }}
                        onClick={handleClickOpenModalAddTicket}
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
                                reset();
                            }}
                        />
                    </IconButton>
                    {loading ? (
                        <LoadingBar />
                    ) : (
                        <div className="box_table">
                            <TablePlace data={listData}
                                deleteData={handleDeleteData}
                                updateData={handleUpdateData}
                            />
                        </div>
                    )}
                    <ModalAddPlace
                        open={openModalAddTicket}
                        handleClose={handleCloseModalAddTicket}
                        callBackApi={fetchData}
                    />
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

export default PlaceMangement;
