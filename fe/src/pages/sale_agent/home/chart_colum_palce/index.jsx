import React from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock";

const ChartColumPlace = ({ data }) => {
  const options = {
    chart: {
      type: "column",
    },
    title: {
      text: "Địa điểm",
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
        name: "Số lượng địa điểm",
        data: data?.map((e) => e.sum),
      },
    ],
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default ChartColumPlace;
