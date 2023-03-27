import React from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock";

const ChartColumComment = ({ data }) => {
  const options = {
    chart: {
      type: "column",
    },
    title: {
      text: "Thông kê mặt tích cực của các đánh giá",
    },
    xAxis: {
      categories: data?.map((e) => e.name),
    },
    yAxis: {
      opposite: false,
      title: {
        text: "",
      },
    },
    series: [
      {
        name: "Tích cực",
        data: data?.map((e) => e.trueCount),
      },
      {
        name: "Tiêu cực",
        data: data?.map((e) => e.falseCount),
      },
    ],
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default ChartColumComment;
