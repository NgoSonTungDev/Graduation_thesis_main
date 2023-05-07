import { Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import _ from "lodash";
import moment from "moment";
import React, { useState } from "react";
import axiosClient from "../../../../api/axiosClient";
import ErrorEmpty from "../../../../components/emty_data";
import ModalConfirm from "../../../../components/modal_confirm";
import { toastify } from "../../../../utils/common";

const TableEvaluate = ({ data, deleteData, active, callBackApi }) => {
  const [evaluateId, setEvaluateId] = useState("");
  const [loading, setLoading] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [openUpdate, setOpenUpdate] = React.useState(false);

  const handleClickOpenModalDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseModalDelete = () => {
    setOpenDelete(false);
  };

  const handleClickOpenModalUpdate = () => {
    setOpenUpdate(true);
  };

  const handleCloseModalUpdate = () => {
    setOpenUpdate(false);
  };

  const handleDelete = () => {
    setLoading(true);

    axiosClient
      .delete(`/evaluate/delete/${evaluateId}`)
      .then((res) => {
        setLoading(false);
        toastify("success", res.data.message || "Xóa thành công !");
        handleCloseModalDelete();
        deleteData(evaluateId);
      })
      .catch((err) => {
        setLoading(false);
        toastify("error", err.response.data.message || "Lỗi hệ thông !");
      });
  };

  //   const handleUpdatePullic = () => {
  //     setLoading(true);

  //     axiosClient
  //       .put(`/post/update-status/${evaluateId}`)
  //       .then((res) => {
  //         setLoading(false);
  //         toastify("success", res.data.message || "Cập nhật thành công !");
  //         handleCloseModalDelete();
  //         callBackApi();
  //       })
  //       .catch((err) => {
  //         setLoading(false);
  //         toastify("error", err.response.data.message || "Lỗi hệ thông !");
  //         handleCloseModalDelete();
  //       });
  //   };

  return (
    <div>
      {_.isEmpty(data) ? (
        <ErrorEmpty />
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow sx={{ padding: "5px 0" }}>
                <TableCell align="center" style={{ fontWeight: "600" }}>
                  Tên người đánh giá
                </TableCell>
                <TableCell align="center" style={{ fontWeight: "600" }}>
                  Tên địa điểm
                </TableCell>
                <TableCell align="center" style={{ fontWeight: "600" }}>
                  Đánh Giá
                </TableCell>
                <TableCell align="center" style={{ fontWeight: "600" }}>
                  Ảnh đại diện
                </TableCell>
                <TableCell align="center" style={{ fontWeight: "600" }}>
                  Ngày tạo
                </TableCell>
                <TableCell align="center" style={{ fontWeight: "600" }}>
                  Nôi dung
                </TableCell>
                <TableCell align="center" style={{ fontWeight: "600" }}>
                  Chức năng
                </TableCell>
              </TableRow>
            </TableHead>

            {data.map((item, index) => {
              return (
                <TableBody key={index}>
                  <TableCell
                    align="center"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      maxWidth: "150px",
                    }}
                  >
                    {item?.userId?.userName}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      maxWidth: "150px",
                    }}
                  >
                    {item?.placeId?.name}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      maxWidth: "150px",
                    }}
                  >
                    {item.rating}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      maxWidth: "150px",
                    }}
                  >
                    <img
                      width={56}
                      height={56}
                      src={item?.userId?.avt}
                      alt=""
                    />
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      maxWidth: "150px",
                    }}
                  >
                    {moment(item?.dateTime).format("DD/MM/YYYY")}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      maxWidth: "150px",
                    }}
                  >
                    {item?.content}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      onClick={() => {
                        handleClickOpenModalDelete();
                        setEvaluateId(item._id);
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

export default TableEvaluate;
