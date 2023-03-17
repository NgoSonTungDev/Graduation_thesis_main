import React from "react";
import PieChart from "highcharts-react-official";
import Highcharts from "highcharts/highstock";

const ChartPie = ({ data }) => {
  const options = {
    chart: {
      type: "pie",
      height: 350,
    },
    title: {
      text: "Lượng đánh giá",
    },
    series: [
      {
        name: "Số lượng đánh giá",
        data: data?.map((e) => {
          return {
            name: e.places.name + `  (${e.evaluate} đánh giá)`,
            y: e.evaluate,
          };
        }),
      },
    ],
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <PieChart highcharts={Highcharts} options={options} />
    </div>
  );
};

export default ChartPie;
