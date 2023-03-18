import React, { useEffect } from "react";
import axiosClient from "../../../api/axiosClient";
import SidebarAdmin from "../../../components/narbar_admin";
import { toastify } from "../../../utils/common";
import ChartColumComment from "./chart_collum_statistic_cmt";
import ChartColumPlace from "./chart_colum_palce";
import ChartPie from "./chart_pie";

const AdminHome = () => {
  const [data, setData] = React.useState({});

  const renderForm = () => {
    return (
      <div style={{ width: "100%" }}>
        <div style={{ width: "100%", display: "flex" }}>
          <div style={{ width: "100%" }}>
            <ChartPie data={data.evaluate} />
          </div>
          <div style={{ width: "100%" }}>
            <ChartColumComment data={data.comment} />
          </div>
        </div>
        <div style={{ width: "100%" }}>
          <ChartColumPlace data={data.place} />
        </div>
      </div>
    );
  };

  const fetchData = (url) => {
    axiosClient
      .get(url)
      .then((res) => {
        console.log(res.data.data);
        setData(res.data.data);
      })
      .catch((err) => {
        toastify("error", err.response.data.message || "Lỗi hệ thông !");
      });
  };

  useEffect(() => {
    let url = `/statistic/general-statistics`;
    fetchData(url);
  }, []);

  return (
    <div>
      <SidebarAdmin ReactNode={renderForm()} />
    </div>
  );
};

export default AdminHome;
