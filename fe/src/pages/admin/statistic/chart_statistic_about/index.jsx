import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { HighchartsReact } from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import moment from "moment";
import React, { useEffect } from "react";
import axiosClient from "../../../../api/axiosClient";
import { formatMoney, toastify } from "../../../../utils/common";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

const ChartStatisticAbout = () => {
  const [startDay, setStartDay] = React.useState("");
  const [endDate, setEndDay] = React.useState("");

  const [data, setData] = React.useState({});

  console.log(startDay, endDate);

  const options = {
    chart: {
      type: "column",
      height: "35%",
    },
    title: {
      text: `Số lượng mua và doanh thu trong ngày
       (${startDay ? moment(startDay).format("DD/MM/yyyy") : "--/--/----"} - ${
        endDate ? moment(endDate).format("DD/MM/yyyy") : "--/--/----"
      })
      `,
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
      startDay?.$d
    )}&endDay=${Number(endDate?.$d)}`;
    fetchData(url);
  }, [startDay, endDate]);

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
        <div style={{ gap: "15px", display: "flex", flexDirection: "row" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker", "DatePicker"]}>
              <DatePicker
                label="Controlled picker"
                value={startDay}
                onChange={(newValue) => setStartDay(newValue)}
              />
              <DatePicker
                label="Controlled picker"
                value={endDate}
                onChange={(newValue) => setEndDay(newValue)}
              />
            </DemoContainer>
          </LocalizationProvider>
        </div>
        {startDay ||
          (endDate && (
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
        {!startDay || !endDate ? (
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
