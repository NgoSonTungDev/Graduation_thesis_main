import React, { useEffect } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import moment from "moment";
import axiosClient from "../../../../api/axiosClient";
import { toastify } from "../../../../utils/common";
import { formatMoney } from "../../../../utils/common";

const ChartStatisticDay = () => {
  const [value, setValue] = React.useState("");
  const [data, setData] = React.useState({});

  const options = {
    chart: {
      type: "column",
      height: "35%",
    },
    title: {
      text: `Số lượng mua và doanh thu trong ngày (${
        value ? moment(value?.$d).format("DD/MM/yyyy") : "--/--/----"
      })`,
    },
    xAxis: {
      categories: data?.detail?.map((e) =>
        moment(e.dateTime).format("dd/mm/yyyy HH:MM")
      ),
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
        data: data?.detail?.map((e) => e.detail.amount),
      },
      {
        name: "Danh thu",
        data: data?.detail?.map((e) => e.detail.total),
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
    let url = `/statistic/payment-statistics-day?dayTime=${Number(value.$d)}`;
    fetchData(url);
  }, [value]);

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
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Ngày"
            value={value}
            onChange={(newValue) => setValue(newValue)}
          />
        </LocalizationProvider>

        <div>
          Tổng doanh thu :{" "}
          <span style={{ color: "#d63031" }}>
            {formatMoney(Number(data?.total))}
          </span>
        </div>
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
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    </div>
  );
};

export default ChartStatisticDay;
