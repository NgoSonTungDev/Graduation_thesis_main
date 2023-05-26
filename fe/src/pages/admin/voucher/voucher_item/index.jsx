import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { EnvironmentOutlined } from "@ant-design/icons";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import moment from "moment";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import axiosClient from "../../../../api/axiosClient";
import LoadingBar from "../../../../components/loadding/loading_bar";
import FormDate from "../../../../hook-form/form_date";
import { DataPlaceById } from "../../../../redux/selectors";
import { formatMoney, toastify } from "../../../../utils/common";
import _ from "lodash";
import { clearByIdPlace } from "../../../../redux/place/placeSlice";
import GetDataPlaceItem from "../../../../components/modle_find_place";

const validationInput = yup.object().shape({
  title: yup
    .string()
    .min(6, "Tên voucher ít nhất 6 ký tự !!!")
    .max(30, "Tên voucher tối đa 30 ký tự !!!")
    .required("Tên voucher không được để trống !!!"),
  price: yup
    .number()
    .min(5000, "Giảm ít nhất 5000VNĐ")
    .required("Giá tiền giảm không được để trống !!!"),
});

const styles = {
  card: {
    width: "300px",
    height: "200px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
    borderRadius: "5px",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },
  placeName: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  discount: {
    fontSize: "16px",
    marginBottom: "10px",
  },
  code: {
    fontSize: "20px",
    fontWeight: "bold",
  },
};

const VoucherItem = ({ open, handleClose, data, fetchData }) => {
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [startDay, setStartDay] = React.useState(moment(new Date()).format());
  const [endDay, setEndDay] = React.useState(
    moment(new Date()).add(1, "days").format()
  );
  const dataPlace = useSelector(DataPlaceById);
  const dispatch = useDispatch();

  const handleGetAllVouchers = () => {
    fetchData();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      new_password: "",
      confirmPassword: "",
    },
    // mode: "all",
    resolver: yupResolver(validationInput),
  });

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleAddVoucher = (data) => {
    setLoading(true);
    axiosClient
      .post("/voucher/add", {
        placeId: dataPlace._id,
        title: data.title,
        price: data.price,
        startDate: Number(startDay ? startDay : new Date()),
        endDate: Number(endDay),
      })
      .then((res) => {
        setLoading(false);
        toastify("success", "Thêm voucher thành công!");
        handleClose();
        handleGetAllVouchers();
      })
      .catch((err) => {
        setLoading(false);
        toastify("error", err.response.data.message || "Lỗi hệ thống !");
      });
  };

  const handleDeleteVoucher = (voucherId) => {
    setLoading(true);
    axiosClient
      .delete(`/voucher/delete/${voucherId}`)
      .then((res) => {
        setLoading(false);
        toastify("success", "Xoá voucher thành công!");
        handleGetAllVouchers();
      })
      .catch((err) => {
        setLoading(false);
        toastify("error", err.response.data.message || "Lỗi hệ thống !");
      });
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
      }}
    >
      {data?.map((item, index) => (
        <div
          key={index}
          style={{
            backgroundColor: "#fff",
            width: "250px",
            borderRadius: "10px",
            boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
            maxWidth: "400px",
            marginLeft: "10px",
            marginTop: "15px",
            padding: "20px",
            textAlign: "center",
          }}
        >
          <span>
            <HighlightOffIcon
              sx={{ marginLeft: "230px", cursor: "pointer" }}
              onClick={() => {
                handleDeleteVoucher(item._id);
              }}
            />
          </span>
          <h2
            style={{
              color: "#4CAF50",
              fontSize: "28px",
              fontWeight: "bold",
            }}
          >
            {item.title}
          </h2>
          <hr
            style={{
              borderTop: "3px solid #4CAF50",
              width: "50%",
            }}
          />
          <p
            style={{
              fontSize: "18px",
            }}
          >
            <div style={styles.discount}>Địa điểm: {item?.placeId?.name}</div>
            <div style={styles.discount}>Giá: {formatMoney(item.price)}</div>
            <div style={styles.discount}>Mã giảm giá: {item.codeVoucher}</div>
          </p>
          <p style={{ fontSize: "13px" }}>
            {moment(item.startDate).format("DD/MM/yyyy")} -{" "}
            {moment(item.endDate).format("DD/MM/yyyy")}
          </p>
        </div>
      ))}

      {/* Dialog thêm mới voucher */}
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle
          style={{ color: "#000", fontWeight: "600", textAlign: "center" }}
        >
          {"Thêm Voucher"}
        </DialogTitle>
        <LoadingBar />
        <>
          <DialogContent style={{ width: "400px" }}>
            <div>
              {_.isEmpty(dataPlace) ? (
                <div
                  style={{
                    textAlign: "center",
                    padding: "30px 0",
                    marginTop: "12px",
                    border: "1px dashed #d9d9d9",
                    borderRadius: "10px",
                    cursor: "pointer",
                  }}
                  onClick={handleOpenModal}
                >
                  <span>
                    <EnvironmentOutlined /> Nhấn vào đây để chọn địa điểm
                  </span>
                </div>
              ) : (
                <div
                  style={{
                    width: "100%",
                    border: "0.1px solid #E5E5E5",
                    borderRadius: "10px",
                  }}
                >
                  <Button
                    sx={{
                      float: "right",
                    }}
                    component="label"
                    onClick={() => {
                      dispatch(clearByIdPlace());
                    }}
                  >
                    <HighlightOffIcon
                      sx={{ paddingLeft: "5px", color: "red" }}
                    />
                  </Button>
                  <div
                    style={{
                      display: "flex",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        padding: "10px",
                        gap: "7px",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <b>{dataPlace.name}</b>
                      <span>{dataPlace.address}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                gap: "15px",
                marginTop: "15px",
              }}
            >
              <TextField
                error={!!errors?.title}
                {...register("title")}
                helperText={errors.title?.message}
                type="text"
                size="small"
                sx={{ width: "246px" }}
                label={"Tên voucher"}
              />
              <TextField
                error={!!errors?.price}
                {...register("price")}
                helperText={errors.price?.message}
                type="number"
                size="small"
                sx={{ width: "246px" }}
                label={"Giá"}
              />
              <FormDate
                value={startDay}
                minDate={new Date()}
                label={"Ngày bắt đầu"}
                onChange={(value) => {
                  setStartDay(value);
                }}
              />

              <FormDate
                value={endDay}
                minDate={startDay}
                label={"Ngày hết hạn"}
                fullWidth
                onChange={(value) => {
                  setEndDay(value);
                }}
              />
            </div>
          </DialogContent>
          <DialogActions style={{ paddingBottom: "15px" }}>
            <Button variant="outlined" onClick={handleClose}>
              Huỷ
            </Button>
            <Button
              variant="outlined"
              loading={loading}
              onClick={handleSubmit(handleAddVoucher)}
            >
              Thêm
            </Button>
          </DialogActions>
        </>
      </Dialog>

      {openModal && (
        <GetDataPlaceItem openDialog={openModal} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default VoucherItem;
