import React, { useState } from "react";
import LineChart from "./charts/lineChart";
import { header } from "../data/header";
import uid from "uid";

const Preview = (props) => {
  const id = props.match.params.id;
  let error, prices, quantities;
  const product = JSON.parse(localStorage["products"])[id];
  if (product) {
    prices = product.Price;
    quantities = product.Quantity;
  } else {
    error = "product doesn't exist";
  }
  const [currentTab, setCurrentTab] = useState(0);
  return (
    <div
      className="px-3"
      style={{ maxWidth: "1300px", minHeight: "100%", margin: "auto" }}
    >
      <h1 className="py-4">Product Preview</h1>
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
          Price History
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
      {error ? (
        <h1>{error}</h1>
      ) : currentTab === 0 ? (
        <div className="row no-gutters">
          <table className="table border">
            <thead>
              <tr>
                {header.slice(0, header.length - 3).map((fieldName) => (
                  <th key={uid()}>{fieldName}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {header.slice(0, header.length - 3).map((x) => (
                  <td key={uid()}>
                    {x === "Quantity"
                      ? product[x][product[x].length - 1].quantity
                      : x === "Price"
                      ? product[x][product[x].length - 1].price
                      : product[x].toString()}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
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
