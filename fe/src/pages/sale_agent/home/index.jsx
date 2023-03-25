import React, { useEffect } from "react";
import axiosClient from "../../../api/axiosClient";
import MenuSaleAgent from "../../../components/navbar_sale_agent";
import { toastify } from "../../../utils/common";
import ChartPie from "./chart_pie";
import ChartColumComment from "./chart_collum_statistic_cmt";
import ChartColumPlace from "./chart_colum_palce";

const HomeSaleAgent = () => {
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
      <MenuSaleAgent ReactNode={renderForm()} />
    </div>
  );
};

export default HomeSaleAgent;
