import React, { useEffect } from "react";
import PieChart from "highcharts-react-official";
import Highcharts from "highcharts/highstock";

const ChartPie = ({ data }) => {
  let trueCount = 0;
  let falseCount = 0;

  data?.forEach((item) => {
    if (item.rateComments === true) {
      trueCount++;
    } else {
      falseCount++;
    }
  });

  const options = {
    chart: {
      type: "pie",
      height: 350,
    },
    title: {
      text: "Thống kê đánh giá",
    },
    series: [
      {
        name: "Đánh giá",
        data: [
          { name: "Tích cực", y: trueCount },
          { name: "Tiêu cực", y: falseCount },
        ],
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
