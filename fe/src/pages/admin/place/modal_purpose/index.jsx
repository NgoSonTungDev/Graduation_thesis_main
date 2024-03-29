import { Button, TextField } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import _ from "lodash";
import React, { useState } from "react";
import ErrorEmpty from "../../../../components/emty_data";
// import "./style.scss";
import axiosClient from "../../../../api/axiosClient";
import { toastify } from "../../../../utils/common";
import ModalConfirm from "../../../../components/modal_confirm";

const ModalPurpose = ({
  open,
  handleClose,
  dataPurpose,
  deleDataPurpose,
  callBackApi,
}) => {
  const [loading, setLoading] = React.useState(false);

  const [purpose, setPurpose] = useState("");
  const [openDelete, setOpenDelete] = useState(false);

  const handleClickOpenModalDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseModalDelete = () => {
    setOpenDelete(false);
  };
  const handleAddPurpose = () => {
    setLoading(true);
    if (purpose === "") {
      toastify("info", "Phải nhập dầy đủ thông tin");
    }
    axiosClient
      .post("/purpose/create", {
        name: purpose,
      })
      .then((res) => {
        setLoading(false);
        setPurpose("");
        handleClose();
        toastify("success", res.data.message || "Thêm thành công!");
        callBackApi();
      })
      .catch((err) => {
        setLoading(false);
        toastify("error", err.response.data.message || "Lỗi hệ thông !");
      });
  };

  const handleDeletePurpose = () => {
    setLoading(true);
    axiosClient
      .delete(`/purpose/delete/${purpose}`)
      .then((res) => {
        setLoading(false);
        handleCloseModalDelete();
        handleClose();
        setPurpose("");
        toastify("success", res.data.message || "Xóa thành công !");
        deleDataPurpose(purpose);
      })
      .catch((err) => {
        setLoading(false);
        handleCloseModalDelete();
        handleClose();
        toastify("error", err.response.data.message || "Lỗi hệ thông !");
      });
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} maxWidth="1000px">
        <DialogTitle sx={{ textAlign: "center", fontWeight: "600" }}>
          Quản Lý Mục Đích
        </DialogTitle>
        <DialogTitle sx={{ textAlign: "center" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginRight: "15px",
            }}
          >
            <TextField
              label="Nhập mục đích muốn thêm"
              value={purpose}
              onChange={(e) => {
                setPurpose(e.target.value);
              }}
              size="small"
            ></TextField>
            <Button onClick={handleAddPurpose}>Thêm</Button>
          </div>
        </DialogTitle>
        <DialogContent
          sx={{
            overflowY: "scroll",
            width: "93,5%",
            height: "93%",
            // overflow: "hidden",
            "&::-webkit-scrollbar": {
              width: "0px",
            },
          }}
        >
          <div>
            {_.isEmpty(dataPurpose) ? (
              <ErrorEmpty />
            ) : (
              <TableContainer component={Paper}>
                <Table
                  sx={{ minWidth: 650 }}
                  size="small"
                  aria-label="a dense table"
                >
                  <TableHead>
                    <TableRow sx={{ padding: "5px 0" }}>
                      <TableCell
                        align="left"
                        style={{ fontWeight: "600", width: "200px" }}
                      >
                        Tên Mục Đích
                      </TableCell>

                      <TableCell align="right" style={{ fontWeight: "600" }}>
                        Chức Năng
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  {dataPurpose.map((item, index) => {
                    return (
                      <TableBody key={index}>
                        <TableCell
                          align="left"
                          sx={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            // maxWidth: "150px",
                          }}
                        >
                          {item?.name}
                        </TableCell>

                        <TableCell align="right" sx={{ flexWrap: "nowrap" }}>
                          <Button
                            onClick={() => {
                              handleClickOpenModalDelete();
                              setPurpose(item._id);
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
              callBackFunction={handleDeletePurpose}
            />
          </div>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </div>
  );
};

export default ModalPurpose;
