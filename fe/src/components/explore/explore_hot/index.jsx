import React from "react";
import moment from "moment";
import "./style.scss";

const ExploreHot = ({ data, callbackfn }) => {
  const renderItemCheckTime = (open, close) => {
    const start = moment(open).format("HH:mm");
    const end = moment(close).format("HH:mm");
    const check2 = moment(new Date()).format("HH:mm");

    const isCheckBetweenStartAndEnd = moment(check2, "HH:mm").isBetween(
      moment(start, "HH:mm"),
      moment(end, "HH:mm")
    );

    if (isCheckBetweenStartAndEnd) {
      return <span style={{ color: "#2ecc71" }}>Đang mở cửa </span>;
    } else {
      return <span style={{ color: "#c0392b" }}>Đang đóng cửa </span>;
    }
  };

  const getByIdPlace = () => {
    callbackfn(data._id);
  };

  return (
    <div className="card" onClick={getByIdPlace}>
      <img src={data?.image[0]} alt={data?.image[0]} className="card-image" />
      <div className="card-content">
        <h3 className="card-title">{data.name}</h3>
        <p className="card-description">{data.address}</p>
        <p className="card-location">
          {renderItemCheckTime(data.openTime, data.closeTime)}
        </p>
      </div>
    </div>
  );
};

export default ExploreHot;
