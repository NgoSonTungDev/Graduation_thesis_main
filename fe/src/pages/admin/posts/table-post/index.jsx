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
import { Image } from "antd";


const TablePost = ({ data, deleteData, active,callBackApi }) => {
  const [postId, setPostId] = useState("");
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
      .delete(`/post/delete/${postId}`)
      .then((res) => {
        setLoading(false);
        toastify("success", res.data.message || "Xóa thành công !");
        handleCloseModalDelete();
        deleteData(postId);
      })
      .catch((err) => {
        setLoading(false);
        toastify("error", err.response.data.message || "Lỗi hệ thông !");
      });
  };

  const handleUpdatePullic = () => {
    setLoading(true);

    axiosClient
      .put(`/post/update-status/${postId}`)
      .then((res) => {
        setLoading(false);
        toastify("success", res.data.message || "Cập nhật thành công !");
        handleCloseModalDelete();
        callBackApi()
      })
      .catch((err) => {
        setLoading(false);
        toastify("error", err.response.data.message || "Lỗi hệ thông !");
        handleCloseModalDelete();
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
                <TableCell align="center"  style={{ fontWeight: "600" }}>Tên người đăng</TableCell>
                <TableCell align="center"  style={{ fontWeight: "600" }}>Tên bài viết</TableCell>
                <TableCell align="center"  style={{ fontWeight: "600" }}>Ảnh bài viết</TableCell>
                <TableCell align="center"  style={{ fontWeight: "600" }}>Ngày tạo</TableCell>
                <TableCell align="center"  style={{ fontWeight: "600" }}>Nôi dung</TableCell>
                <TableCell align="center"  style={{ fontWeight: "600" }}>Chức năng</TableCell>
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
                    {item.userId?.userName}
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
                    {item.placeId?.name}
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
                    <Image width={56} height={56} src={item?.image} alt="" />
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
                    {moment(item?.createdAt).format("DD/MM/YYYY")}
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
                  {active === true ? (
                    <TableCell align="center">
                      <Button
                        onClick={() => {
                          handleClickOpenModalDelete();
                          setPostId(item._id);
                        }}
                      >
                        Xóa
                      </Button>
                    </TableCell>
                  ) : (
                    <TableCell align="center">
                      <div>
                        <Button
                          onClick={() => {
                            handleClickOpenModalUpdate();
                            setPostId(item._id);
                          }}
                        >
                          Phê duyệt
                        </Button>
                        <Button
                          onClick={() => {
                            handleClickOpenModalDelete();
                            setPostId(item._id);
                          }}
                        >
                          Xóa
                        </Button>
                      </div>
                    </TableCell>
                  )}
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
      <ModalConfirm
        open={openUpdate}
        handleClose={handleCloseModalUpdate}
        content={"Bạn có chắt chắn muốn duyệt bài viết không?"}
        loading={loading}
        callBackFunction={handleUpdatePullic}
      />
    </div>
  );
};

export default TablePost;