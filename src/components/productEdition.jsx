import React, { useState } from "react";
import history from "../routing/history";
import { getDate } from "../utility/getDate";
function onSubmit(e, product, id) {
  e.preventDefault();
  const allProducts = JSON.parse(localStorage["products"]);
  //If new quantity or price are equal to previuos one, it is removed
  if (
    product.Price[product.Price.length - 1].price ===
    product.Price[product.Price.length - 2].price
  ) {
    product.Price.splice(product.Price.length - 1, 1);
  }
  if (
    product.Quantity[product.Quantity.length - 1].quantity ===
    product.Quantity[product.Quantity.length - 2].quantity
  ) {
    product.Quantity.splice(product.Quantity.length - 1, 1);
  }
  allProducts[id] = product;
  localStorage["products"] = JSON.stringify(allProducts);
  history.push({ pathname: "/products" });
}

const ProductEdition = (props) => {
  const id = props.match.params.id;
  const allProducts = JSON.parse(localStorage["products"]);

  //if product exists, it gets new price and quantity for this editing session
  if (allProducts[id]) {
    allProducts[id].Price[allProducts[id].Price.length] = {
      price: allProducts[id].Price[allProducts[id].Price.length - 1].price,
      date: getDate(),
    };
    allProducts[id].Quantity[allProducts[id].Quantity.length] = {
      quantity:
        allProducts[id].Quantity[allProducts[id].Quantity.length - 1].quantity,
      date: getDate(),
    };
  }

  const [product, setProduct] = useState(
    allProducts[id] ? allProducts[id] : { error: "product doesn't exist" }
  );

  return product.error ? (
    <h1>Product doesn't exist</h1>
  ) : (
    <div style={{ maxWidth: "600px", margin: "auto" }} className="px-2 pb-4">
      <h1 className="py-4">Edit Product</h1>
      <form
        className="container-fluid px-0"
        onSubmit={(e) => onSubmit(e, product, id)}
      >
        <div className="form-group">
          <label htmlFor="productName">Product name</label>
          <input
            required
            name="Name"
            type="text"
            pattern="[a-zA-Z0-9\s]+"
            className="form-control"
            id="productName"
            aria-describedby="emailHelp"
            placeholder="Enter product name"
            value={product.Name}
            onChange={(e) => {
              e.persist();
              setProduct((product) =>
                Object.assign({}, product, { Name: e.target.value })
              );
            }}
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
            value={product.EAN}
            onChange={(e) => {
              e.persist();
              setProduct((product) =>
                Object.assign({}, product, { EAN: e.target.value })
              );
            }}
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
                  type="text"
                  id="price"
                  name="Price"
                  min={0.01}
                  pattern="[0-9]*[.]?[0-9]+"
                  placeholder="0.00"
                  className="form-control"
                  aria-label="Amount (to the nearest dollar)"
                  value={product.Price[product.Price.length - 1].price}
                  onChange={(e) => {
                    e.persist();
                    setProduct((product) => {
                      let obj = { ...product };
                      obj.Price[obj.Price.length - 1].price = +e.target.value;
                      return obj;
                    });
                  }}
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
                placeholder="0"
                min={0}
                value={product.Quantity[product.Quantity.length - 1].quantity}
                onChange={(e) => {
                  e.persist();
                  setProduct((product) => {
                    let obj = { ...product };
                    obj.Quantity[obj.Quantity.length - 1].quantity = +e.target
                      .value;
                    return obj;
                  });
                }}
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
                pattern="[a-zA-Z0-9\s]+"
                name="Color"
                type="text"
                className="form-control"
                id="color"
                placeholder="Enter color"
                value={product.Color}
                onChange={(e) => {
                  e.persist();
                  setProduct((product) =>
                    Object.assign({}, product, { Color: e.target.value })
                  );
                }}
              />
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="form-group">
              <label htmlFor="weight">Weight</label>
              <input
                required
                name="Weight"
                pattern="[a-zA-Z0-9\s]+"
                type="text"
                className="form-control"
                id="weight"
                placeholder="Enter weight"
                value={product.Weight}
                onChange={(e) => {
                  e.persist();
                  setProduct((product) =>
                    Object.assign({}, product, { Weight: e.target.value })
                  );
                }}
              />
            </div>
          </div>
          <div className="col-12 col-md-3">
            <div className="form-group">
              <label htmlFor="type">Type</label>
              <input
                required
                pattern="[a-zA-Z0-9\s]+"
                name="Type"
                type="text"
                className="form-control"
                id="type"
                placeholder="Enter type"
                value={product.Type}
                onChange={(e) => {
                  e.persist();
                  setProduct((product) =>
                    Object.assign({}, product, { Type: e.target.value })
                  );
                }}
              />
            </div>
          </div>
        </div>
        <div className="row no-gutters justify-content-between">
          <div className="col-12">
            <button
              type="submit"
              className="btn btn-primary btn-lg btn-block mt-4"
              disabled={product.error}
            >
              Submit changes
            </button>
          </div>
          <div className="col-12">
            <button
              onClick={() => {
                history.push({ pathname: "/products" });
              }}
              className="btn btn-secondary btn-lg btn-block mt-4"
              disabled={product.error}
            >
              Discard changes
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductEdition;
