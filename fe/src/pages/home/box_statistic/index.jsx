import React, { useEffect } from "react";
import "./style.scss";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import axiosClient from "../../../api/axiosClient";
import { toastify } from "../../../utils/common";
import _ from "lodash";
import StatisticItem from "./static_item";
import ErrorEmpty from "../../../components/emty_data";

const BoxStatistic = () => {
  const [checked, setChecked] = React.useState(false);
  const [data, setData] = React.useState([]);

  const fetchData = () => {
    axiosClient
      .get(`/statistic/comment-statistics`)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        toastify("error", err.response.data.message || "Lỗi hệ thông !");
      });
  };

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div
      className="container_box_statistic"
      style={{ left: checked ? "0" : "-400px" }}
    >
      <div
        style={{
          width: "100%",
          textAlign: "center",
          fontSize: "15px",
          fontWeight: "500",
          padding: "5px 0",
          color: "#000",
        }}
      >
        <span>Thống kê đánh giá</span>
      </div>
      <div className="box_list_evaluate">
        {_.isEmpty(data) ? (
          <ErrorEmpty />
        ) : (
          data.map((item) => {
            return <StatisticItem data={item} />;
          })
        )}
      </div>
      <div className="button_show" onClick={handleChange}>
        {checked ? <KeyboardArrowLeftIcon /> : <ChevronRightIcon />}
      </div>
    </div>
  );
};

export default BoxStatistic;
