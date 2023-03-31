import { yupResolver } from "@hookform/resolvers/yup";
import { Button, TextField } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import _ from "lodash";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import axiosClient from "../../../../api/axiosClient";
import ErrorEmpty from "../../../../components/emty_data";
import ModalConfirm from "../../../../components/modal_confirm";
import { formatMoney, toastify } from "../../../../utils/common";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const TablePlace = ({ data, deleteData }) => {
    const [editingRowIndex, setEditingRowIndex] = useState(null);
    const [ticketId, setTicketId] = useState("");
    const [loading, setLoading] = React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);
    const [valueCheckValidate, setValueCheckValidate] = useState({
        // startingPrice: 0,
        // LastPrice: 0,
    });

    const [age, setAge] = React.useState('');
    const validationInput = yup.object().shape({
        adultTicket: yup
            .number()
            .required("Không được để trống.")
            .min(
                Number(valueCheckValidate.startingPrice),
                "Không nằm trong khoảng giá quy định !"
            )
            .typeError("Không được để trống")
            .max(
                Number(valueCheckValidate.LastPrice),
                "Không nằm trong khoảng giá quy định !"
            ),
        childTicket: yup
            .number()
            .required("Không được để trống.")
            .min(
                Number(valueCheckValidate.startingPrice),
                "Không nằm trong khoảng giá quy định !"
            )
            .typeError("Không được để trống")
            .max(
                Number(valueCheckValidate.LastPrice),
                "Không nằm trong khoảng giá quy định !"
            ),
        numberTickets: yup
            .number()
            .min(50, "Ít nhất có 50 vé")
            .max(500, "Tối đa 500 vé")
            .typeError("Không được để trống")
            .required("Không được để trống."),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            adultTicket: 0,
            childTicket: 0,
            numberTickets: 0,
        },
        resolver: yupResolver(validationInput),
    });

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const handleClickOpenModalDelete = () => {
        setOpenDelete(true);
    };

    const handleCloseModalDelete = () => {
        setOpenDelete(false);
    };

    const handleEditButtonClick = (id, rowIndex) => {
        setEditingRowIndex(rowIndex);
        setTicketId(id);
        const row = data[rowIndex];

        setValueCheckValidate({
            startingPrice: row.placeId?.startingPrice,
            LastPrice: row.placeId?.LastPrice,
        });

        // reset({
        //   ...row,
        // });
    };

    const handleDelete = () => {
        setLoading(true);

        // axiosClient
        //   .delete(`/ticket/delete/${ticketId}`)
        //   .then((res) => {
        //     setLoading(false);
        //     toastify("success", res.data.message || "Xóa thành công !");
        //     handleCloseModalDelete();
        //     deleteData(ticketId);
        //   })
        //   .catch((err) => {
        //     setLoading(false);
        //     toastify("error", err.response.data.message || "Lỗi hệ thông !");
        //   });
    };

    return (
        <div>
            {_.isEmpty(data) ? (
                <ErrorEmpty />
            ) : (
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow sx={{ padding: "5px 0" }}>
                                <TableCell align="center">Tên Địa Điểm</TableCell>
                                <TableCell align="center">Địa Điểm</TableCell>
                                <TableCell align="center">Tỉnh/Thành phố</TableCell>
                                <TableCell align="center">Khoảng giá</TableCell>
                                <TableCell align="center">Mục Đích</TableCell>
                                <TableCell align="center">Loại</TableCell>
                                <TableCell align="center">Chức năng</TableCell>
                            </TableRow>
                        </TableHead>

                        {data.map((item, index) => {
                            return (
                                <TableBody key={index}>
                                    <TableCell
                                        align="left"
                                        sx={{
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            whiteSpace: "nowrap",
                                            maxWidth: "150px",
                                        }}
                                    >
                                        {item?.name}
                                    </TableCell>
                                    <TableCell
                                        align="left"
                                        sx={{
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            whiteSpace: "nowrap",
                                            maxWidth: "150px",
                                        }}
                                    >
                                        {item?.location}
                                    </TableCell>
                                    <TableCell
                                        align="left"
                                        sx={{
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            whiteSpace: "nowrap",
                                            maxWidth: "150px",
                                        }}
                                    >
                                        {item?.address}
                                    </TableCell>
                                    <TableCell align="center" sx={{ whiteSpace: "nowrap" }}>
                                        {formatMoney(item?.startingPrice)} -{" "}
                                        {formatMoney(item?.LastPrice)}
                                    </TableCell>
                                    <TableCell align="center">
                                        {editingRowIndex === index ? (
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-label" align="center">Mục Đích</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    label="Chọn Mục Đích"
                                                    error={!!errors?.childTicket}
                                                    {...register("childTicket")}
                                                    helperText={errors.childTicket?.message}
                                                >
                                                    <MenuItem value={1}>Vui Chơi</MenuItem>
                                                    <MenuItem value={2}>Vui Chơi, Giải Trí</MenuItem>
                                                    <MenuItem value={3}>Hẹn Hò</MenuItem>
                                                    <MenuItem value={4}>Ăn Uống</MenuItem>
                                                    <MenuItem value={5}>Sống Ảo</MenuItem>
                                                    <MenuItem value={6}>Phiêu Lưu</MenuItem>
                                                    <MenuItem value={7}>Phiêu Lưu Kí</MenuItem>
                                                </Select>
                                            </FormControl>
                                        ) : (
                                            item?.purpose
                                        )}
                                    </TableCell>
                                    <TableCell
                                        align="left"
                                        sx={{
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            whiteSpace: "nowrap",
                                            maxWidth: "150px",
                                        }}
                                    >
                                        {item?.type}
                                    </TableCell>
                                    <TableCell align="center" sx={{ flexWrap: "nowrap" }}>
                                        {editingRowIndex === index ? (
                                            <>
                                                <Button
                                                // onClick={handleSubmit(handleSaveButtonClick)}
                                                >
                                                    Lưu
                                                </Button>
                                                <Button
                                                    onClick={() => {
                                                        // handleCancelButtonClick();
                                                    }}
                                                >
                                                    Hủy
                                                </Button>{" "}
                                            </>
                                        ) : (
                                            <Button
                                                onClick={() => {
                                                    handleEditButtonClick(item._id, index);
                                                }}
                                            >
                                                Chỉnh sửa
                                            </Button>
                                        )}
                                        <Button
                                            onClick={() => {
                                                // handleClickOpenModalDelete();
                                                // setTicketId(item._id);
                                            }}
                                        >
                                            Xóa
                                        </Button>
                                    </TableCell>
                                </TableBody>
                            );
                        })}
                    </Table>
                </TableContainer>
            )}
            <ModalConfirm
                open={openDelete}
                handleClose={handleCloseModalDelete}
                content={"Bạn có chắt chắn muốn xóa không?"}
                loading={loading}
                callBackFunction={handleDelete}
            />
        </div>
    );
};

export default TablePlace;
