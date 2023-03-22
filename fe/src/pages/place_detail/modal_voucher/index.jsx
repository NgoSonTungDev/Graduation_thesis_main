import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import axiosClient from "../../../api/axiosClient";
import ErrorEmpty from "../../../components/emty_data";
import LoadingBar from "../../../components/loadding/loading_bar";
import { formatMoney, toastify } from "../../../utils/common";
import "./style.scss";

const ModalVoucher = ({ open, handleClose, placeId }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const CopyText = (CodeVoucher) => {
    navigator.clipboard.writeText(`${CodeVoucher}`);
    toastify("success", "Sao chép mã thành công !");
  };

  const fetchData = () => {
    setLoading(true);
    axiosClient
      .get(`/voucher/get-by-place/${placeId}`)
      .then((res) => {
        setData(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        toastify("error", err.response.data.message || "Lỗi hệ thông !");
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" sx={{ textAlign: "center" }}>
        <b>Chọn mã khuyến mãi</b>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <div className="box_sale_agent">
            {loading ? (
              <LoadingBar loading={loading} />
            ) : _.isEmpty(data) ? (
              <ErrorEmpty />
            ) : (
              <TableContainer component={Paper}>
                <Table sx={{ width: "100%" }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Mã khuyến mãi</TableCell>
                      <TableCell align="center">Sự kiện</TableCell>
                      <TableCell align="center">Giá giảm</TableCell>
                    </TableRow>
                  </TableHead>
                  {data.map((item) => (
                    <TableBody
                      className="table_sale_agent"
                      onClick={() => {
                        CopyText(item.codeVoucher);
                        handleClose();
                      }}
                    >
                      <TableCell align="center">{item?.codeVoucher}</TableCell>
                      <TableCell align="center">{item.title}</TableCell>
                      <TableCell align="center">
                        {formatMoney(item.price)}
                      </TableCell>
                    </TableBody>
                  ))}
                </Table>
              </TableContainer>
            )}
          </div>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

export default ModalVoucher;
