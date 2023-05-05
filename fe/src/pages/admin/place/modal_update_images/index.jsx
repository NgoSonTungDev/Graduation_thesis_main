import { CloseOutlined } from "@ant-design/icons";
import LoadingButton from "@mui/lab/LoadingButton";
import { Button, IconButton } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import React, { useEffect, useState } from "react";
import _ from "lodash";
import axiosClient from "../../../../api/axiosClient";
import { toastify } from "../../../../utils/common";
import "./style.scss";
import ErrorEmpty from "../../../../components/emty_data";

const ModalUpdateImage = ({ open, handleClose, dataPlace, placeId }) => {
  const [loading, setLoading] = useState(false);
  const [files, setFile] = useState([]);
  const [listImageUpdate, setListImageUpdate] = useState([]);
  const [showAllImages, setShowAllImages] = useState(false);

  const handleShowAllImages = () => {
    setShowAllImages(true);
  };

  const imageList = showAllImages
    ? listImageUpdate
    : listImageUpdate.slice(0, 2);

  const handleChangeFileImage = (e) => {
    setFile(e.target.files);
  };

  const deleteImage = (link) => {
    setListImageUpdate(
      listImageUpdate.filter((item) => {
        return item !== link;
      })
    );
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
      setListImageUpdate(
        listImageUpdate.push(...responses.map((res) => res.data.url))
      );
    } catch (error) {
      setLoading(false);
    }
  };

  const handleUpdateImage = async () => {
    setLoading(true);

    if (!files) {
      axiosClient
        .put(`/place/update/${placeId}`, {
          image: listImageUpdate,
        })
        .then((res) => {
          setLoading(false);
          handleClose();
          toastify("success", "Cập nhật thành công !");
        })
        .catch((err) => {
          setLoading(false);
          toastify("error", err.response.data.message || "Lỗi hệ thông !");
        });
      return;
    }

    await uploadFiles();
    await axiosClient
      .put(`/place/update/${placeId}`, {
        image: listImageUpdate,
      })
      .then((res) => {
        setLoading(false);
        handleClose();
        toastify("success", "Cập nhật thành công !");
      })
      .catch((err) => {
        setLoading(false);
        toastify("error", err.response.data.message || "Lỗi hệ thông !");
      });
  };

  useEffect(() => {
    setListImageUpdate(dataPlace);
  }, []);

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ textAlign: "center" }}>Chỉnh Sửa Ảnh</DialogTitle>
        <DialogContent>
          <div
            style={{
              display: "flex",
              width: "500px",
              // flexWrap: "wrap",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                marginTop: "15px",
                display: "flex",
                gap: "15px",
                // flexDirection: "row",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              {_.isEmpty(listImageUpdate) ? (
                <ErrorEmpty />
              ) : (
                imageList.map((item, index) => {
                  return (
                    <div key={index} style={{ position: "relative" }}>
                      <img src={item} width={176} height={178} style={{borderRadius:"5px"}} />
                      <Button
                        type="primary"
                        danger
                        style={{
                          position: "absolute",
                          top: "5px",
                          right: "5px",
                        }}
                      >
                        <IconButton
                          size="small"
                          sx={{
                            border: "1px solid",color:"red"
                          }}
                          onClick={() => deleteImage(item)}
                        >
                          <CloseOutlined />
                        </IconButton>
                      </Button>
                    </div>
                  );
                })
              )}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginLeft: "5%",
              width: "90%",
              marginTop: "15px",
              marginBottom: "15px",
            }}
          >
            <Button
              sx={{ marginTop: "15px" }}
              variant="outlined"
              component="label"
              disabled={loading}
            >
              Thêm ảnh ({files.length})
              <input
                type="file"
                multiple
                hidden
                name="photo"
                accept="image/*"
                onChange={handleChangeFileImage}
              />
            </Button>
            <Button
              sx={{ marginTop: "15px" }}
              variant="outlined"
              component="label"
              disabled={loading}
              onClick={handleShowAllImages}
            >
              Tất Cả ảnh ({listImageUpdate.length})
            </Button>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <LoadingButton loading={loading} onClick={handleUpdateImage}>
            Chỉnh sửa
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ModalUpdateImage;
