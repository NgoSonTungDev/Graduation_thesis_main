import LoadingButton from "@mui/lab/LoadingButton";
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import _ from "lodash";
import React, { useEffect, useRef, useState } from "react";
import axiosClient from "../../../../api/axiosClient";
import { toastify } from "../../../../utils/common";
import { CloseOutlined } from "@ant-design/icons";
import axios from "axios";
import "./style.scss";
const ModalUpdateImage = ({ open, handleClose, callBackApi, dataPlace }) => {
  const [loading, setLoading] = useState(false);
  const [placeId, setPlaceId] = useState("");
  const [files, setFile] = useState(null);
  const [data, setData] = React.useState("");

  let listImageUpdate = [...dataPlace];

  const handleChangeFileImage = (e) => {
    setFile(e.target.files);
  };

  const deleteImage = (index) => {
    listImageUpdate.filter((item) => {
      return item !== index;
    });
  };

  const uploadFiles = async () => {
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
      listImageUpdate.push(...responses.map((res) => res.data.url));
    } catch (error) {
      setLoading(false);
    }
  };

  const handleUpdateImage = async (url) => {
    await uploadFiles();
    await axiosClient
      .put(`/place/update/${placeId}`, {
        image: listImageUpdate,
      })
      .then((res) => {
        toastify("success", "Cập nhật thành công !");
      })
      .catch((err) => {
        setLoading(false);
        toastify("error", err.response.data.message || "Lỗi hệ thông !");
      });
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ textAlign: "center" }}>
          {/* Địa điểm : <span style={{ color: "red" }}>áđâfas</span> */}
        </DialogTitle>
        <DialogContent>
          <div style={{ width: "500px", display: "flex" }}>
            <div
              style={{
                width: "50%",
                marginTop: "15px",
                display: "flex",
                gap: "15px",
                flexDirection: "row",
              }}
            >
              {listImageUpdate.slice(0, 2).map((item, index) => {
                return (
                  <div key={index} style={{ position: "relative" }}>
                    <img src={item} width={176} height={178} />
                    <Button
                      onClick={() => deleteImage(index)}
                      type="primary"
                      danger
                      style={{
                        position: "absolute",
                        top: "5px",
                        right: "5px",
                        color: "red",
                      }}
                    >
                      <CloseOutlined
                        style={{
                          fontSize: "30px",
                          backgroundColor: "red",
                          color: "white",
                        }}
                      />
                    </Button>
                  </div>
                );
              })}
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
