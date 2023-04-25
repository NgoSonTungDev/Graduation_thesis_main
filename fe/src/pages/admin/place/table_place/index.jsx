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

const TablePlace = ({ data, deleteData, updateData }) => {
  const [openModalUpdateImage, setOpenModalUpdateImage] = React.useState(false);
  const [editingRowIndex, setEditingRowIndex] = useState(null);
  const [placeId, setPlaceId] = useState("");
  const [loading, setLoading] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [dataType, setDataType] = React.useState([]);
  const [dataPurpose, setDataPurpose] = React.useState([]);
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const [dataPlaceImage, setDataPlaceImage] = React.useState([]);

  const handleClickOpenModalUpdateImage = (placeId) => {
    getApiAnPlace(placeId);
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
      type: "",
      purpose: "",
      location: "",
      address: "",
      name: "",
      startingPrice: 0,
      LastPrice: 0,
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
        type: data.type,
        purpose: data.purpose,
        address: data.address,
        name: data.name,
        startingPrice: data.startingPrice,
        LastPrice: data.LastPrice,
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
        setDataType(res.data.data);
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
        setDataPurpose(res.data.data);
      })
      .catch((err) => {
        setLoading(false);
        toastify("error", err.response.data.message || "Lỗi hệ thông !");
      });
  };

  const getApiAnPlace = (id) => {
    axiosClient
      .get(`/place/an/${id}`)
      .then((res) => {
        setDataPlaceImage(res.data.data.image || []);
        setPlaceId(id);
        setOpenModalUpdateImage(true);
      })
      .catch((err) => {
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
                <TableCell align="center">Tên Địa Điểm</TableCell>
                <TableCell align="center">Địa Điểm</TableCell>
                <TableCell align="center">Tỉnh/Thành phố</TableCell>
                <TableCell align="center">Giá Thấp Nhất</TableCell>
                <TableCell align="center">Giá Cao Nhất</TableCell>
                <TableCell align="center">Loại</TableCell>
                <TableCell align="center">Mục đích</TableCell>
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
                    {editingRowIndex === index ? (
                      <TextField
                        fullWidth
                        label={item?.name}
                        error={!!errors?.name}
                        {...register("name")}
                        helperText={errors.name?.message}
                        size="small"
                      ></TextField>
                    ) : (
                      item?.name
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {editingRowIndex === index ? (
                      <TextField
                        select
                        fullWidth
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
                      item?.location
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
                        label={item?.address}
                        error={!!errors?.address}
                        {...register("address")}
                        helperText={errors.address?.message}
                        size="small"
                      ></TextField>
                    ) : (
                      item?.address
                    )}
                  </TableCell>

                  <TableCell align="center">
                    {editingRowIndex === index ? (
                      <TextField
                        fullWidth
                        label={item?.startingPrice}
                        error={!!errors?.startingPrice}
                        {...register("startingPrice")}
                        helperText={errors.startingPrice?.message}
                        size="small"
                      ></TextField>
                    ) : (
                      formatMoney(item?.startingPrice)
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {editingRowIndex === index ? (
                      <TextField
                        fullWidth
                        label={item?.LastPrice}
                        error={!!errors?.LastPrice}
                        {...register("LastPrice")}
                        helperText={errors.LastPrice?.message}
                        size="small"
                      ></TextField>
                    ) : (
                      formatMoney(item?.LastPrice)
                    )}
                  </TableCell>

                  {/* <TableCell align="center">
                    {editingRowIndex === index ? (
                      <TextField
                        select
                        fullWidth
                        label={item?.type}
                        error={!!errors?.type}
                        {...register("type")}
                        helperText={errors.type?.message}
                        size="small"
                      >
                        {dataType?.map((type) => (
                          <MenuItem value={type.name}>{type.name}</MenuItem>
                        ))}
                      </TextField>
                    ) : (
                      item?.type
                    )}
                  </TableCell> */}
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
                        size="small"
                        limitTags={1}
                        options={dataType}
                        onChange={(item) => {
                          const labels = item.map((obj) => obj?._id);
                          const result = labels.join(" ");
                          // console.log(result); // sẻ trả ra 1 string ví dụ : "chill du lịch vui chơi" . dùng nó để đẩy vào trường type hoặc purpose của place
                        }}
                        sx={{ width: 150 }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="outlined"
                            label="Loại"
                          />
                        )}
                      />
                    ) : (
                      item?.type
                    )}
                  </TableCell>

                  <TableCell align="center">
                    {editingRowIndex === index ? (
                      <TextField
                        select
                        fullWidth
                        name="purpose"
                        label={item?.purpose}
                        error={!!errors?.purpose}
                        {...register("purpose")}
                        helperText={errors.purpose?.message}
                        size="small"
                      >
                        {dataPurpose?.map((purpose) => (
                          <MenuItem value={purpose.name}>
                            {purpose.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    ) : (
                      item?.purpose
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
                      Chỉnh Ảnh
                    </Button>
                  </TableCell>
                </TableBody>
              );
            })}
          </Table>
        </TableContainer>
      )}
      {openModalUpdateImage && (
        <ModalUpdateImage
          dataPlace={dataPlaceImage}
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
