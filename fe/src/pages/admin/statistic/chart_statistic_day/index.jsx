import React, { useEffect } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import moment from "moment";
import axiosClient from "../../../../api/axiosClient";
import { toastify } from "../../../../utils/common";
import { formatMoney } from "../../../../utils/common";
import FormDate from "../../../../hook-form/form_date";

const ChartStatisticDay = () => {
  const [dateTime, setDateTime] = React.useState(moment(new Date()).format());
  const [data, setData] = React.useState({});

  const options = {
    chart: {
      type: "column",
      height: "35%",
    },
    title: {
      text: `Số lượng mua và doanh thu trong ngày (${moment(dateTime).format(
        "DD/MM/yyyy"
      )})`,
    },
    xAxis: {
      categories: data?.detail?.map((e) =>
        moment(e.dateTime).format("DD/mm/yyyy HH:mm")
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
        setData(res.data.data);
      })
      .catch((err) => {
        toastify("error", err.response.data.message || "Lỗi hệ thông !");
      });
  };

  useEffect(() => {
    let url = `/statistic/payment-statistics-day?dayTime=${Number(dateTime)}`;
    fetchData(url);
  }, [dateTime]);

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
        <FormDate
          value={dateTime}
          maxDate={new Date()}
          label={"Thời gian"}
          onChange={(value) => {
            setDateTime(value);
          }}
        />

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
