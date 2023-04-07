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

const TableTicket = ({ data, updateData, deleteData }) => {
  const [editingRowIndex, setEditingRowIndex] = useState(null);
  const [ticketId, setTicketId] = useState("");
  const [loading, setLoading] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [valueCheckValidate, setValueCheckValidate] = useState({
    startingPrice: 0,
    LastPrice: 0,
  });

  const handleClickOpenModalDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseModalDelete = () => {
    setOpenDelete(false);
  };

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

  const handleEditButtonClick = (id, rowIndex) => {
    setEditingRowIndex(rowIndex);
    setTicketId(id);
    const row = data[rowIndex];

    setValueCheckValidate({
      startingPrice: row.placeId?.startingPrice,
      LastPrice: row.placeId?.LastPrice,
    });

    reset({
      ...row,
    });
  };

  const handleDelete = () => {
    setLoading(true);
    axiosClient
      .delete(`/ticket/delete/${ticketId}`)
      .then((res) => {
        setLoading(false);
        toastify("success", res.data.message || "Xóa thành công !");
        handleCloseModalDelete();
        deleteData(ticketId);
      })
      .catch((err) => {
        setLoading(false);
        toastify("error", err.response.data.message || "Lỗi hệ thông !");
      });
  };

  const handleCancelButtonClick = () => {
    setEditingRowIndex(null);
  };

  const handleSaveButtonClick = (data) => {
    updateData(ticketId, data);
    axiosClient
      .put(`/ticket/update/${ticketId}`, {
        adultTicket: data.adultTicket,
        childTicket: data.childTicket,
        numberTickets: data.numberTickets,
      })
      .then((res) => {
        toastify("success", "Cập nhật thành công !");
      })
      .catch((err) => {
        setLoading(false);
        toastify("error", err.response.data.message || "Lỗi hệ thông !");
      });
    setEditingRowIndex(null);
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow sx={{ padding: "5px 0" }}>
              <TableCell align="center">Địa điểm</TableCell>
              <TableCell align="center">Tỉnh/Thành phố</TableCell>
              <TableCell align="center">Khoảng giá</TableCell>
              <TableCell align="center">Giá vé trẻ em</TableCell>
              <TableCell align="center">Giá vé người lớn</TableCell>
              <TableCell align="center">Số lượng vé</TableCell>
              <TableCell align="center">Chức năng</TableCell>
            </TableRow>
          </TableHead>
          {_.isEmpty(data) ? (
            <ErrorEmpty />
          ) : (
            data.map((item, index) => {
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
                    {item.placeId?.name}
                  </TableCell>
                  <TableCell align="center">{item.placeId?.location}</TableCell>
                  <TableCell align="center" sx={{ whiteSpace: "nowrap" }}>
                    {formatMoney(item.placeId?.startingPrice)} -{" "}
                    {formatMoney(item.placeId?.LastPrice)}
                  </TableCell>
                  <TableCell align="center">
                    {editingRowIndex === index ? (
                      <TextField
                        error={!!errors?.childTicket}
                        {...register("childTicket")}
                        type="number"
                        label="Giá vé trẻ em"
                        size="small"
                        sx={{ width: "80%", marginLeft: "10%" }}
                        helperText={errors.childTicket?.message}
                      />
                    ) : (
                      formatMoney(item.childTicket)
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {editingRowIndex === index ? (
                      <TextField
                        error={!!errors?.adultTicket}
                        {...register("adultTicket")}
                        type="number"
                        label="Giá vé trẻ em"
                        size="small"
                        sx={{ width: "80%", marginLeft: "10%" }}
                        helperText={errors.adultTicket?.message}
                      />
                    ) : (
                      formatMoney(item.adultTicket)
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {" "}
                    {editingRowIndex === index ? (
                      <TextField
                        error={!!errors?.numberTickets}
                        {...register("numberTickets")}
                        type="number"
                        label="Giá vé trẻ em"
                        size="small"
                        sx={{ width: "80%", marginLeft: "10%" }}
                        helperText={errors.numberTickets?.message}
                      />
                    ) : (
                      item.numberTickets
                    )}
                  </TableCell>
                  <TableCell align="center" sx={{ flexWrap: "nowrap" }}>
                    {editingRowIndex === index ? (
                      <>
                        <Button onClick={handleSubmit(handleSaveButtonClick)}>
                          Lưu
                        </Button>
                        <Button
                          onClick={() => {
                            handleCancelButtonClick();
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
                        handleClickOpenModalDelete();
                        setTicketId(item._id);
                      }}
                    >
                      Xóa
                    </Button>
                  </TableCell>
                </TableBody>
              );
            })
          )}
        </Table>
      </TableContainer>
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

export default TableTicket;
