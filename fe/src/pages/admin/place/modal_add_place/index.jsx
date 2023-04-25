import { yupResolver } from "@hookform/resolvers/yup";
import LoadingButton from "@mui/lab/LoadingButton";
import { Autocomplete, Button, Skeleton } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { message } from "antd";
import axios from "axios";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import axiosClient from "../../../../api/axiosClient";
import provinces from "../../../../asset/64_provinces_and_cities";
import GetDataPlaceItem from "../../../../components/modle_find_place";
import FormTime from "../../../../hook-form/form_time";
import { clearByIdPlace } from "../../../../redux/place/placeSlice";
import { toastify } from "../../../../utils/common";
import { Marker, GoogleMap,useJsApiLoader  } from "@react-google-maps/api";
import Map_controller from "../../../../components/map_controller";

const ModalAddPlace = ({ open, handleClose, callBackApi }) => {
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [listPurpose, setListPurpose] = useState([]);
  const [listType, setListType] = useState([]);
  const [listImage, setListImage] = useState([]);
  const [files, setFile] = useState([]);
  const [data, setData] = useState(null);
  const [valueOpen, setValueOpen] = React.useState("");
  const dispatch = useDispatch();
  const [valueClose, setValueClose] = React.useState("");
  const [type, setType] = useState([]);
  const [purpose, setPurpose] = useState([]);
  const [map, setMap] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 0, lon: 0 });
  const [location, setLocation] = useState("");

  const validationInput = yup.object().shape({
    name: yup
      .string()
      .required("Không được để trống.")
      .typeError("Không được để trống"),
    location: yup
      .string()
      .required("Không được để trống.")
      .typeError("Không được để trống"),
    address: yup
      .string()
      .required("Không được để trống.")
      .typeError("Không được để trống"),
    startingPrice: yup
      .number("Sai định dạng")
      .min(0, "Phải lớn hơn 0")
      .typeError("Không được để trống")
      .required("Không được để trống."),
    LastPrice: yup
      .number("sai định dạng")
      .min(0, "Phải lớn hơn 0")
      .typeError("Không được để trống")
      .required("Không được để trống."),
    // purpose: yup
    //   .string()
    //   .typeError("Không được để trống")
    //   .required("Không được để trống."),
    // type: yup
    //   .string()
    //   .typeError("Không được để trống")
    //   .required("Không được để trống."),
    description: yup
      .string()
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
      name: "",
      location: "",
      address: "",
      geographicalLocation: "",
      startingPrice: 100000,
      LastPrice: 200000,
      purpose: "",
      type: "",
      description: "",
      image: "",
    },
    resolver: yupResolver(validationInput),
  });

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleChangeFileImage = (e) => {
    setFile(e.target.files);
  };

  const handleSearchPlaceMap = async (query) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          query
        )}`
      );
      const { lat, lon, display_name } = response.data[0];
      setLocation(display_name);
      if (lat && lon && !isNaN(parseFloat(lat)) && !isNaN(parseFloat(lon))) {
        setMapCenter({ lat: parseFloat(lat), lon: parseFloat(lon) });
      } else {
        console.log("No valid search results found");
      }
    } catch (error) {
      console.log("No search results found", error);
    }
  };

  const handleZoomMap = () => {
    map.panTo({ lat: mapCenter.lat, lng: mapCenter.lon });
    map.setZoom(map.getZoom() + 4);
  };
  
  const uploadFiles = async () => {
    setLoading(true);

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
      handleAddPlace(url);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleAddPlace = (url) => {
    if (_.isEmpty(url)) {
      toastify("info", "chưa có ảnh");
      setLoading(true);
      return;
    }
    axiosClient
      .post("/place/add", {
        name: data.name,
        location: data.location,
        address: data.address,
        startingPrice: data.startingPrice,
        LastPrice: data.LastPrice,
        purpose: purpose.join(" , "),
        type: type.join(" , "),
        description: data.description,
        image: url,
        openTime: valueOpen,
        closeTime: valueClose,
      })
      .then((res) => {
        callBackApi();
        // handleSearchPlaceMap(res.name);
        setLoading(false);
        reset();
        setValueClose("");
        setValueOpen("");
        setPurpose("");
        setType("");
        handleClose();
        dispatch(clearByIdPlace());
        toastify("success", res.data.message || "Thêm thành công!");
      })
      .catch((err) => {
        setLoading(false);
        toastify("error", err.response?.data?.message || "Lỗi hệ thống!");
      });
  };

  const handleCheckAddPlace = (data) => {
    if (
      valueOpen === "" ||
      valueClose === "" ||
      purpose === "" ||
      type === ""
    ) {
      message.error("Vui lòng điền đầy đủ thông tin!");
    } else {
      setData(data);
      if (_.isEmpty(files)) {
        return toastify("error", "Chưa có file");
      } else {
        uploadFiles();
      }
    }
  };

  const getApiPurpose = () => {
    axiosClient
      .get("/purpose/all")
      .then((res) => {
        setListPurpose(
          res.data.data.map((item) => {
            return { id: item._id, label: item.name };
          })
        );
      })
      .catch((err) => {
        toastify("error", err.response.data.message || "Lỗi hệ thông !");
      });
  };

  const getApiType = () => {
    axiosClient
      .get("/type/all")
      .then((res) => {
        setListType(
          res.data.data.map((item) => {
            return { id: item._id, label: item.name };
          })
        );
      })
      .catch((err) => {
        toastify("error", err.response.data.message || "Lỗi hệ thông !");
      });
  };

  useEffect(() => {
    getApiPurpose();
    getApiType();
  }, []);

  
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ textAlign: "center" }}>Thêm địa điểm</DialogTitle>
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
              <TextField
                type="text"
                label="Tên địa điểm"
                error={!!errors?.name}
                {...register("name")}
                helperText={errors.name?.message}
                size="small"
                sx={{ width: "80%", marginLeft: "10%" }}
              />

              {/* <TextField
                type="text"
                label="Địa chỉ"
                error={!!errors?.address}
                {...register("address")}
                helperText={errors.address?.message}
                size="small"
                sx={{ width: "80%", marginLeft: "10%" }}
              /> */}

              <TextField
                type="number"
                label="Giá thấp nhất"
                error={!!errors?.startingPrice}
                {...register("startingPrice")}
                helperText={errors.startingPrice?.message}
                size="small"
                sx={{ width: "80%", marginLeft: "10%" }}
              />
              <Autocomplete
                multiple
                disablePortal
                noOptionsText="Không có lựa chọn"
                autoHighlight
                name="name"
                size="small"
                value={purpose}
                onChange={(event, newValue) => {
                  setPurpose(newValue);
                }}
                getOptionLabel={(option) => option.label}
                limitTags={1}
                options={listPurpose}
                sx={{ width: "80%", marginLeft: "10%" }}
                renderInput={(params) => (
                  <TextField {...params} variant="outlined" label="Mục đích" />
                )}
              />
              <Autocomplete
                multiple
                disablePortal
                noOptionsText="Không có lựa chọn"
                autoHighlight
                name="name"
                size="small"
                value={type}
                onChange={(event, newValue) => {
                  setType(newValue);
                }}
                limitTags={1}
                options={listType}
                sx={{ width: "80%", marginLeft: "10%" }}
                renderInput={(params) => (
                  <TextField {...params} variant="outlined" label="Loại hình" />
                )}
              />
            </div>
            <div
              style={{
                width: "50%",
                marginTop: "15px",
                display: "flex",
                gap: "15px",
                flexDirection: "column",
              }}
            >
              <TextField
                type="text"
                select
                label="Tỉnh/Thành phố"
                error={!!errors?.location}
                {...register("location")}
                helperText={errors.location?.message}
                size="small"
                sx={{ width: "80%", marginLeft: "10%" }}
              >
                {provinces.map((item) => (
                  <MenuItem value={item.name}>{item.name}</MenuItem>
                ))}
              </TextField>

              <TextField
                type="number"
                label="Giá cao nhất"
                error={!!errors?.LastPrice}
                {...register("LastPrice")}
                helperText={errors.LastPrice?.message}
                size="small"
                sx={{ width: "80%", marginLeft: "10%" }}
              />
              <div style={{ width: "80%", marginLeft: "10%" }}>
                <FormTime
                  label="Giờ mở cửa"
                  size="small"
                  value={valueOpen}
                  onChange={(newValueOpen) => setValueOpen(newValueOpen)}
                />
              </div>
              <div style={{ width: "80%", marginLeft: "10%" }}>
                <FormTime
                  label="Giờ đóng cửa"
                  value={valueClose}
                  onChange={(newValueClose) => setValueClose(newValueClose)}
                />
              </div>
            </div>
          </div>
          <div
            style={{
              marginLeft: "5%",
              width: "90%",
              marginTop: "15px",
              // display: "flex",
              // gap: "15px",
              // flexDirection: "column",
            }}
          >
            <TextField
              type="text"
              error={!!errors?.description}
              {...register("description")}
              helperText={errors.description?.message}
              label="Mô tả"
              sx={{ width: "100%" }}
            />
            {loading ? (
              <Skeleton variant="rounded" width="69%" height="350px" />
            ) : (
              <div className="box_body_content_map">
                <p>Địa điểm cụ thể</p>
                <div
                  style={{
                    width: "100%",
                    height: "300px",
                    marginTop: "10px",
                    overflow: "hidden",
                  }}
                >
                  <Map_controller
                    children={
                      <GoogleMap
                        mapContainerStyle={{
                          width: "100%",
                          height: "100%",
                        }}
                        center={{
                          lat: mapCenter.lat,
                          lng: mapCenter.lon,
                        }}
                        options={{
                          styles: [
                            {
                              featureType: "poi",
                              stylers: [{ visibility: "off" }],
                            },
                            {
                              featureType: "transit.station",
                              stylers: [{ visibility: "off" }],
                            },
                          ],
                          maxZoom: 20,
                          mapTypeControl: false,
                        }}
                        zoom={10}
                        onLoad={(map) => {
                          setMap(map);
                          map.setMapTypeId("satellite");
                        }}
                      >
                        <Marker
                          onClick={handleZoomMap}
                          position={{
                            lat: mapCenter.lat,
                            lng: mapCenter.lon,
                          }}
                        />
                      </GoogleMap>
                    }
                  />
                </div>
              </div>
            )}
            {/* <div style={{ width: "50%", marginLeft:"10%" ,backgroundColor:"red"}}>
                        {listImage.map((url) => (
                            <img style={{ width: "30%", height: "30%" }} key={url} src={url} alt="uploaded image" />
                        ))}
                    </div> */}
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
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <LoadingButton
            loading={loading}
            onClick={handleSubmit(handleCheckAddPlace)}
          >
            Thêm
          </LoadingButton>
        </DialogActions>
      </Dialog>
      {openModal && (
        <GetDataPlaceItem openDialog={openModal} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default ModalAddPlace;
