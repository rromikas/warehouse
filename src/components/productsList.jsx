import React, { useEffect, useState } from "react";
import { initialProducts } from "../data/initialData";
import { header } from "../data/header";
import uid from "uid";
import CheckBox from "./checkbox";
import NumberInput from "./numberInput";
import history from "../routing/history";
import Pagination from "./pagination";
import { getDate } from "../utility/getDate";
const allProducts = localStorage["products"]
  ? JSON.parse(localStorage["products"])
  : initialProducts;

// const allProducts = initialProducts;

const maxPrice = 1000000,
  maxQuantity = 1000000;

const ProductsList = () => {
  const [productsPerPage, setProductsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [products, setProducts] = useState(
    allProducts.filter(
      (x, i) => i >= productsPerPage * page && i < productsPerPage * (page + 1)
    )
  );

  useEffect(() => {
    let pageProducts = allProducts.filter(
      (x, i) => i >= productsPerPage * page && i < productsPerPage * (page + 1)
    );
    setProducts(pageProducts);
  }, [page]);

  useEffect(() => {
    let pageProducts = allProducts.filter(
      (x, i) => i >= productsPerPage * page && i < productsPerPage * (page + 1)
    );
    setProducts(pageProducts);
  }, [productsPerPage]);

  useEffect(() => {
    products.forEach((x, i) => {
      allProducts[page * productsPerPage + i] = x;
    });
    localStorage["products"] = JSON.stringify(allProducts);
  }, [products]);

  return (
    <div
      className="px-3"
      style={{ maxWidth: "1300px", minHeight: "100%", margin: "auto" }}
    >
      <h1 className="p-4">Products List</h1>
      <table className="table border">
        <thead>
          <tr>
            {header.map((fieldName) => (
              <th key={uid()}>{fieldName}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {products.map((product, i) => {
            return (
              <tr key={uid()}>
                {Object.keys(product).map((fieldName) => (
                  <td key={uid()}>
                    {fieldName === "Active" ? (
                      <CheckBox
                        checked={product[fieldName]}
                        onSet={(checked) =>
                          setProducts((products) => {
                            let arr = [...products];
                            arr[i].Active = checked;
                            return arr;
                          })
                        }
                      ></CheckBox>
                    ) : fieldName === "Price" ? (
                      <NumberInput
                        min={0}
                        max={maxPrice}
                        val={
                          product[fieldName][product[fieldName].length - 1]
                            .price
                        }
                        onSet={(val) => {
                          let date = getDate();
                          setProducts((products) => {
                            let arr = [...products];
                            arr[i].Price.push({ price: +val, date: date });
                            return arr;
                          });
                        }}
                      ></NumberInput>
                    ) : fieldName === "Quantity" ? (
                      <NumberInput
                        min={0}
                        max={maxQuantity}
                        step={1}
                        val={
                          product[fieldName][product[fieldName].length - 1]
                            .quantity
                        }
                        onSet={(val) => {
                          let date = getDate();
                          setProducts((products) => {
                            let arr = [...products];
                            arr[i].Quantity.push({
                              quantity: +val,
                              date: date,
                            });
                            return arr;
                          });
                        }}
                      ></NumberInput>
                    ) : (
                      product[fieldName]
                    )}
                  </td>
                ))}
                <td>
                  <div
                    className="btn-primary btn"
                    onClick={() =>
                      history.push({
                        pathname: `/products/${productsPerPage * page + i}`,
                      })
                    }
                  >
                    View
                  </div>
                </td>
                <td>
                  <div
                    className="btn-secondary btn"
                    onClick={() =>
                      history.push({
                        pathname: `/products/${
                          productsPerPage * page + i
                        }/edit</tr>`,
                      })
                    }
                  >
                    Edit
                  </div>
                </td>
                <td>
                  <div
                    className="btn-danger btn"
                    onClick={() => {
                      allProducts.splice(productsPerPage * page + i, 1);
                      setProducts((products) => {
                        let arr = [...products];
                        arr.splice(i, 1);
                        return arr;
                      });
                    }}
                  >
                    Delete
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="d-flex justify-content-between">
        <Pagination
          current={page}
          pagesAmount={Math.ceil(allProducts.length / productsPerPage)}
          setCurrent={setPage}
        ></Pagination>
        <NumberInput
          val={productsPerPage}
          onSet={(val) => setProductsPerPage(val)}
          step={5}
          min={5}
          max={20}
        ></NumberInput>
      </div>
    </div>
  );
};

export default ProductsList;
