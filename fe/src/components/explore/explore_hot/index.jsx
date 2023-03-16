import React from "react";
import "./style.scss";

const ExploreHot = ({ data, callbackfn }) => {
  const getByIdPlace = () => {
    callbackfn(data._id);
  };

  return (
    <div
      onClick={getByIdPlace}
      style={{
        width: "100%",
        padding: "5px 0",
        margin: "10px 0",
        boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        cursor: "pointer",
      }}
    >
      <div className="explore_image">
        <img src={data?.image[0]} alt="" />
      </div>
      <div
        style={{
          marginLeft: "15px",
          width: "60%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          // gap: "12px",
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
          <b>{data.name}</b>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <span style={{ whiteSpace: "pre" }}>Địa chỉ :</span>
          <span
            style={{
              marginLeft: "5px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {data.address}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ExploreHot;
