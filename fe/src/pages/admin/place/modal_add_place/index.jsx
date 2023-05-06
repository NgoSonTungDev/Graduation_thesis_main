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
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import axiosClient from "../../../../api/axiosClient";
import provinces from "../../../../asset/64_provinces_and_cities";
import GetDataPlaceItem from "../../../../components/modle_find_place";
import FormTime from "../../../../hook-form/form_time";
import { clearByIdPlace } from "../../../../redux/place/placeSlice";
import { toastify } from "../../../../utils/common";
import { Marker, GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import Map_controller from "../../../../components/map_controller";

const ModalAddPlace = ({ open, handleClose, callBackApi }) => {
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [listPurpose, setListPurpose] = useState([]);
  const [uploadedUrls, setUploadedUrls] = useState([]);
  const [listType, setListType] = useState([]);
  const [files, setFile] = useState([]);
  const [data, setData] = useState(null);
  const [valueOpen, setValueOpen] = React.useState("");
  const dispatch = useDispatch();
  const [valueClose, setValueClose] = React.useState("");
  const [type, setType] = useState([]);
  const [purpose, setPurpose] = useState([]);
  const [map, setMap] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 0, lon: 0 });

  const validationInput = yup.object().shape({
    placeName: yup
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
    description: yup
      .string()
      .typeError("Không được để trống")
      .required("Không được để trống."),
  });

  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      placeName: "",
      location: "",
      address: "",
      startingPrice: 100000,
      LastPrice: 200000,
      purpose: [],
      type: [],
      description: "",
      image: "",
    },
    resolver: yupResolver(validationInput),
  });
  const address = watch("address", "");
  const filteredProvinces = provinces.filter((province) =>
    province.name.toLowerCase().includes(address.toLowerCase())
  );
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleChangeFileImage = (e) => {
    setFile(e.target.files);
  };

  const debounceFnLocattion = useCallback(
    _.debounce((value) => {
      handleSearchPlaceMap(value);
    }, 500),
    []
  );

  const handleSearchPlaceMap = async (value) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          value
        )}`
      );
      const { lat, lon, display_name } = response.data[0];
      setValue("address", display_name);
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

    const formData = new FormData();
    const api = "https://api.cloudinary.com/v1_1/djo1gzatx/image/upload";
    const presetName = "mafline-upload";
    const folderName = "mafline";
    formData.append("upload_preset", presetName);
    formData.append("folder", folderName);

    const uploadPromises = [];

    Object.values(files).forEach((file) => {
      formData.append("file", file);
      const uploadPromise = axios.post(api, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      uploadPromises.push(uploadPromise);
    });

    try {
      const responses = await Promise.all(uploadPromises);
      const uploadedUrls = responses.map((res) => res.data.url);
      setUploadedUrls((prevState) => [...prevState, ...uploadedUrls]);
      handleAddPlace(uploadedUrls);
    } catch (error) {
      setLoading(false);
      console.log(error);
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
        name: data.placeName,
        location: data.location,
        address: data.address,
        startingPrice: data.startingPrice,
        LastPrice: data.LastPrice,
        purpose: purpose.map((item) => item.label).join(" , "),
        type: type.map((item) => item.label).join(" , "),
        description: data.description,
        image: url,
        openTime: valueOpen,
        closeTime: valueClose,
      })
      .then((res) => {
        callBackApi();
        setLoading(false);
        reset();
        setValueClose("");
        setValueOpen("");
        setPurpose([]);
        setType([]);
        setFile(null);
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
      toastify("error", "Vui lòng điền đầy đủ thông tin");
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
      <Dialog open={open} onClose={handleClose} maxWidth="1000px">
        <DialogTitle sx={{ textAlign: "center" }}>Thêm địa điểm</DialogTitle>
        <DialogContent>
          <div style={{ height: "350px", display: "flex",gap:"20px", }}>
            <div
              style={{
                width: "210px",
                height: "315px",
                marginTop: "15px",
                display: "flex",
                gap: "15px",
                flexDirection: "column",
              }}
            >
              <TextField
                type="text"
                label="Tên địa điểm"
                error={!!errors?.placeName}
                {...register("placeName")}
                helperText={errors.placeName?.message}
                size="small"
                sx={{ width: "100%" }}
                onChange={(e) => {
                  debounceFnLocattion(e.target.value);
                }}
              />

              <TextField
                type="text"
                label="Địa chỉ"
                error={!!errors?.address}
                {...register("address")}
                helperText={errors.address?.message}
                size="small"
                sx={{ width: "100%" }}
              />

              <TextField
                type="number"
                label="Giá thấp nhất"
                error={!!errors?.startingPrice}
                {...register("startingPrice")}
                helperText={errors.startingPrice?.message}
                size="small"
                sx={{ width: "100%" }}
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
                limitTags={1}
                options={listPurpose}
                sx={{ width: "100%" }}
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
                sx={{ width: "100%" }}
                renderInput={(params) => (
                  <TextField {...params} variant="outlined" label="Loại hình" />
                )}
              />
            </div>
            <div
              style={{
                width: "210px",
                height: "315px",
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
                sx={{ width: "100%" }}
              >
                {filteredProvinces.map((item) => (
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
                sx={{ width: "100%" }}
              />
              <div style={{ width: "100%" }}>
                <FormTime
                  label="Giờ mở cửa"
                  size="small"
                  value={valueOpen}
                  onChange={(newValueOpen) => setValueOpen(newValueOpen)}
                />
              </div>
              <div style={{ width: "100%" }}>
                <FormTime
                  label="Giờ đóng cửa"
                  value={valueClose}
                  onChange={(newValueClose) => setValueClose(newValueClose)}
                />
              </div>
              <TextField
                type="text"
                size="small"
                error={!!errors?.description}
                {...register("description")}
                helperText={errors.description?.message}
                label="Mô tả"
                sx={{ width: "100%" }}
              />
              <Button
                sx={{ width: "100%" }}
                variant="outlined"
                component="label"
                disabled={loading}
              >
                Thêm ảnh ({files?.length})
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
            <div
              style={{
                width: "310px",
                height: "93%",
                marginTop: "15px",
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
                    zoom={15}
                    onLoad={(map) => {
                      setMap(map);
                      map.setMapTypeId("satellite");
                    }}
                  >
                    {mapCenter && (
                      <Marker
                        onClick={handleZoomMap}
                        position={{
                          lat: mapCenter.lat,
                          lng: mapCenter.lon,
                        }}
                      />
                    )}
                  </GoogleMap>
                }
              />
            </div>
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
