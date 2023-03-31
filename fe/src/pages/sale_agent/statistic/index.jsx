import moment from "moment";
import React, { useEffect, useState } from "react";
import axiosClient from "../../../api/axiosClient";
import MenuSaleAgent from "../../../components/navbar_sale_agent";
import FormDate from "../../../hook-form/form_date";
import { formatMoney, toastify } from "../../../utils/common";
import { getUserDataLocalStorage } from "../../../utils/localstorage";
import ChartStatisticAbout from "./chart_statistic_about";

const SaleAgentStatistic = () => {
  const [data, setData] = useState({});
  const userIdStorage = getUserDataLocalStorage();

  const [payload, setPayload] = React.useState({
    startDay: moment(new Date()).subtract(7, "days").format(),
    endDate: moment(new Date()).format(),
    salesAgentId: userIdStorage._id,
  });

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
    let url = `/statistic/payment-statistics-sale-agent?startDay=${Number(
      new Date(payload.startDay)
    )}&endDay=${Number(new Date(payload.endDate))}&salesAgentId=${
      userIdStorage._id
    }`;
    fetchData(url);
  }, [payload]);

  const renderForm = () => {
    return (
      <div style={{ width: "100%", height: "100vh", overflow: "hidden" }}>
        <div
          style={{
            width: "100%",
            marginTop: "10px",
            height: "8vh",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              gap: "15px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <FormDate
              value={payload.startDay}
              maxDate={new Date()}
              label={"Ngày bat dau"}
              onChange={(value) => {
                setPayload({ startDay: value, endDate: "" });
              }}
            />
            <FormDate
              value={payload.endDate}
              minDate={payload.startDay}
              maxDate={new Date()}
              label={"Ngày kết thúc"}
              onChange={(value) => {
                setPayload({ ...payload, endDate: value });
              }}
            />
          </div>
          <div>
            <p>
              Doanh thu :{" "}
              <span style={{ color: "#c0392b" }}>
                {formatMoney(data?.total ? data.total : 0)}
              </span>
            </p>
          </div>
        </div>
        <div
          style={{
            width: "100%",
            height: "90vh",
          }}
        >
          <ChartStatisticAbout data={data?.detail} payload={payload} />
        </div>
      </div>
    );
  };

  return (
    <div>
      <MenuSaleAgent ReactNode={renderForm()} />
    </div>
  );
};

export default SaleAgentStatistic;
