import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axiosClient from "../../../api/axiosClient";
import { formatMoney, toastify } from "../../../utils/common";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import LoadingBar from "../../../components/loadding/loading_bar";
import _ from "lodash";
import "./style.scss";
import ErrorEmpty from "../../../components/emty_data";
import { useNavigate } from "react-router-dom";
import { getUserDataLocalStorage } from "../../../utils/localstorage";

const ModalChooseSaleAgent = ({ open, handleClose, placeId }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const userIdStorage = getUserDataLocalStorage();

  const navigate = useNavigate();

  const fetchData = () => {
    setLoading(true);
    axiosClient
      .get(`ticket/get-by-id-place/${placeId}`)
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
        <b>Chọn đại lý bạn muốn mua vé</b>
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
                      <TableCell align="center">Đại lý</TableCell>
                      <TableCell align="center">Vé người lớn</TableCell>
                      <TableCell align="center">Vé trẻ em</TableCell>
                      <TableCell align="center">Số vé còn lại</TableCell>
                    </TableRow>
                  </TableHead>
                  {data.map((item) => (
                    <TableBody
                      className="table_sale_agent"
                      onClick={() => {
                        navigate(`/payment/${item._id}`);
                        handleClose();
                      }}
                    >
                      <TableCell align="center">
                        {item?.salesAgentId?.userName}
                      </TableCell>
                      <TableCell align="center">
                        {formatMoney(item.adultTicket)}
                      </TableCell>
                      <TableCell align="center">
                        {formatMoney(item.childTicket)}
                      </TableCell>
                      <TableCell align="center">{item.numberTickets}</TableCell>
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

export default ModalChooseSaleAgent;
