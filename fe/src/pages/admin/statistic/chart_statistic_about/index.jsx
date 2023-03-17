import React, { useEffect, useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import moment, { min } from "moment";
import axiosClient from "../../../../api/axiosClient";
import { formatDate, toastify } from "../../../../utils/common";
import { formatMoney } from "../../../../utils/common";
import { grid } from "@mui/system";

const ChartStatisticAbout = () => {
  const [payload, setPayload] = React.useState({
    startDay: "",
    endDate: "",
  });

  const [data, setData] = React.useState({});

  console.log(new Date(payload.startDay));

  const options = {
    chart: {
      type: "column",
      height: "35%",
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
        console.log(res.data.data);
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
          <p>Từ ngày : </p>
          <input
            style={{ height: "30px", width: "200px" }}
            type="date"
            name="startDay"
            onChange={(value) => {
              setPayload({ startDay: value.target.value, endDate: "" });
            }}
          />
          <p>Đến ngày : </p>
          <input
            style={{ height: "30px", width: "200px" }}
            type="date"
            name="endDate"
            min={payload.startDay}
            onChange={(value) => {
              setPayload({ ...payload, endDate: value.target.value });
            }}
          />
        </div>
        {payload.startDay ||
          (payload.endDate && (
            <div>
              Tổng doanh thu :{" "}
              <span style={{ color: "#d63031" }}>
                {formatMoney(Number(data?.total))}
              </span>
            </div>
          ))}
      </div>
      <div
        style={{
          width: "100%",
          height: "90%",
          display: "flex",
          justifyContent: "flex-end",
          flexDirection: "column",
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
