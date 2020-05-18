import React, { useState } from "react";
import LineChart from "./charts/lineChart";

const Preview = (props) => {
  const id = props.match.params.id;
  const prices = JSON.parse(localStorage["products"])[id].Price;
  const quantities = JSON.parse(localStorage["products"])[id].Quantity;
  const [currentTab, setCurrentTab] = useState(0);
  return (
    <div
      className="px-3"
      style={{ maxWidth: "1300px", minHeight: "100%", margin: "auto" }}
    >
      <h1 className="p-4">Product Preview</h1>
      <div className="row no-gutters">
        <div
          onClick={() => setCurrentTab(0)}
          className={`col-4 p-2 text-center bg-${
            currentTab === 0 ? "primary" : "secondary"
          } text-white lead`}
        >
          Product Details
        </div>
        <div
          onClick={() => setCurrentTab(1)}
          className={`col-4 p-2 text-center bg-${
            currentTab === 1 ? "primary" : "secondary"
          } text-white lead`}
        >
          Price Hisotry
        </div>
        <div
          onClick={() => setCurrentTab(2)}
          className={`col-4 p-2 text-center bg-${
            currentTab === 2 ? "primary" : "secondary"
          } text-white lead`}
        >
          Quantity History
        </div>
      </div>
      {currentTab === 0 ? (
        <div></div>
      ) : currentTab === 1 ? (
        <LineChart
          xCategory="date"
          value="price"
          data={prices}
          title="Last 5 Price Changes"
          xTitle="Price"
          yTitle="Price"
        ></LineChart>
      ) : (
        <LineChart
          xCategory="date"
          value="quantity"
          data={quantities}
          title="Last 5 Quantity Changes"
          xTitle="Quantity"
          yTitle="Quantity"
        ></LineChart>
      )}
    </div>
  );
};

export default Preview;
