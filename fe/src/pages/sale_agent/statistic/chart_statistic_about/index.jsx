import { HighchartsReact } from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import moment from "moment";
import React from "react";

const ChartStatisticAbout = ({ data, payload }) => {
  const options = {
    chart: {
      type: "column",
      height: "42%",
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
      categories: data?.map((e) => e._id),
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
        data: data?.map((e) => e.sumTicked),
      },
      {
        name: "Danh thu",
        data: data?.map((e) => e.totalRevenue),
        // color: '#00FF00'
      },
    ],
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
    >
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default ChartStatisticAbout;
