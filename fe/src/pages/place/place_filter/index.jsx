import ReplayOutlinedIcon from "@mui/icons-material/ReplayOutlined";
import { IconButton, TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import _ from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import axiosClient from "../../../api/axiosClient";
import { changePayload, resetPayload } from "../../../redux/place/placeSlice";
import { payloadPlace } from "../../../redux/selectors";
import { toastify } from "../../../utils/common";

const PlaceFilter = () => {
  const [listPurpose, setListPurpose] = useState([]);
  const [listType, setListType] = useState([]);
  const dispatch = useDispatch();
  const payload = useSelector(payloadPlace);

  const { watch, register, reset, getValues } = useForm({
    defaultValues: {
      placeName: "",
      location: "",
      purpose: "",
      type: "",
      variability: "",
    },
  });

  const debounceFnPlaceName = useCallback(
    _.debounce((value) => {
      dispatch(
        changePayload({
          ...payload,
          placeName: value,
          pageNumber: 1,
        })
      );
    }, 500),
    []
  );

  const debounceFnLocation = useCallback(
    _.debounce((value) => {
      dispatch(
        changePayload({
          ...payload,
          location: value,
          pageNumber: 1,
        })
      );
    }, 500),
    []
  );

  const handleChange = () => {
    const { purpose, type, variability } = watch();

    dispatch(
      changePayload({
        ...payload,
        purpose,
        type,
        variability,
        pageNumber: 1,
      })
    );
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
    <div
      style={{
        display: "flex",
        gap: "20px",
        flexDirection: "column",
        marginTop: "15px",
      }}
    >
      <TextField
        type="text"
        label="Tên địa điểm"
        fullWidth
        size="small"
        inputProps={register("placeName")}
        onChange={(e) => {
          debounceFnPlaceName(e.target.value);
        }}
      />

      <TextField
        type="text"
        label="Khu vực"
        fullWidth
        inputProps={register("location")}
        size="small"
        onChange={(e) => {
          debounceFnLocation(e.target.value);
        }}
      />
      <TextField
        select
        fullWidth
        name="purpose"
        label="Mục đích"
        inputProps={register("purpose")}
        onChange={handleChange}
        size="small"
      >
        {listPurpose?.map((item) => (
          <MenuItem value={item.name}>{item.name}</MenuItem>
        ))}
      </TextField>

      <TextField
        select
        fullWidth
        label="Loại hình"
        name="type"
        inputProps={register("type")}
        onChange={handleChange}
        size="small"
      >
        {listType?.map((item) => (
          <MenuItem value={item.name}>{item.name}</MenuItem>
        ))}
      </TextField>

      <TextField
        select
        fullWidth
        name="variability"
        label="Giá"
        inputProps={register("variability")}
        onChange={handleChange}
        size="small"
      >
        <MenuItem value=" ">Tất cả</MenuItem>
        <MenuItem value="desc">Giảm dần</MenuItem>
        <MenuItem value="asc">Tăng dần</MenuItem>
      </TextField>

      <div
        style={{
          width: "100%",
          display: "grid",
          placeItems: "center",
        }}
      >
        <IconButton
          onClick={() => {
            reset({
              placeName: "",
              location: "",
              purpose: "",
              variability: "",
              type: "",
            });
            dispatch(resetPayload());
          }}
          size="small"
          sx={{
            border: "1px solid",
          }}
        >
          <ReplayOutlinedIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default PlaceFilter;
