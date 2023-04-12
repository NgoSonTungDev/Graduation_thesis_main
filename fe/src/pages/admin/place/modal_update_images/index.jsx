import LoadingButton from "@mui/lab/LoadingButton";
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import axiosClient from "../../../../api/axiosClient";
import { toastify } from "../../../../utils/common";
import axios from "axios";

const ModalUpdateImage = ({ open, handleClose, callBackApi, dataPlace }) => {
  const [loading, setLoading] = useState(false);
  const [placeId, setPlaceId] = useState("");
  const [files, setFile] = useState(null);
  const [data, setData] = React.useState("");

  const handleChangeFileImage = (e) => {
    setFile(e.target.files);
  };

  const uploadFiles = async () => {
    const url = [];

    const formData = new FormData();
    const api = "https://api.cloudinary.com/v1_1/djo1gzatx/image/upload";
    const presetName = "mafline-upload";
    const folderName = "mafline";
    formData.append("upload_preset", presetName);
    formData.append("folder", folderName);

    const requests = Object.values(files).map((file) => {
      formData.append("file", file);
      return axios.post(api, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    });

    try {
      const responses = await Promise.all(requests);
      setLoading(false);
      url.push(...responses.map((res) => res.data.url));
    } catch (error) {
      setLoading(false);
    }
  };

  const handleUpdateImage = async (url) => {
    // await uploadFiles();
    // await axiosClient
    //   .put(`/place/update/${placeId}`, {
    //     image: url,
    //   })
    //   .then((res) => {
    //     toastify("success", "Cập nhật thành công !");
    //   })
    //   .catch((err) => {
    //     alert(placeId);
    //     setLoading(false);
    //     toastify("error", err.response.data.message || "Lỗi hệ thông !");
    //   });
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ textAlign: "center" }}>
          Chỉnh sửa ảnh địa điểm {dataPlace?.name}
        </DialogTitle>
        <DialogContent>
          <div style={{ width: "500px", display: "flex" }}>
            <div
              style={{
                width: "50%",
                marginTop: "15px",
                display: "flex",
                gap: "15px",
                flexDirection: "column",
              }}
            >
              <img src={dataPlace?.image} />
            </div>
          </div>
          <div
            style={{
              marginLeft: "5%",
              width: "90%",
              marginTop: "15px",
            }}
          >
            <Button
              sx={{ marginTop: "15px" }}
              variant="outlined"
              component="label"
              disabled={loading}
            >
              Thêm ảnh
              <input
                type="file"
                multiple
                hidden
                name="photo"
                accept="image/*"
                onChange={handleChangeFileImage}
              />
            </Button>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <LoadingButton loading={loading} onClick={handleUpdateImage}>
            Thêm
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ModalUpdateImage;
