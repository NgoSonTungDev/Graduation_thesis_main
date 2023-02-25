import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { objectByIdPlace } from "../../../redux/place/placeSlice";

const PlaceItem = ({ data, onClose }) => {
  const dispatch = useDispatch();

  return (
    <Box
      onClick={() => {
        dispatch(objectByIdPlace(data));
        onClose();
      }}
      sx={{
        cursor: "pointer",
        width: "100%",
        height: "70px",
        display: "flex",
        alignItems: "center",
        marginTop: 1.3,
        overflow: "hidden",
        "&:hover": {
          boxShadow:
            "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
        },
      }}
    >
      <Box
        sx={{
          width: "70px",
          height: "70px",
          overflow: "hidden",
          borderRadius: "8px",
        }}
      >
        <img
          style={{
            width: "100%",
            height: "100%",
            // objectFit: "contain",
          }}
          src={`${
            data?.image[0] ||
            "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930"
          }`}
          alt=""
        />
      </Box>
      <Box
        sx={{
          marginLeft: "10px",
          width: "84%",
          justifyContent: "space-around",
          flexDirection: "colum",
        }}
      >
        <Box
          sx={{
            width: "76%",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden",
            fontWeight: "500",
            textTransform: "capitalize",
          }}
        >
          {data.name}
        </Box>

        <Typography
          sx={{
            color: "#7a7a7a",
            fontSize: "14px",
            marginTop: "2px",
          }}
        >
          {data.address}
        </Typography>
      </Box>
    </Box>
  );
};

export default PlaceItem;
