import React, { useState } from "react";
const MapData = ({ data }) => {
  return (
    <div className="datamap">
      <div>
        <img src={data.image} alt="" />
      </div>
      <div>
        <span>{data.title}</span>
      </div>
      <div>
        <span>{data.price}</span>
      </div>
    </div>
  );
};
export default MapData;
