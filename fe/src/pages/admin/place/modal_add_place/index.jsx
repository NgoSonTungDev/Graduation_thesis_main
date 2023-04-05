import { yupResolver } from "@hookform/resolvers/yup";
import LoadingButton from "@mui/lab/LoadingButton";
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import axiosClient from "../../../../api/axiosClient";
import GetDataPlaceItem from "../../../../components/modle_find_place";
import { clearByIdPlace } from "../../../../redux/place/placeSlice";
import { toastify } from "../../../../utils/common";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import provinces from "../../../../asset/64_provinces_and_cities"

const ModalAddPlace = ({ open, handleClose, callBackApi }) => {
    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const [listPurpose, setListPurpose] = useState([]);
    const [listType, setListType] = useState([]);
    const [listLocation, setListLocation] = useState(provinces);
    const [listImage, setListImage] = useState([]);
    const [files, setFile] = useState(null);

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
        geographicalLocation: yup
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
        purpose: yup
            .string()
            .typeError("Không được để trống")
            .required("Không được để trống."),
        type: yup
            .string()
            .typeError("Không được để trống")
            .required("Không được để trống."),
        content: yup
            .string()
            .typeError("Không được để trống")
        // .required("Không được để trống."),

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
            startingPrice: 0,
            LastPrice: 0,
            purpose: "",
            type: "",
            description: "",
            image: "",
            openTime: 0,
            closeTime: 0,
            content: ""
        },
        resolver: yupResolver(validationInput),
    });

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleChangeFileImage = (e) => {
        setFile(e.target.files);
        // console.log("kjsahdkjs", Object.values(e.target.files));

    };


    const uploadFiles = () => {
        const api = "https://api.cloudinary.com/v1_1/djo1gzatx/image/upload";
        const presetName = "mafline-upload";
        const folderName = "mafline";

        const formData = new FormData();
        formData.append("upload_preset", presetName);
        formData.append("folder", folderName);

        for (const file of files) {

            formData.append("file", file);
            axios
                .post(api, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                })
                .then((res) => {
                    setLoading(false);
                    setListImage((prev) => [...prev, res.data.url])
                })
                .catch((error) => {
                    setLoading(false);
                });
        }

    }

    const handleAddPlace = (data) => {
        uploadFiles()
        axiosClient
            .post("/place/add", {
                name: data.name,
                location: data.location,
                address: data.address,
                geographicalLocation: data.geographicalLocation,
                startingPrice: data.startingPrice,
                LastPrice: data.LastPrice,
                purpose: data.purpose,
                type: data.type,
                description: data.description,
                image: listImage ? listImage : [],
                openTime: data.openTime,
                closeTime: data.closeTime
            })
            .then((res) => {
                callBackApi();
                setLoading(false);
                reset();
                handleClose();
                dispatch(clearByIdPlace());
                toastify(
                    "success",
                    res.data.message || "Thêm thành công!"
                );
            })
            .catch((err) => {
                setLoading(false);
                toastify("error", err.response.data.message || "Lỗi hệ thông !");
            });
    };
    const getApiPurpose = () => {
        axiosClient
            .get("/purpose/all")
            .then((res) => {
                setListPurpose(res.data.data);
            })
            .catch((err) => {
                toastify("error", err.response.data.message || "Lỗi hệ thông !");
            });
    };


    const getApiType = () => {
        axiosClient
            .get("/type/all")
            .then((res) => {
                setListType(res.data.data);
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

                            <TextField
                                type="text"
                                label="Địa chỉ"
                                error={!!errors?.address}
                                {...register("address")}
                                helperText={errors.address?.message}
                                size="small"
                                sx={{ width: "80%", marginLeft: "10%" }}
                            />

                            <TextField
                                type="number"
                                label="Giá thấp nhất"
                                error={!!errors?.startingPrice}
                                {...register("startingPrice")}
                                helperText={errors.startingPrice?.message}
                                size="small"
                                sx={{ width: "80%", marginLeft: "10%" }}
                            />

                            <TextField
                                select
                                fullWidth
                                name="purpose"
                                label="Mục đích"
                                error={!!errors?.purpose}
                                {...register("purpose")}
                                helperText={errors.purpose?.message}
                                size="small"
                                sx={{ width: "80%", marginLeft: "10%" }}

                            >
                                {listPurpose?.map((item) => (
                                    <MenuItem value={item.name}>{item.name}</MenuItem>
                                ))}
                            </TextField>


                            <TextField
                                label="Giờ mở cửa"
                                type="number"
                                size="small"
                                error={!!errors?.openTime}
                                {...register("openTime")}
                                helperText={errors.openTime?.message}
                                sx={{ width: "80%", marginLeft: "10%" }}
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
                                {listLocation?.map((item) => (
                                    <MenuItem value={item.name}>{item.name}</MenuItem>
                                ))}
                            </TextField>

                            <TextField
                                type="text"
                                label="Vị trí địa lí"
                                error={!!errors?.geographicalLocation}
                                {...register("geographicalLocation")}
                                helperText={errors.geographicalLocation?.message}
                                size="small"
                                sx={{ width: "80%", marginLeft: "10%" }}
                            />
                            <TextField
                                type="number"
                                label="Giá cao nhất"
                                error={!!errors?.LastPrice}
                                {...register("LastPrice")}
                                helperText={errors.LastPrice?.message}
                                size="small"
                                sx={{ width: "80%", marginLeft: "10%" }}
                            />
                            <TextField
                                select
                                fullWidth
                                label="Loại hình"
                                // label={item?.type}
                                error={!!errors?.type}
                                {...register("type")}
                                helperText={errors.type?.message}
                                size="small"
                                sx={{ width: "80%", marginLeft: "10%" }}

                            >
                                {listType?.map((item) => (
                                    <MenuItem value={item.name}>{item.name}</MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                type="number"
                                label="Giờ đóng cửa"
                                size="small"
                                error={!!errors?.closeTime}
                                {...register("closeTime")}
                                helperText={errors.closeTime?.message}
                                sx={{ width: "80%", marginLeft: "10%" }}
                            />
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
                        }}>
                        <TextField
                            type="text"
                            error={!!errors?.content}
                            {...register("content")}
                            helperText={errors.content?.message}
                            label="Mô tả"
                            sx={{ width: "100%" }}

                        />
                        <Button sx={{ marginTop: "15px" }} variant="outlined" component="label" disabled={loading}>
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
                    <LoadingButton
                        loading={loading}
                        onClick={handleSubmit(handleAddPlace)}
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
