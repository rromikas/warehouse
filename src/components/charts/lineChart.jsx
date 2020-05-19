import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const LineChart = ({
  data = [],
  title = "",
  xTitle = "",
  yTitle = "",
  xCategory,
  value,
}) => {
  const options = {
    title: {
      text: title,
    },
    series: [
      {
        name: xTitle,
        data: data.filter((x, i) => i > data.length - 6).map((x) => x[value]),
      },
    ],
    xAxis: {
      categories: [...data.map((x) => x[xCategory])],
      labels: {
        style: {
          fontSize: "15px",
          fontWeight: "bold",
        },
      },
    },
    yAxis: {
      title: {
        text: yTitle,
        style: { fontSize: "20px" },
      },
      labels: {
        style: {
          fontSize: "15px",
          fontWeight: "bold",
        },
      },
    },
  };
  return (
    <div style={{ maxWidth: "1000px", margin: "auto", marginTop: "50px" }}>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default LineChart;
