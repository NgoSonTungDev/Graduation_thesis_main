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

const TableTicket = ({ data, deleteData }) => {
  const [ticketId, setTicketId] = useState("");
  const [loading, setLoading] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);

  const handleClickOpenModalDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseModalDelete = () => {
    setOpenDelete(false);
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

  return (
    <div>
      {_.isEmpty(data) ? (
        <ErrorEmpty />
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow sx={{ padding: "5px 0" }}>
                <TableCell align="center">Đại lý</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Địa điểm</TableCell>
                <TableCell align="center">Tỉnh/Thành phố</TableCell>
                <TableCell align="center">Khoảng giá</TableCell>
                <TableCell align="center">Giá vé trẻ em</TableCell>
                <TableCell align="center">Giá vé người lớn</TableCell>
                <TableCell align="center">Số lượng vé</TableCell>
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
                    {item.salesAgentId?.userName}
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
                    {item.salesAgentId?.email}
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
                    {item.placeId?.name}
                  </TableCell>
                  <TableCell align="center">{item.placeId?.location}</TableCell>
                  <TableCell align="center" sx={{ whiteSpace: "nowrap" }}>
                    {formatMoney(item.placeId?.startingPrice)} -{" "}
                    {formatMoney(item.placeId?.LastPrice)}
                  </TableCell>
                  <TableCell align="center">
                    {formatMoney(item.childTicket)}
                  </TableCell>

                  <TableCell align="center">
                    {formatMoney(item.adultTicket)}
                  </TableCell>
                  <TableCell align="center">{item.numberTickets}</TableCell>
                  <TableCell align="center" sx={{ flexWrap: "nowrap" }}>
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

export default TableTicket;
