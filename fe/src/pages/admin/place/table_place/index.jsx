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
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import axiosClient from "../../../../api/axiosClient";
import ErrorEmpty from "../../../../components/emty_data";
import ModalConfirm from "../../../../components/modal_confirm";
import { formatMoney, toastify } from "../../../../utils/common";
import MenuItem from "@mui/material/MenuItem";
import provinces from "../../../../asset/64_provinces_and_cities";
import ModalUpdateImage from "../modal_update_images";
import GetDataPlaceItem from "../../../../components/modle_find_place";
import { useDispatch, useSelector } from "react-redux";
import Autocomplete from "@mui/material/Autocomplete";

const TablePlace = ({ data, deleteData, updateData, callBackApi }) => {
  const [openModalUpdateImage, setOpenModalUpdateImage] = React.useState(false);
  const [editingRowIndex, setEditingRowIndex] = useState(null);
  const [placeId, setPlaceId] = useState("");
  const [loading, setLoading] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [dataType, setDataType] = useState([]);
  const [dataPurpose, setDataPurpose] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const [dataPlaceImage, setDataPlaceImage] = React.useState([]);
  const [type, setType] = useState([]);
  const [purpose, setPurpose] = useState([]);

  const handleClickOpenModalUpdateImage = async (placeId) => {
    setPlaceId(placeId)
    setOpenModalUpdateImage(true);
  };

  const handleCloseModalUpdateImage = () => {
    setOpenModalUpdateImage(false);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      // type: [],
      // purpose: [],
      location: "",
      address: "",
      name: "",
      startingPrice: 100000,
      LastPrice: 200000,
    },
  });

  const handleClickOpenModalDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseModalDelete = () => {
    setOpenDelete(false);
  };

  const handleEditButtonClick = (id, rowIndex) => {
    setEditingRowIndex(rowIndex);
    setPlaceId(id);

    getApiAnPlace(id);
    const row = data[rowIndex];

    reset({
      ...row,
    });
  };

  const handleCancelButtonClick = () => {
    setEditingRowIndex(null);
  };
  const handleSaveButtonClick = (data) => {
    updateData(placeId, data);
    axiosClient
      .put(`/place/update/${placeId}`, {
        location: data.location,
        purpose: purpose.map((item) => item.name).join(" , "),
        type: type.map((item) => item.name).join(" , "),
        address: data.address,
        name: data.name,
        startingPrice: data.startingPrice,
        LastPrice: data.LastPrice,
      })
      .then((res) => {
        setPurpose([]);
        setType([]);
        toastify("success", "Cập nhật thành công !");
        callBackApi();
      })
      .catch((err) => {
        setLoading(false);
        toastify("error", err.response.data.message || "Lỗi hệ thông !");
      });
    setEditingRowIndex(null);
  };

  const handleDelete = () => {
    setLoading(true);
    axiosClient
      .delete(`/place/delete/${placeId}`)
      .then((res) => {
        setLoading(false);
        toastify("success", res.data.message || "Xóa thành công !");
        handleCloseModalDelete();
        deleteData(placeId);
      })
      .catch((err) => {
        setLoading(false);
        toastify("error", err.response.data.message || "Lỗi hệ thông !");
      });
  };

  const getApiType = () => {
    axiosClient
      .get(`type/all`)
      .then((res) => {
        setDataType(
          res.data.data.map((item) => {
            return { id: item._id, name: item.name };
          })
        );
      })
      .catch((err) => {
        setLoading(false);
        toastify("error", err.response.data.message || "Lỗi hệ thông !");
      });
  };

  const getApiPurpose = () => {
    axiosClient
      .get(`purpose/all`)
      .then((res) => {
        setDataPurpose(
          res.data.data.map((item) => {
            return { id: item._id, name: item.name };
          })
        );
      })
      .catch((err) => {
        setLoading(false);
        toastify("error", err.response.data.message || "Lỗi hệ thông !");
      });
  };

  const getApiAnPlace = (id) => {
    setLoading(true);
    axiosClient
      .get(`/place/an/${id}`)
      .then((res) => {
        setLoading(false);

        setDataPlaceImage(res.data.data.image || []);
        setType(
          res.data.data.type.split(" , ").map((item) => {
            return { id: "2d1s5tg43sd12fs3f", name: item };
          })
        );
        setPurpose(
          res.data.data.purpose.split(" , ").map((item) => {
            return { id: "2d1s5tg43sd12fs3f", name: item };
          })
        );
        setPlaceId(id);
      })
      .catch((err) => {
        setLoading(false);

        toastify("error", err.response.data.message || "Lỗi hệ thông !");
      });
  };

  useEffect(() => {
    getApiType();
    getApiPurpose();
  }, []);

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
                  Tên Địa Điểm
                </TableCell>
                <TableCell align="center" style={{ fontWeight: "600" }}>
                  Tỉnh/Thành Phố
                </TableCell>
                <TableCell align="center" style={{ fontWeight: "600" }}>
                  Địa Điểm
                </TableCell>
                <TableCell align="center" style={{ fontWeight: "600" }}>
                  Giá Thấp Nhất
                </TableCell>
                <TableCell align="center" style={{ fontWeight: "600" }}>
                  Giá Cao Nhất
                </TableCell>
                <TableCell align="center" style={{ fontWeight: "600" }}>
                  Loại
                </TableCell>
                <TableCell align="center" style={{ fontWeight: "600" }}>
                  Mục Đích
                </TableCell>
                <TableCell align="center" style={{ fontWeight: "600" }}>
                  Chức Năng
                </TableCell>
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
                      maxWidth: "100px",
                    }}
                  >
                    {editingRowIndex === index ? (
                      <TextField
                        fullWidth
                        // label={item?.name}
                        error={!!errors?.name}
                        {...register("name")}
                        helperText={errors.name?.message}
                        size="small"
                      ></TextField>
                    ) : (
                      <span title={item?.name}>{item?.name}</span>
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {editingRowIndex === index ? (
                      <TextField
                        select
                        fullWidth
                        // getOptionLabel={(option) => option.location}

                        label={item?.location}
                        error={!!errors?.location}
                        {...register("location")}
                        helperText={errors.location?.message}
                        size="small"
                      >
                        {provinces?.map((type) => (
                          <MenuItem value={type.name}>{type.name}</MenuItem>
                        ))}
                      </TextField>
                    ) : (
                      <span title={item?.location}>{item?.location}</span>
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
                    {editingRowIndex === index ? (
                      <TextField
                        fullWidth
                        // label={item?.address}
                        error={!!errors?.address}
                        {...register("address")}
                        helperText={errors.address?.message}
                        size="small"
                      ></TextField>
                    ) : (
                      <span title={item?.address}> {item?.address}</span>
                    )}
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
                    {editingRowIndex === index ? (
                      <TextField
                        fullWidth
                        // label={item?.startingPrice}
                        error={!!errors?.startingPrice}
                        {...register("startingPrice")}
                        helperText={errors.startingPrice?.message}
                        size="small"
                      ></TextField>
                    ) : (
                      <span title={formatMoney(item?.startingPrice)}>
                        {formatMoney(item?.startingPrice)}
                      </span>
                    )}
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
                    {editingRowIndex === index ? (
                      <TextField
                        fullWidth
                        // label={item?.LastPrice}
                        error={!!errors?.LastPrice}
                        {...register("LastPrice")}
                        helperText={errors.LastPrice?.message}
                        size="small"
                      ></TextField>
                    ) : (
                      <span title={formatMoney(item?.LastPrice)}>
                        {formatMoney(item?.LastPrice)}
                      </span>
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
                    {editingRowIndex === index ? (
                      <Autocomplete
                        multiple
                        disablePortal
                        noOptionsText="Không có lựa chọn"
                        autoHighlight
                        name="loại"
                        size="small"
                        value={type}
                        onChange={(event, newValue) => {
                          setType(newValue);
                        }}
                        limitTags={1}
                        options={dataType}
                        getOptionLabel={(option) => option.name}
                        sx={{ width: "100%" }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="outlined"
                            label="Loại hình"
                          />
                        )}
                      />
                    ) : (
                      <span title={item?.type}>{item?.type}</span>
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
                    {editingRowIndex === index ? (
                      <Autocomplete
                        multiple
                        disablePortal
                        noOptionsText="Không có lựa chọn"
                        autoHighlight
                        name="mục đích"
                        size="small"
                        value={purpose}
                        onChange={(event, newValue) => {
                          setPurpose(newValue);
                        }}
                        limitTags={1}
                        options={dataPurpose}
                        getOptionLabel={(option) => option.name}
                        sx={{ width: "100%" }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="outlined"
                            label="Mục đích"
                          />
                        )}
                      />
                    ) : (
                      <span title={item?.purpose}>{item?.purpose}</span>
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
                          setEditingRowIndex(index);
                        }}
                      >
                        Chỉnh sửa
                      </Button>
                    )}

                    {editingRowIndex !== index && (
                      <>
                        <Button
                          onClick={() => {
                            handleClickOpenModalDelete();
                            setPlaceId(item._id);
                          }}
                        >
                          Xóa
                        </Button>
                        <Button
                          onClick={() => {
                            handleClickOpenModalUpdateImage(item._id);
                          }}
                        >
                          Chỉnh ảnh
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableBody>
              );
            })}
          </Table>
        </TableContainer>
      )}
      {openModalUpdateImage && (
        <ModalUpdateImage
          open={openModalUpdateImage}
          handleClose={handleCloseModalUpdateImage}
          placeId={placeId}
        />
      )}
      {openModal && (
        <GetDataPlaceItem openDialog={openModal} onClose={handleCloseModal} />
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
