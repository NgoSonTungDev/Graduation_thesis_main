import React, { useState } from "react";
import { formatMoney } from "../../../utils/common";
const MapData = ({ data }) => {
  return (
    <div className="datamap">
      <div>
        <img src={data.image} alt="" />
      </div>
      <div>
        <span>{data.title}</span>
      </div>
      <div style={{ color: "red" }}>
        <span>{formatMoney(data.price)}</span>
      </div>
    </div>
  );
};
export default MapData;
