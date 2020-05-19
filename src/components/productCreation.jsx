import React from "react";
import history from "../routing/history";
import { getDate } from "../utility/getDate";

function onSubmit(evt) {
  const formData = new FormData(evt.target);
  evt.preventDefault();
  let newProduct = {};
  for (var [key, value] of formData.entries()) {
    if (key === "Quantity") {
      newProduct[key] = [{ quantity: parseInt(value), date: getDate() }];
    } else if (key === "Price") {
      newProduct[key] = [{ price: parseFloat(value), date: getDate() }];
    } else {
      newProduct[key] = value;
    }
  }
  newProduct.Active = true;
  let allProducts = localStorage["products"]
    ? JSON.parse(localStorage["products"])
    : [];
  allProducts.unshift(newProduct);
  localStorage["products"] = JSON.stringify(allProducts);
  history.push({ pathname: "/products" });
}

const ProductCreation = () => {
  return (
    <div style={{ maxWidth: "600px", margin: "auto" }} className="px-2 pb-4">
      <h1 className="py-4">Create Product</h1>
      <form className="container-fluid px-0" onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="productName">Product name</label>
          <input
            required
            pattern="[a-zA-Z0-9]+"
            name="Name"
            type="text"
            className="form-control"
            id="productName"
            aria-describedby="emailHelp"
            placeholder="Enter product name"
          />
          <small id="emailHelp" className="form-text text-muted">
            Write product name 20 to 40 characters long
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputPassword1">EAN</label>
          <input
            required
            pattern="[a-zA-Z0-9]+"
            name="EAN"
            type="text"
            className="form-control"
            id="eanCode"
            placeholder="Enter EAN code"
          />
          <small id="eanCode" className="form-text text-muted">
            Enter registered EAN code
          </small>
        </div>
        <div className="row no-gutters justify-content-between">
          <div className="col-5">
            <div className="form-group">
              <label htmlFor="price">Price</label>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">$</span>
                </div>
                <input
                  pattern="[0-9]*[.]?[0-9]+"
                  type="text"
                  id="price"
                  name="Price"
                  placeholder="0.00"
                  min={0.01}
                  className="form-control"
                  aria-label="Amount (to the nearest dollar)"
                />
              </div>
            </div>
          </div>
          <div className="col-5">
            <div className="form-group">
              <label htmlFor="quantity">Quantity</label>
              <input
                required
                name="Quantity"
                type="number"
                className="form-control"
                id="quantity"
                min={1}
                placeholder="0"
              />
            </div>
          </div>
        </div>
        <div className="row no-gutters justify-content-between">
          <div className="col-12 col-md-3">
            <div className="form-group">
              <label htmlFor="color">Color</label>
              <input
                required
                pattern="[a-zA-Z0-9]+"
                name="Color"
                type="text"
                className="form-control"
                id="color"
                placeholder="Enter color"
              />
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="form-group">
              <label htmlFor="weight">Weight</label>
              <input
                required
                pattern="[a-zA-Z0-9]+"
                name="Weight"
                type="text"
                className="form-control"
                id="weight"
                placeholder="Enter weight"
              />
            </div>
          </div>
          <div className="col-12 col-md-3">
            <div className="form-group">
              <label htmlFor="type">Type</label>
              <input
                pattern="[a-zA-Z0-9]+"
                required
                name="Type"
                type="text"
                className="form-control"
                id="type"
                placeholder="Enter type"
              />
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary btn-lg btn-block mt-4">
          Create product
        </button>
      </form>
    </div>
  );
};

export default ProductCreation;
