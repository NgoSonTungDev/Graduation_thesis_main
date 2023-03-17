import React from "react";
import { formatMoney, toastify } from "../../../utils/common";
const MapData = ({ data }) => {
  const CopyText = () => {
    navigator.clipboard.writeText(`${data.codeVoucher}`);
    toastify("success", "Sao chép mã thành công !");
  };

  return (
    <div className="datamap" onClick={CopyText}>
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
