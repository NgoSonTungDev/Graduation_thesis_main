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
import ErrorEmpty from "../../../../components/emty_data";

const TableTicket = ({ data, updateData }) => {
  const [editingRowIndex, setEditingRowIndex] = useState(null);
  const [idTicket, setIdTicket] = useState("");
  const [valueCheckValidate, setValueCheckValidate] = useState({
    startingPrice: 0,
    LastPrice: 0,
  });

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
    setIdTicket(id);
    const row = data[rowIndex];

    setValueCheckValidate({
      startingPrice: row.placeId?.startingPrice,
      LastPrice: row.placeId?.LastPrice,
    });

    reset({
      ...row,
    });
  };

  const handleCancelButtonClick = () => {
    setEditingRowIndex(null);
  };

  const handleSaveButtonClick = (data) => {
    updateData(idTicket, data);

    setEditingRowIndex(null);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow sx={{ padding: "5px 0" }}>
            <TableCell align="center">Địa điểm</TableCell>
            <TableCell align="center">Tỉnh/Thành phố</TableCell>
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
                    item.childTicket
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
                    item.adultTicket
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
                <TableCell align="center">
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
                  <Button>Xóa</Button>
                </TableCell>
              </TableBody>
            );
          })
        )}
      </Table>
    </TableContainer>
  );
};

export default TableTicket;
