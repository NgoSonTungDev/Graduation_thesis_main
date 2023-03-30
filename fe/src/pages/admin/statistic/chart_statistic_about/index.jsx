import { HighchartsReact } from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import moment from "moment";
import React, { useEffect, useState } from "react";
import axiosClient from "../../../../api/axiosClient";
import FormDate from "../../../../hook-form/form_date";
import { formatMoney, toastify } from "../../../../utils/common";

const ChartStatisticAbout = () => {
  const [payload, setPayload] = React.useState({
    startDay: moment(new Date()).subtract(7, "days").format(),
    endDate: moment(new Date()).format(),
  });

  const [data, setData] = React.useState({});

  const options = {
    chart: {
      type: "column",
      height: "40%",
    },
    title: {
      text: `Số lượng mua và doanh thu trong ngày (${
        payload.startDay
          ? moment(payload.startDay).format("DD/MM/yyyy")
          : "--/--/----"
      } - ${
        payload.endDate
          ? moment(payload.endDate).format("DD/MM/yyyy")
          : "--/--/----"
      })`,
    },
    xAxis: {
      categories: data?.detail?.map((e) => e._id),
    },
    yAxis: {
      opposite: false,
      title: {
        text: "",
      },
    },
    series: [
      {
        name: "Số lượng vé đã bán",
        data: data?.detail?.map((e) => e.sumTicked),
      },
      {
        name: "Danh thu",
        data: data?.detail?.map((e) => e.totalRevenue),
        // color: '#00FF00'
      },
    ],
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
    let url = `/statistic/payment-statistics-about?startDay=${Number(
      new Date(payload.startDay)
    )}&endDay=${Number(new Date(payload.endDate))}`;
    fetchData(url);
  }, [payload]);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div
        style={{
          width: "100%",
          height: "10%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
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
            label={"Ngày bat dau"}
            onChange={(value) => {
              setPayload({ startDay: value, endDate: "" });
            }}
          />
          <FormDate
            value={payload.endDate}
            label={"Ngày kết thúc"}
            onChange={(value) => {
              setPayload({ ...payload, endDate: value });
            }}
          />
        </div>
        {data && (
          <div>
            Tổng doanh thu :{" "}
            <span style={{ color: "#d63031" }}>
              {formatMoney(Number(data?.total))}
            </span>
          </div>
        )}
      </div>
      <div
        style={{
          width: "100%",
          height: "90%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
      >
        {!payload.startDay || !payload.endDate ? (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "grid",
              placeItems: "center",
            }}
          >
            <span>Hãy chọn ngày bắt đầu và ngày kết thúc</span>
          </div>
        ) : (
          <HighchartsReact highcharts={Highcharts} options={options} />
        )}
      </div>
    </div>
  );
};

export default ChartStatisticAbout;
