import React from "react";

const StatisticItem = ({ data }) => {
  return (
    <div
      style={{
        cursor: "pointer",
        width: "98%",
        border: "1px solid #ccc",
        borderRadius: "5px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 3,
      }}
    >
      <h5
        style={{
          margin: "0",
          maxWidth: "55%",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          textTransform: "capitalize",
        }}
        title={data.name}
      >
        {data.name}
      </h5>
      <div style={{ fontSize: "13px", paddingRight: "10px" }}>
        <span
          style={{
            color: "#1ab394",
            fontWeight: "bold",
            marginRight: "10px",
          }}
        >
          Tích cực: {data.trueCount}
        </span>
        <span
          style={{
            color: "#ed5565",
            fontWeight: "bold",
          }}
        >
          Tiêu cực: {data.falseCount}
        </span>
      </div>
    </div>
  );
};

export default StatisticItem;
