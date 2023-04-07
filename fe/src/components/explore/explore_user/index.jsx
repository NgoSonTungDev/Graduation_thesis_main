import moment from "moment";
import React from "react";
import { getUserDataLocalStorage } from "../../../utils/localstorage";
import "./style.scss";

const ExploreUser = ({ dataUser, getIdMovePage }) => {
  return (
    <div
      className="card"
      onClick={() => {
        getIdMovePage(dataUser?._id);
      }}
    >
      <img src={dataUser?.avt} className="card-image" />
      <div className="card-content">
        <h3 className="card-title">{dataUser?.userName}</h3>
        <p className="card-description">Giới tính : {dataUser.gender}</p>
        <p className="card-location">
          Ngày tham gia : {moment(dataUser?.createdAt).format("DD/MM/YYYY")}
        </p>
      </div>
    </div>
  );
};

export default ExploreUser;
