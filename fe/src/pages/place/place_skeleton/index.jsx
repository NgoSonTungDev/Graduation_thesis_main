import Skeleton from "@mui/material/Skeleton";
import React from "react";

const PlaceSkeleton = () => {
  return (
    <div
      style={{
        width: "100%",
        padding: "15px 0",
        margin: "20px 0",
        boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        cursor: "pointer",
      }}
    >
      <div
        style={{
          width: "30%",
          height: "100%",
          borderRadius: "8px",
          marginLeft: "10px",
        }}
      >
        <Skeleton variant="rounded" width={"100%"} height={"180px"} />
      </div>
      <div
        style={{
          marginLeft: "15px",
          width: "60%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <div
          style={{
            fontSize: "20px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          <Skeleton variant="text" sx={{ fontSize: "1rem", width: "50%" }} />
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Skeleton variant="text" sx={{ fontSize: "1rem", width: "60%" }} />
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Skeleton variant="text" sx={{ fontSize: "1rem", width: "65%" }} />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Skeleton variant="text" sx={{ fontSize: "1rem", width: "70%" }} />
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Skeleton variant="text" sx={{ fontSize: "1rem", width: "60%" }} />
        </div>
      </div>
      <div style={{ marginLeft: "8px" }}>
        <Skeleton variant="circular" width={40} height={40} />
      </div>
    </div>
  );
};

export default PlaceSkeleton;
