import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import axiosClient from "../../../../api/axiosClient";
import LoadingBar from "../../../../components/loadding/loading_bar";
import { toastify } from "../../../../utils/common";

const validationInput = yup.object().shape({
  title: yup
    .string()
    .min(6, "Tên voucher ít nhất 6 ký tự !!!")
    .max(30, "Tên voucher tối đa 30 ký tự !!!")
    .required("Tên voucher không được để trống !!!"),
  price: yup.number().required("Giá tiền không được để trống !!!"),
  startDate: yup.date().required("Ngày bắt đầu không được để trống !!!"),
  endDate: yup.date("Ngày kết thúc không được để trống !!!"),
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

const VoucherItem = ({ open, handleClose }) => {
  const [check, setCheck] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const [data, setData] = useState({});
  const [file, setFile] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      new_password: "",
      confirmPassword: "",
    },
    mode: "all",
    resolver: yupResolver(validationInput),
  });

  const handleAddVoucher = (data) => {
    setLoading(true);
    axiosClient
      .post("/voucher/add", {
        title: data.title,
        price: data.price,
        startDate: data.startDate,
        endDate: data.endDay,
      })
      .then((res) => {
        setLoading(false);
        toastify("success", "Thêm voucher thành công!");
      })
      .catch((err) => {
        setLoading(false);
        toastify("error", err.response.data.message || "Lỗi hệ thống !");
      });
  };

  const handleGetAllVoucher = () => {
    setLoading(true);
    axiosClient
      .get("/voucher/get-all")
      .then((res) => {
        setLoading(false);
        setData(res.data.data);
      })
      .catch((err) => {
        setLoading(false);
        toastify("error", err.response.data.message || "Lỗi hệ thống !");
      });
  };

  const handleChangeFileImage = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };

  const handleSubmitAvt = async () => {
    const api = "https://api.cloudinary.com/v1_1/djo1gzatx/image/upload";
    const presetName = "mafline-upload";
    const folderName = "mafline";

    const formData = new FormData();
    formData.append("upload_preset", presetName);
    formData.append("folder", folderName);
    formData.append("file", file);

    axios
      .post(api, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        toastify("success", "Cập nhật ảnh đại diện thành công!!!");
        // handleUpdateImage(res.data.url);
        // setLoadingImage(false);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    setLoading(true);
    handleGetAllVoucher();
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#fff",
        width: 200,
        borderRadius: "10px",
        boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
        maxWidth: "300px",
        margin: "10px",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <h2
        style={{
          color: "#4CAF50",
          fontSize: "28px",
          fontWeight: "bold",
          padding: 0,
        }}
      >
        VOUCHER
      </h2>
      <span style={styles.code}>{data.title}</span>
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
        <div style={styles.discount}>địa điểm</div>
        <div style={styles.discount}>Giảm giá: {data.price}</div>
      </p>
      <p style={{ fontSize: "13px" }}>
        {data.startDate} - {data.endDate}
      </p>

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
          <DialogContent>
            <div>
              <TextField
                error={!!errors?.title}
                {...register("title")}
                helperText={errors.title?.message}
                type="text"
                size="small"
                sx={{ width: "100%", marginTop: "12px" }}
                label={"Tên voucher"}
              />
            </div>
            <div
              style={{
                width: "500px",
                marginTop: "12px",
                height: "427px ",
                display: "grid",
                palignItems: "center",
                border: "2px dashed #dedede",
              }}
            >
              {image ? (
                <img
                  style={{
                    width: "100%",
                    height: "427px",
                    objectFit: "contain",
                  }}
                  src={image}
                  alt=""
                />
              ) : (
                <Button variant="text" component="label" disabled={loading}>
                  Thêm ảnh
                  <input
                    type="file"
                    hidden
                    name="photo"
                    accept="image/*"
                    onChange={handleChangeFileImage}
                  />
                </Button>
              )}
            </div>

            <div>
              <TextField
                error={!!errors?.price}
                {...register("price")}
                helperText={errors.price?.message}
                type="number"
                size="small"
                sx={{ width: "100%", marginTop: "12px" }}
                label={"Giảm giá"}
              />
            </div>
            <div>
              <TextField
                error={!!errors?.startDate}
                {...register("startDate")}
                helperText={errors.startDate?.message}
                type="date"
                size="small"
                sx={{ width: "100%", marginTop: "12px" }}
              />
            </div>
            <div>
              <TextField
                error={!!errors?.endDate}
                {...register("endDate")}
                helperText={errors.endDate?.message}
                type="date"
                size="small"
                sx={{ width: "100%", marginTop: "12px" }}
                // label={"Ngày hết hạn"}
              />
            </div>
          </DialogContent>
          <DialogActions style={{ paddingBottom: "15px" }}>
            <Button variant="outlined" onClick={handleClose}>
              Huỷ
            </Button>
            <Button variant="outlined" onClick={() => {}}>
              Thêm
            </Button>
          </DialogActions>
        </>
      </Dialog>
    </div>
  );
};

export default VoucherItem;
